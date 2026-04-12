    const arr = [1, [2, 3], 4];

    let result = [];

    for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
        // if element is array
        for (let j = 0; j < arr[i].length; j++) {
        result.push(arr[i][j]);
        }
    } else {
        // normal element
        result.push(arr[i]);
    }
    }

    console.log(result);