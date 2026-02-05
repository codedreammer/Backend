// const jsUser = {
//     name: "Alice",
//     age: 30,
//     email: "skskj@gmail",
// }

// const { use } = require("react");

// // console.log(jsUser["email"]);
// jsUser.greetings = function() {
//     console.log(`hello, my name is ${this.name}`);
// }

// console.log(jsUser.greetings());

// function addtwonumber (a,b) {
//     let result = a+b
//     return result;
// }
// const result = addtwonumber(5,10);
// console.log("result", result);

// function login (username) {
//     if(!username){
//         return "please provide username"
//     }
//     return `${username} just logged in`
// }
// console.log(login(""));

function addcartiteam ( num3, ...num1) {
    return num1, num3;
}
console.log(addcartiteam(200, 230,300));