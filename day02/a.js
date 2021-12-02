const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const commands = {
  down: { x: 0, y: 1 },
  up: { x: 0, y: -1 },
  forward: { x: 1, y: 0 },
}

const pos = data.split(/\r?\n/g)
  .reduce((pos, command) => {
    const [where, howMuch] = command.split(' ');
    const shift = commands[where];
    return { x: pos.x + shift.x * howMuch, y: pos.y + shift.y * howMuch };
  }, { x: 0, y: 0 });

console.log(pos.x * pos.y);
