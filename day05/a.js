const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const points = {};
data.split(/\r?\n/g).forEach(line => {
  const [x1, y1, x2, y2] = line.split(/\D+/).map(Number);
  if (x1 === x2 || y1 === y2)
    for (let x = Math.min(x1, x2), tox = Math.max(x1, x2); x <= tox; ++x)
      for (let y = Math.min(y1, y2), toy = Math.max(y1, y2); y <= toy; ++y)
        points[`${x}:${y}`] = (points[`${x}:${y}`] || 0) + 1;
});

const overlap = Object.keys(points).reduce((acc, key) => acc + (points[key] >= 2), 0);
