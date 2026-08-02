const DEFAULT_IMAGE_FACTORY = () => new Image();

export async function loadAssetImageSet(
  registry,
  requests,
  { imageFactory = DEFAULT_IMAGE_FACTORY, logger = console } = {}
) {
  const entries = await Promise.all(
    Object.entries(requests).map(async ([key, request]) => {
      const resolution = registry.resolve(request);

      if (!resolution.asset) {
        return [key, { resolution, image: null, error: null }];
      }

      try {
        const image = await loadImage(
          resolution.asset.source.uri,
          imageFactory
        );
        return [key, { resolution, image, error: null }];
      } catch (error) {
        logger.warn(
          `Asset image failed to load: ${resolution.asset.id}`,
          error
        );
        return [key, { resolution, image: null, error }];
      }
    })
  );

  return Object.freeze(Object.fromEntries(entries));
}

export function getSpriteDrawRect(asset, anchor, pixelsPerWorldUnit) {
  const width = asset.geometry.drawSize.width * pixelsPerWorldUnit;
  const height = asset.geometry.drawSize.height * pixelsPerWorldUnit;

  return Object.freeze({
    x: anchor.x - width * asset.geometry.pivot.x,
    y: anchor.y - height * asset.geometry.pivot.y,
    width,
    height
  });
}

export function drawLoadedAsset(
  context,
  loadedAsset,
  anchor,
  pixelsPerWorldUnit
) {
  if (!loadedAsset?.image || !loadedAsset.resolution.asset) return false;

  const rect = getSpriteDrawRect(
    loadedAsset.resolution.asset,
    anchor,
    pixelsPerWorldUnit
  );
  context.drawImage(
    loadedAsset.image,
    rect.x,
    rect.y,
    rect.width,
    rect.height
  );
  return true;
}

function loadImage(uri, imageFactory) {
  return new Promise((resolve, reject) => {
    const image = imageFactory();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load image ${uri}.`));
    image.src = uri;

    if (image.complete && image.naturalWidth > 0) resolve(image);
  });
}
