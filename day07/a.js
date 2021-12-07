const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const positions = data.split(/\D+/g).map(Number);
const med = median(positions);
console.log(positions.reduce((acc, position) => acc + Math.abs(position - med), 0));
