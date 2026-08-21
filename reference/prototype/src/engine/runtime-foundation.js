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

  function isLikelyBackgroundPixel(r,g,b,a,policy){
    if(a<245)return true;
    const threshold=policy?.threshold??244;
    const nearWhite=r>=threshold&&g>=threshold&&b>=threshold;
    if(nearWhite)return true;
    if(policy?.mode?.includes("checkerboard")){
      const max=Math.max(r,g,b),min=Math.min(r,g,b);
      const neutral=max-min<(policy.checkerboardTolerance??16);
      const checkerLight=neutral&&r>210&&g>210&&b>210;
      if(checkerLight)return true;
    }
    return false;
  }

  function prepareAtlas(atlasId,image){
    const meta=state.registry?.atlases?.[atlasId];
    if(!meta||!image?.naturalWidth||!image?.naturalHeight)return null;
    const cols=meta.columns||3,rows=meta.rows||2;
    const fw=image.naturalWidth/cols,fh=image.naturalHeight/rows;
    if(!Number.isFinite(fw)||!Number.isFinite(fh)||fw<=0||fh<=0)return null;

    const canvas=document.createElement("canvas");
    canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
    const c=canvas.getContext("2d",{willReadFrequently:true});
    c.drawImage(image,0,0);
    const img=c.getImageData(0,0,canvas.width,canvas.height);
    const data=img.data,policy=meta.backgroundPolicy||{};
    for(let i=0;i<data.length;i+=4){
      if(isLikelyBackgroundPixel(data[i],data[i+1],data[i+2],data[i+3],policy)){
        data[i+3]=0;
      }
    }
    c.putImageData(img,0,0);

    const rects={};
    for(const [id,spriteMeta] of Object.entries(meta.sprites||{})){
      const sx=Math.round((spriteMeta.col||0)*fw),sy=Math.round((spriteMeta.row||0)*fh);
      const ex=Math.round(sx+fw),ey=Math.round(sy+fh);
      const cell=c.getImageData(sx,sy,Math.max(1,ex-sx),Math.max(1,ey-sy)).data;
      let minX=ex,minY=ey,maxX=-1,maxY=-1;
      const cw=Math.max(1,ex-sx),ch=Math.max(1,ey-sy);
      for(let y=0;y<ch;y+=2){
        for(let x=0;x<cw;x+=2){
          const alpha=cell[(y*cw+x)*4+3];
          if(alpha>24){
            minX=Math.min(minX,sx+x);minY=Math.min(minY,sy+y);
            maxX=Math.max(maxX,sx+x);maxY=Math.max(maxY,sy+y);
          }
        }
      }
      if(maxX>=minX&&maxY>=minY){
        const pad=4;
        rects[id]={
          x:Math.max(sx,minX-pad),y:Math.max(sy,minY-pad),
          w:Math.min(ex-1,maxX+pad)-Math.max(sx,minX-pad)+1,
          h:Math.min(ey-1,maxY+pad)-Math.max(sy,minY-pad)+1
        };
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