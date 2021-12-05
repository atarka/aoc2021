const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const points = {};
data.split(/\r?\n/g).forEach(line => {
  let [x, y, x2, y2] = line.split(/\D+/).map(Number);
  const shiftX = Math.sign(x2 - x);
  const shiftY = Math.sign(y2 - y);
  for (let toX = x2 + shiftX, toY = y2 + shiftY; x !== toX || y !== toY; x += shiftX, y += shiftY)
    points[`${x}:${y}`] = (points[`${x}:${y}`] || 0) + 1;
});

const overlap = Object.keys(points).reduce((acc, key) => acc + (points[key] >= 2), 0);

console.log(overlap);
