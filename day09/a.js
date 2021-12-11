const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const matrix = data.split(/\r?\n/g).map(line => line.split('').map(Number));

let riskLevel = 0;
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
      riskLevel += 1 + row[x];
    }
  }
}

console.log(riskLevel);
