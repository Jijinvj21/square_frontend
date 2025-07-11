export function createImageMap(imageModules) {
  return Object.keys(imageModules).reduce((acc, path) => {
    const imageName = path.split("/").pop().replace(".webp", "");
    acc[imageName] = imageModules[path].default;
    return acc;
  }, {});
}
