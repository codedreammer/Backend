const arr = [7, 3, 9, 0];

const min = arr.reduce((min, num) => {
  return num < min ? num : min;
}, Infinity);

console.log(min);