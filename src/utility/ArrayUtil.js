export function removeItemByIndex(array, index) {
  if (array.length === 1) {
    return [];
  }

  array.splice(index, 1);

  return array;
}

var object = {};
export default object;
