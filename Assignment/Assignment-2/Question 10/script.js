const arr = [1, 2, 3, 4, 5];
let n = 2;

let result = [];

for (let i = 0; i < arr.length; i += n) {
  result.push(arr.slice(i, i + n));
}

console.log(result);