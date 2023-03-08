export default function cellFactory(coords, boardDimensions) {
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
  console.log("original:");
  console.log(nextMoves);
  let i = 0;
  while (i < nextMoves.length) {
    const ix = nextMoves[i][0];
    const iy = nextMoves[i][1];
    if (ix >= limx || ix < 0 || iy >= limy || iy < 0) {
      nextMoves.splice(i, 1);
      continue;
    }
    i++;
  }
  console.log("cleaned:");
  console.log(nextMoves);

  function getCoords() {
    return [x, y];
  }

  return {
    nextMoves,
    getCoords,
  };
}
