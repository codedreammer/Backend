    const arr = [1, 2, 3, 4];
    // let sum = 0;

    // for (let i = 0; i < arr.length; i++) {
    // sum += arr[i];
    // }

    // console.log(sum);

//Using reduce

const sum = arr.reduce((total, num) => total + num, 0);
console.log(sum);