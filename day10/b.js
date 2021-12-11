const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const openers = {'(': 1, '[': 2, '{': 3, '<': 4};
const closers = {')': 1, ']': 2, '}': 3, '>': 4};

const scores = data.split(/\r?\n/g).map(line => {
  let open = [];
  for (const c of line.split('')) {
    if (openers[c]) {
      open.push(openers[c]);
    } else if (closers[c]) {
      const lastOpener = open.pop();
      if (lastOpener && lastOpener !== closers[c]) return null;
    }
  }
  if (open) {
    open.reverse();
    return open.reduce((acc, points) => acc * 5 + points, 0);
  } else {
    return null;
  }
}).filter(Boolean);

const result = scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
