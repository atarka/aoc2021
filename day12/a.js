const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

sdata = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

const nodes = {};
data.split(/\r?\n/g).map(connection => connection.split('-')).forEach(([from, to]) => {
  nodes[from] = (nodes[from] || []).concat(to);
  nodes[to] = (nodes[to] || []).concat(from);
});

let count = 0;
const travel = (from, explored, path) => {
  const node = nodes[from];
  if (explored[from]) return;
  if (from.toLowerCase() === from) explored[from] = true;

  for (const connector of node) {
    if (connector === 'end') ++count;
    else travel(connector, {...explored}, path + '-' + connector);
  }
}

const explored = {};
travel('start', explored, 'start');

console.log(nodes);
console.log(count);
console.log(explored);
