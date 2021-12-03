const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const sums = [];
const nums = data.split(/\r?\n/g);
nums.forEach(num => num.split('').forEach((digit, i) => sums[i] = (sums[i] || 0) + digit * 1));

const mid = nums.length / 2;
const [gamma, epsilon] = sums.reduce((acc, n) => [acc[0] * 2 + (n >= mid), acc[1] * 2 + (n < mid)], [0, 0]);

console.log(gamma * epsilon);
