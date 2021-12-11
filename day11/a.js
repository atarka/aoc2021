const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const matrix = data.split(/\r?\n/g).map(line => line.split('').map(Number));
let flashes = 0;

const flashThem = () => {
  flashQueue = [];

  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0, width = matrix[y].length; x < width; ++x) {
      if (matrix[y][x] < 0) matrix[y][x] = 0;
      flashQueue.push([x, y]);
    }
  }

  while (true) {
    const item = flashQueue.shift();
    if (!item) break;

    const [x, y] = item;
    if (++matrix[y][x] > 9) {
      matrix[y][x] = -1000000000;
      ++flashes;

      for (sy = -1; sy <= 1; ++sy) {
        for (sx = -1; sx <= 1; ++sx) {
          if (!sx && !sy) continue;
          const nx = x + sx;
          const ny = y + sy;
          if (ny < 0 || ny >= matrix.length) continue;
          if (nx < 0 || nx >= matrix[ny].length) continue;
          flashQueue.push([nx, ny]);
        }
      }
    }
  }
}


for (let i = 0; i < 100; ++i) flashThem();
matrix.forEach(line => console.log(line.map(item => item < 0 || item >= 10 ? '*' : item).join('')));
console.log(flashes);
