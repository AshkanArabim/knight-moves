export default function gameboardFactory() {
  const height = 8;
  const width = 8;

  let cells = []; // will become a 2d array

  // fill cells array with cells
  for (let i = 0; i < width; i++) {
    let row = [];
    for (let j = 0; j < height; j++) {
      row[j] = cellFactory([i, j], [width, height]);
    }
    cells[i] = row;
  }

  function getCells() {
    return cells;
  }

  return {
    getCells,
  };
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

  function getNextMoves() {
    return nextMoves;
  }

  function getCoords() {
    return coords;
  }

  return {
    getNextMoves,
    getCoords,
  };
}
