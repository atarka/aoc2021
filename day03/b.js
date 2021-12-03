const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const nums = data.split(/\r?\n/g);

const [o2, co2] = [0, 1].map(shift => {
  for (let i = 0, variants, source = nums.concat(); variants = [[], []]; ++i) {
    for (const num of source) variants[num.charAt(i) * 1].push(num);
    source = variants[(shift + Number(variants[1].length >= variants[0].length)) % 2];
    if (source.length === 1) return Number('0b' + source[0]);
  }
});
