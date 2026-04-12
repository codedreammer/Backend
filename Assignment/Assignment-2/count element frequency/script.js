    const arr = ['a', 'b', 'a', 'c'];

    let count = {};

    for (let i = 0; i < arr.length; i++) {
    let value = arr[i];

    if (count[value]) {
        count[value] = count[value] + 1;
    } else {
        count[value] = 1;
    }
    }

    console.log(count);