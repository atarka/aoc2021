const fs = require('fs');
let data = fs.readFileSync('input.txt', { encoding: 'utf8' });

const SIZE = 5;

const solve = (data) => {
  const [nums, ...boardData] = data.split(/(\r?\n){2,}/g);
  let lastSolved;

  const boards = boardData.map(board => ({
    rows: new Array(SIZE).fill(0),
    cols: new Array(SIZE).fill(0),
    solved: false,
    cells: board.split(/\D+/g).reduce((acc, n, i) => ({...acc, [n]: i}), {}),
  }));

  for (const num of nums.split(/\D/)) {
    for (board of boards) {
      if (board.solved) continue;
      const pos = board.cells[num];
      if (typeof board.cells[num] !== 'undefined') {
        delete board.cells[num];
        if (++board.rows[Math.floor(pos / SIZE)] === SIZE || ++board.cols[pos % SIZE] === SIZE) {
          board.solved = true;
          lastSolved = num * Object.keys(board.cells).reduce((acc, key) => acc + key * 1, 0);
        }
      }
    }
  }

  return lastSolved;
}

console.log(solve(data));
