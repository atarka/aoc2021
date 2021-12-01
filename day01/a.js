const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const counter = data
  .split(/\r?\n/g)
  .map(Number)
  .reduce((acc, v, i, arr) => i ? acc + (v > arr[i - 1]) : acc, 0);
