const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const counter = data
  .split(/\r?\n/g)
  .map(Number)
  .reduce((acc, v, i, arr) => i > 2 ? acc + (v > arr[i - 3]) : acc, 0);
