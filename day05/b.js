const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const points = {};
data.split(/\r?\n/g).forEach(line => {
  const [x1, y1, x2, y2] = line.split(/\D+/).map(Number);
  const shiftX = x2 === x1 ? 0 : (x2 - x1) / Math.abs(x2 - x1);
  const shiftY = y2 === y1 ? 0 : (y2 - y1) / Math.abs(y2 - y1);
  for (let x = x1, y = y1;; x += shiftX, y += shiftY) {
    points[`${x}:${y}`] = (points[`${x}:${y}`] || 0) + 1;
    if (x === x2 && y === y2) break;
  }
});

const overlap = Object.keys(points).reduce((acc, key) => acc + (points[key] >= 2), 0);
