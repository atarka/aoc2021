const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const nodes = {};
data.split(/\r?\n/g).map(connection => connection.split('-')).forEach(([from, to]) => {
  nodes[from] = (nodes[from] || []).concat(to);
  nodes[to] = (nodes[to] || []).concat(from);
});

const travel = (from, explored) => {
  let count = 0;
  let increased = null;
  if (from.toLowerCase() === from) {
    if (explored[from] === 2) return 0;
    if (explored[from] === 1) {
      if (explored._zwei) return 0;
        if (from === 'start') return 0;
      explored._zwei = true;
    }
    increased = from;
    explored[from] = (explored[from] || 0) + 1;
  }

  const node = nodes[from];

  for (const connector of node) {
    if (connector === 'end') ++count;
    else count += travel(connector, explored);
  }

  if (increased) {
    if (explored[increased] === 2) explored._zwei = false;
    --explored[increased];
  }

  return count;
}

console.log(travel('start', {}, 'start'));
