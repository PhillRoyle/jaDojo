class Minesweeper {
  countNeighbours(rowIndex, columnIndex, grid) {
    const rowRange = [rowIndex - 1, rowIndex, rowIndex + 1]
      .filter(row => row >= 0 && row < grid.length);
    const columnRange = [columnIndex - 1, columnIndex, columnIndex + 1]
      .filter(column => column >= 0 && column < grid[0].length);
    let count = 0;

    for (const rowRangeIndex of rowRange) {//'of' gives the value
      for (const colRangeIndex of columnRange) {//'of' gives the value
        if (grid[rowRangeIndex][colRangeIndex] === '*') {
          count++;
        }
      }
    }
    return count;
  }

  annotate(grid) {
    const output = [...grid];

    for (const rowIndex in [...Array(grid.length).keys()]) { //'in' gives index as a string
      for (const colIndex in [...Array(grid[rowIndex].length).keys()]) { //'in' gives index as a string
        if (colIndex == 0) {
          output[rowIndex] = ''; //initialise the row
        }

        output[rowIndex] += grid[rowIndex][colIndex] === ' ' ?
          `${this.countNeighbours(Number(rowIndex), Number(colIndex), grid) || ' '}` :
          '*';
      }
    }
    return output;
  }
}

export default Minesweeper;
