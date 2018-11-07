class Minesweeper {
  countNeighbours(row, column, grid){
    let rowRange = [row - 1, row, row + 1].filter(row => row >= 0 && row < grid.length);
    let columnRange = [column - 1, column, column + 1].filter(column => column >= 0 && column < grid[0].length);
    let count = 0;

    for(let rowRangeIndex in rowRange) {
      for(let colRangeIndex in columnRange) {
        if(grid[rowRangeIndex][colRangeIndex]=== '*') {
          count++;
        }
      }
    }
    return count;
  }

  annotate(grid) {
    // let output = [...grid];
    let output = [];

    if (grid.length === 1 && grid[0] === '') {
      output = [''];
    }

    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[row].length; column++) {
        if (column === 0) {
          output[row] = '';
        }

        if (grid[row][column] === ' ') {
          output[row] += `${this.countNeighbours(row, column, grid) || ' '}`;
        } else {
          output[row] += '*';
        }
      }
    }

    return output;
  }
}

export default Minesweeper;
