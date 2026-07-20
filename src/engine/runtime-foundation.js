(function(global){
"use strict";

function createContractRuntime(options){
  const {state,getJSON,getImage,t,assetCache}=options;

  function validLayout(v){
    return !!(v&&v.worldSize&&v.playerSpawn&&Array.isArray(v.buildings)&&v.buildings.length&&Array.isArray(v.paths)&&Array.isArray(v.water));
  }

  function validRegistry(v){
    return !!(v&&v.atlases&&v.atlases.village_buildings&&v.atlases.forest_environment);
  }

  function validManifest(v){
    return !!(v&&v.modules&&typeof v.modules==="object"&&Object.keys(v.modules).length);
  }

  function validBuildingsData(v){
    return !!(v&&v.buildings&&typeof v.buildings==="object"&&Object.keys(v.buildings).length);
  }

  function validLocalization(v){
    return !!(v&&v.language&&v.ui&&typeof v.ui==="object");
  }

  function validResources(v){
    return !!(v&&v.resources&&typeof v.resources==="object"&&Object.keys(v.resources).length);
  }

  function getSpritesByRole(role,requiredTags=[]){
    const matches=[];
    const required=Array.isArray(requiredTags)?requiredTags:[];
    for(const [atlasId,atlasMeta] of Object.entries(state.registry?.atlases||{})){
      for(const [spriteId,spriteMeta] of Object.entries(atlasMeta.sprites||{})){
        if(spriteMeta.role!==role)continue;
        const spriteTags=spriteMeta.tags||[];
        if(!required.every(tag=>spriteTags.includes(tag)))continue;
        matches.push({atlasId,spriteId,meta:spriteMeta});
      }
    }
    return matches;
  }

  function pickSpriteByRole(role,requiredTags=[]){
    const matches=getSpritesByRole(role,requiredTags);
    return matches[0]?.spriteId||null;
  }

  function resolveBuildingSprite(def,building){
    if(building.spriteId)return building.spriteId;
    if(def.defaultSpriteId)return def.defaultSpriteId;
    return pickSpriteByRole(def.role,def.tags||[]);
  }

  function hydrateLayout(layout){
    const defs=state.buildingDefs?.buildings||{};
    return {
      ...layout,
      buildings:layout.buildings.map(building=>{
        const def=defs[building.id]||{};
        const interaction=def.interaction||{};
        const interactionLabelKey=building.interactionLabelKey||interaction.labelKey||def.interactionLabelKey||"";
        return {
          ...def,
          ...building,
          spriteId:resolveBuildingSprite(def,building),
          collisionRadius:building.collisionRadius??def.collisionRadius,
          clearRadius:building.clearRadius??def.clearRadius,
          interactionLabelKey,
          interactionLabel:t(interactionLabelKey,building.interactionLabel||def.interactionLabel||"")
        };
      })
    };
  }

  function getMissingBuildingDefinitions(layout){
    const defs=state.buildingDefs?.buildings||{};
    return layout.buildings.filter(building=>!defs[building.id]).map(building=>building.id);
  }

  function getModuleFallback(moduleId){
    return state.manifest?.modules?.[moduleId]?.fallback||"none";
  }

  function getAssetReport(){
    const modules=state.manifest?.modules||{};
    const entries=Object.entries(modules);
    const loaded=entries.filter(([id])=>!!state.atlases[id]).map(([id])=>id);
    const required=entries.filter(([,m])=>m?.required).map(([id])=>id);
    const missingRequired=required.filter(id=>!state.atlases[id]);
    const fallbacks=entries
      .filter(([id,m])=>m?.enabled&&!state.atlases[id])
      .map(([id,m])=>({id,required:!!m.required,fallback:m.fallback||"none"}));
    return {total:entries.length,loaded:loaded.length,required:required.length,missingRequired,fallbacks};
  }

  function assertRequiredAssets(){
    const report=getAssetReport();
    if(report.missingRequired.length){
      throw Error(`Missing required asset modules: ${report.missingRequired.join(", ")}`);
    }
    return report;
  }

  function normalizeAssetPath(path){
    if(!path)return "";
    return "./"+String(path).replace(/^\.?\//,"");
  }

  function shouldRemoveBackground(meta){
    const mode=meta?.backgroundPolicy?.mode||"none";
    return mode!=="none";
  }

  function isLikelyBackgroundPixel(r,g,b,a,policy){
    if(a===0)return true;
    const mode=policy?.mode||"none";
    if(mode==="none")return false;

    const threshold=policy?.threshold??246;
    const max=Math.max(r,g,b),min=Math.min(r,g,b);
    const neutral=max-min<=(policy?.checkerboardTolerance??14);
    const nearWhite=neutral&&r>=threshold&&g>=threshold&&b>=threshold;
    if(nearWhite)return true;

    if(mode.includes("checkerboard")){
      const checkerLight=neutral&&r>=218&&g>=218&&b>=218;
      if(checkerLight)return true;
    }
    return false;
  }

  function prepareAtlas(atlasId,image){
    const meta=state.registry?.atlases?.[atlasId];
    if(!meta||!image?.naturalWidth||!image?.naturalHeight)return null;

    const cols=meta.columns||3,rows=meta.rows||2;
    if(!Number.isInteger(cols)||!Number.isInteger(rows)||cols<=0||rows<=0)return null;
    if(image.naturalWidth%cols!==0||image.naturalHeight%rows!==0){
      console.warn(`Atlas grid mismatch: ${atlasId}`);
      return null;
    }
    if(meta.imageWidth&&meta.imageWidth!==image.naturalWidth){
      console.warn(`Atlas width mismatch for ${atlasId}: ${image.naturalWidth} vs ${meta.imageWidth}`);
      return null;
    }
    if(meta.imageHeight&&meta.imageHeight!==image.naturalHeight){
      console.warn(`Atlas height mismatch for ${atlasId}: ${image.naturalHeight} vs ${meta.imageHeight}`);
      return null;
    }

    const fw=image.naturalWidth/cols,fh=image.naturalHeight/rows;
    const canvas=document.createElement("canvas");
    canvas.width=image.naturalWidth;
    canvas.height=image.naturalHeight;
    const c=canvas.getContext("2d",{willReadFrequently:shouldRemoveBackground(meta)});
    c.drawImage(image,0,0);

    const policy=meta.backgroundPolicy||{mode:"none"};
    const removeBackground=shouldRemoveBackground(meta);
    const processedCells=new Set();
    const rects={};

    for(const [id,spriteMeta] of Object.entries(meta.sprites||{})){
      const col=spriteMeta.col||0,row=spriteMeta.row||0;
      if(!Number.isInteger(col)||!Number.isInteger(row)||col<0||row<0||col>=cols||row>=rows){
        console.warn(`Sprite cell out of range: ${atlasId}.${id}`);
        continue;
      }

      const sx=col*fw,sy=row*fh;
      const cellKey=`${col}:${row}`;

      if(removeBackground&&!processedCells.has(cellKey)){
        const img=c.getImageData(sx,sy,fw,fh);
        const data=img.data;
        for(let i=0;i<data.length;i+=4){
          if(isLikelyBackgroundPixel(data[i],data[i+1],data[i+2],data[i+3],policy)){
            data[i+3]=0;
          }
        }
        c.putImageData(img,sx,sy);
        processedCells.add(cellKey);
      }

      if(!removeBackground){
        rects[id]={x:sx,y:sy,w:fw,h:fh};
        continue;
      }

      const cell=c.getImageData(sx,sy,fw,fh).data;
      let minX=fw,minY=fh,maxX=-1,maxY=-1;
      for(let y=0;y<fh;y+=2){
        for(let x=0;x<fw;x+=2){
          if(cell[(y*fw+x)*4+3]>24){
            minX=Math.min(minX,x);minY=Math.min(minY,y);
            maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);
          }
        }
      }

      if(maxX>=minX&&maxY>=minY){
        const pad=4;
        const x0=Math.max(0,minX-pad),y0=Math.max(0,minY-pad);
        const x1=Math.min(fw-1,maxX+pad),y1=Math.min(fh-1,maxY+pad);
        rects[id]={x:sx+x0,y:sy+y0,w:x1-x0+1,h:y1-y0+1};
      }else{
        console.warn(`Sprite became empty after background processing: ${atlasId}.${id}`);
      }
    }

    return {id:atlasId,meta,image,canvas,rects,valid:Object.keys(rects).length>0};
  }

  async function loadReadyAtlases(){
    const manifestModules=state.manifest?.modules||{};
    const registryAtlases=state.registry?.atlases||{};
    const activeModules=Object.entries(manifestModules).filter(([,moduleMeta])=>moduleMeta?.enabled);
    const results=await Promise.allSettled(activeModules.map(async([moduleId,moduleMeta])=>{
      const registryAtlas=registryAtlases[moduleId];
      if(!registryAtlas)throw Error(`Registry missing atlas entry: ${moduleId}`);
      if(moduleMeta.registry&&moduleMeta.registry!=="data/sprite_registry.json"){
        console.warn(`Module ${moduleId} points to alternate registry ${moduleMeta.registry}, runtime currently uses the loaded registry file.`);
      }
      if(moduleMeta.file&&registryAtlas.file&&moduleMeta.file!==registryAtlas.file){
        console.warn(`Manifest file mismatch for ${moduleId}: ${moduleMeta.file} vs ${registryAtlas.file}`);
      }
      if(!registryAtlas.file)throw Error(`Atlas missing file path: ${moduleId}`);
      const image=await getImage(normalizeAssetPath(registryAtlas.file)+`?cache=${assetCache}`);
      return [moduleId,prepareAtlas(moduleId,image)];
    }));
    results.forEach((result,index)=>{
      const [moduleId] = activeModules[index];
      if(result.status==="fulfilled"&&result.value[1]?.valid){
        state.atlases[moduleId]=result.value[1];
      }else{
        console.warn(`Atlas unavailable: ${moduleId}`,result.status==="rejected"?result.reason:"invalid atlas");
        const fallback=getModuleFallback(moduleId);
        if(fallback!=="none")console.warn(`Fallback active for ${moduleId}: ${fallback}`);
      }
    });
  }

  function findSprite(spriteId){
    for(const [atlasId,atlas] of Object.entries(state.atlases)){
      const meta=atlas.meta.sprites?.[spriteId];
      const rect=atlas.rects?.[spriteId];
      if(meta&&rect)return {atlasId,atlas,meta,rect};
    }
    return null;
  }

  async function loadRuntimeContracts(paths){
    const results=await Promise.allSettled([
      getJSON(paths.manifest),
      getJSON(paths.layout),
      getJSON(paths.registry),
      getJSON(paths.buildings),
      getJSON(paths.localization),
      getJSON(paths.resources)
    ]);
    if(results[0].status!=="fulfilled"||!validManifest(results[0].value))throw Error("Invalid assets_manifest.json");
    state.manifest=results[0].value;
    if(results[1].status!=="fulfilled"||!validLayout(results[1].value))throw Error("Invalid village_layout.json");
    const layoutData=results[1].value;
    if(results[2].status!=="fulfilled"||!validRegistry(results[2].value))throw Error("Invalid sprite_registry.json");
    state.registry=results[2].value;
    if(results[3].status!=="fulfilled"||!validBuildingsData(results[3].value))throw Error("Invalid buildings.json");
    state.buildingDefs=results[3].value;
    if(results[4].status!=="fulfilled"||!validLocalization(results[4].value))throw Error("Invalid localization_en.json");
    state.localization=results[4].value;
    if(results[5].status!=="fulfilled"||!validResources(results[5].value))throw Error("Invalid resources.json");
    state.resourceDefs=results[5].value;
    state.layout=hydrateLayout(layoutData);
    state.world=state.layout.worldSize;
  }

  function summarizeRuntimeContracts(){
    const missingDefinitions=getMissingBuildingDefinitions(state.layout);
    if(missingDefinitions.length)console.warn("Layout buildings missing definitions:",missingDefinitions);
    const report=getAssetReport();
    const activeFallbacks=report.fallbacks.filter(entry=>!entry.required&&entry.fallback!=="none");
    if(activeFallbacks.length)console.info("Optional module fallbacks:",activeFallbacks);
    return {missingDefinitions,assetReport:report};
  }

  return {
    assertRequiredAssets,
    findSprite,
    getAssetReport,
    getSpritesByRole,
    loadReadyAtlases,
    loadRuntimeContracts,
    pickSpriteByRole,
    summarizeRuntimeContracts
  };
}

global.ReadiWorldFoundation={createContractRuntime};
})(window);