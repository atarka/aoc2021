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
    cells: board.split(/\D+/g).map((n, i) => ({n, i, marked: false}))
  }));

  for (const num of nums.split(/\D/)) {
    for (board of boards) {
      if (board.solved) continue;
      const pos = board.cells.find(cell => cell.n === num);
      if (pos) {
        pos.marked = true;
        if (++board.rows[Math.floor(pos.i / SIZE)] === SIZE || ++board.cols[pos.i % SIZE] === SIZE) {
          board.solved = true;
          lastSolved = num * board.cells.filter(cell => !cell.marked).reduce((acc, cell) => acc + cell.n * 1, 0);
        }
      }
    }
  }

  return lastSolved;
}

console.log(solve(data));
