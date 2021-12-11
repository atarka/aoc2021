const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

String.prototype.includesAll = function(a) {
  const arr = this.split('');
  return a.split('').every(part => arr.includes(part));
};

String.prototype.intersect = function (a) {
  const arr = a.split('');
  return this.split('').filter(n => arr.includes(n)).join('');
}

const total = data
  .split(/\r?\n/g)
  .map(line => line.split(' | '))
  .reduce((acc, [patterns, output]) => {
    const list = [];
    patterns
      .split(' ')
      .map(pattern => pattern.split('').sort().join(''))
      .forEach(pattern => list[pattern.length] = (list[pattern.length] || []).concat(pattern));

    const resolved = {
      1: list[2][0],
      4: list[4][0],
      7: list[3][0],
      8: list[7][0],
    };
    resolved[3] = list[5].splice(list[5].findIndex(num => num.includesAll(resolved[1])), 1)[0];
    resolved[6] = list[6].splice(list[6].findIndex(num => !num.includesAll(resolved[1])), 1)[0];
    resolved[9] = list[6].splice(list[6].findIndex(num => num.includesAll(resolved[4])), 1)[0];
    resolved[0] = list[6][0];
    resolved[5] = list[5].splice(list[5].findIndex(num => num.intersect(resolved[6]).intersect(resolved[1]).length), 1)[0];
    resolved[2] = list[5][0];

    const resolveMap = Object.keys(resolved).reduce((acc, key) => ({...acc, [resolved[key]]: key * 1}), {});

    return acc + output
      .split(' ')
      .map(pattern => pattern.split('').sort().join(''))
      .map(pattern => resolveMap[pattern])
      .join('') * 1;
  }, 0);

console.log(total);
