const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const positions = data.split(/\D+/g).map(Number);
const [min, max] = positions.reduce((acc, pos) => [Math.min(pos, acc[0]), Math.max(pos, acc[1])], [1 << 30, 0]);
const fuel = steps => steps * (steps + 1) / 2;

let bestFuel = 1 << 30;
for (let point = min; point <= max; ++point) {
  let fuelSum = 0;
  for (const pos of positions) {
    fuelSum += fuel(Math.abs(pos - point));
  }
  bestFuel = Math.min(bestFuel, fuelSum);
}

console.log(bestFuel);
