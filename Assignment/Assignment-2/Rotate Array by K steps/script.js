// const arr = [1, 2, 3, 4];
// let k = 1;

// k = k % arr.length;

// let result = [
// ...arr.slice(arr.length - k), 
// ...arr.slice(0, arr.length - k)
// ];

// console.log(result);


//loop based version
const arr = [1, 2, 3, 4];
let k = 1;

let result = [];
let n = arr.length;

k = k % n; 

// Step 1: add last k elements
for (let i = n - k; i < n; i++) {
result.push(arr[i]);
}

// Step 2: add remaining elements
for (let i = 0; i < n - k; i++) {
result.push(arr[i]);
}

console.log(result);