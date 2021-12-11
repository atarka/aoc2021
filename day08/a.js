const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const fit = {2: true, 3: true, 4: true, 7: true};
const count = data
  .split(/\r?\n/g)
  .map(line => line.split(' | '))
  .reduce((acc, [_, output]) => acc + output.split(' ').filter(digit => fit[digit.length]).length, 0);
