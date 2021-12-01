const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const counter = data
    .split(/\r?\n/g)
    .reduce((acc, v, i, arr) => i ? acc + (Number(v) > Number(arr[i - 1])) : acc, 0);
