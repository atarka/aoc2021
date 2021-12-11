const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const matrix = data.split(/\r?\n/g).map(line => line.split('').map(Number));

const shifts = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const explore = (x, y, explored) => {
  const depth = matrix[y][x];
  explored[`${x}:${y}`] = true;

  for (const [sx, sy] of shifts) {
    const nx = x + sx;
    const ny = y + sy;
    if (ny < 0) continue;
    if (ny >= matrix.length) continue;
    if (nx < 0) continue;
    if (nx >= matrix[ny].length) continue;
    if (matrix[ny][nx] < depth) continue;
    if (matrix[ny][nx] === 9) continue;
    const exploredKey = `${nx}:${ny}`;
    if (explored[exploredKey]) continue;
    explore(nx, ny, explored);
  }
}

let riskLevel = 0;
const basins = [];

for (let y = 0, height = matrix.length; y < height; ++y) {
  const row = matrix[y];
  for (x = 0, width = row.length; x < width; ++x) {
    const big = 1 << 30;
    const minNeighbor = Math.min(
      x ? row[x - 1] : big,
      x < width - 1 ? row[x + 1] : big,
      y ? matrix[y - 1][x] : big,
      y < height - 1 ? matrix[y + 1][x] : big
    );
    if (minNeighbor > row[x]) {
      const explored = {};
      explore(x, y, explored);
      basins.push(Object.keys(explored).length);
    }
  }
}

const size = basins.sort((a, b) => b - a).slice(0, 3).reduce((acc, size) => acc * size, 1);
