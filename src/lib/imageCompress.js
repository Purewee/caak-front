export function imageCompress(image, options = {}) {
  return import('compressorjs').then(
    ({ default: ImageCompressor }) =>
      new Promise(
        (resolve, reject) =>
          new ImageCompressor(image, {
            quality: options.quality || 0.6,
            maxWidth: options.maxWidth || 1500,
            convertSize: options.convertSize || 1024 * 1024,
            success: resolve,
            error: reject,
          }),
      ),
  );
}

export const getDataFromBlob = (myBlob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(myBlob);
  });
