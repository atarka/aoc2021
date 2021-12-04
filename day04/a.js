const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const SIZE = 5;

const solve = (data) => {
  const [nums, ...boardData] = data.split(/(\r?\n){2,}/g);

  const boards = boardData.map(board => ({
    rows: new Array(SIZE).fill(0),
    cols: new Array(SIZE).fill(0),
    cells: board.split(/\D+/g).reduce((acc, n, i) => ({...acc, [n]: i}), {}),
  }));

  for (const num of nums.split(/\D/)) {
    for (board of boards) {
      const pos = board.cells[num];
      if (typeof pos !== 'undefined') {
        delete board.cells[num];
        if (++board.rows[Math.floor(pos / SIZE)] === SIZE || ++board.cols[pos % SIZE] === SIZE) {
          return num * Object.keys(board.cells).reduce((acc, key) => acc + key * 1, 0);
        }
      }
    }
  }
}

console.log(solve(data));
