const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const openers = {'(': 3, '[': 57, '{': 1197, '<': 25137};
const closers = {')': 3, ']': 57, '}': 1197, '>': 25137};

const errors = data.split(/\r?\n/g).reduce((acc, line) => {
  const open = [];
  for (const c of line.split('')) {
    if (openers[c]) {
      open.push(openers[c]);
    } else if (closers[c]) {
      const lastOpener = open.pop();
      if (lastOpener && lastOpener !== closers[c]) return acc + closers[c];
    }
  }

  return acc;
}, 0);

console.log(errors);
