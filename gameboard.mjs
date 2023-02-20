export default function gameboardFactory() {
  const lenX = 8;
  const lenY = 8;

  let cells = []; // will become a 2d array

  // fill cells array with cells
  for (let i = 0; i < lenX; i++) {
    let row = [];
    for (let j = 0; j < lenY; j++) {
      const newCell = cellFactory([i, j], [lenY, lenX]);
      row[j] = newCell;

      // remove invalid next moves of current cell
      for (let nextMoveIndex in newCell.nextMoves) {
        if (
          !(
            0 <= nextMoves[nextMoveIndex][0] < lenX &&
            0 <= nextMoves[nextMoveIndex][1] < lenY
          )
        ) {
          nextMoves.splice(nextMoveIndex, 1);
        }
      }
    }
    cells[i] = row;
  }

  // traverse the whole board and link cells to their valid moves
  // replaces the nextMoves value with the cell corresponding to those coords
  for (let i = 0; i < lenX; i++) {
    for (let j = 0; j < lenY; j++) {
      const cell = cells[(i, j)];

      for (let nextMoveIndex in cell.nextMoves) {
        // save the coords of the next move
        const coords = nextMoves[nextMoveIndex];
        const nextCell = cells[coords[0], coords[1]];

        // replace the coords in nextMoves with cell
        nextMoves[nextMoveIndex] = nextCell;
      }
    }
  }

  function knightMoves(origin, final) {
    
  }

  return {};
}

function cellFactory(coords, boardDimensions) {
  const x = coords[0];
  const y = coords[1];

  const limx = boardDimensions[0];
  const limy = boardDimensions[1];

  let nextMoves = [
    [x + 2, y + 1],
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x - 1, y - 2],
    [x + 1, y - 2],
    [x + 2, y - 1],
  ];

  // remove invalid next moves
  for (let i in nextMoves) {
    if (nextMoves[i][0] >= limx || nextMoves[i][1] >= limy) {
      delete nextMoves[i];
    }
  }

  function getCoords() {
    return [x, y];
  }

  return {
    nextMoves,
    getCoords,
  };
}
