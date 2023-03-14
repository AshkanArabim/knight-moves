import cellFactory from "./cell.mjs";

export default (function gameboardFactory() {
  const lenX = 4;
  const lenY = 4;

  let cells = []; // will become a 2d array

  // fill cells array with cells
  for (let i = 0; i < lenX; i++) {
    let row = [];
    for (let j = 0; j < lenY; j++) {
      const newCell = cellFactory([i, j], [lenY, lenX]);
      row[j] = newCell;
    }
    cells[i] = row;
  }

  // traverse the whole board and link cells to their valid moves
  // replaces the nextMoves value with the cell corresponding to those coords
  for (let i = 0; i < lenX; i++) {
    for (let j = 0; j < lenY; j++) {
      const cell = cells[i][j];

      let nm = cell.nextMoves;
      for (let nextMoveIndex in nm) {
        // save the coords of the next move
        const coords = nm[nextMoveIndex];
        const nextCell = cells[coords[0]][coords[1]];

        // replace the coords in nextMoves with cell
        nm[nextMoveIndex] = nextCell;
      }
    }
  }

  let shortestPath = [];

  // recursive method to find the shortest path
  function knightRecurse(currentCoords, endCoords, breadCrumbs) {
    const currentCell = cells[currentCoords[0]][currentCoords[1]];

    // Base case 1:
    if (
      // check if breadcrumbs already includes the current coordinates
      breadCrumbs.some((arr) =>
        arr.every((val, index) => val === currentCoords[index])
      )
    ) {
      // return, because it's already covered
      console.log(currentCoords + " is already covered!!!");
      return;
    }

    breadCrumbs.push(currentCoords);

    console.log(breadCrumbs);

    // base case 2: check if the coordinates match
    // if the length of shortest path is 0 or the length is bigger the current path, replace it with current path
    if (
      // check if currentCoords and endCoords are the same
      currentCoords.every((val, index) => val === endCoords[index]) &&
      // check if the length of shortest path is longer or 0
      (breadCrumbs.length < shortestPath.length ||
        shortestPath.length === 0)
    ) {
      shortestPath = [...breadCrumbs];
      // debug:
      console.log("Shortest path found!!!");
      return;
    }

    // recursive case: for each next move, call self
    for (let nextMove of currentCell.nextMoves) {
      console.log(nextMove.getCoords());
      knightRecurse(nextMove.getCoords(), endCoords, breadCrumbs);
    }
  }

  function knightMoves(initCoords, endCoords) {
    knightRecurse(initCoords, endCoords, []);
    let moves = "";

    for (let cell of shortestPath) {
      let x = cell[0];
      let y = cell[1];
      moves += ` --> [${x},${y}]`;
    }
    console.log("finished!");
    return moves;
  }

  return knightMoves;
})();
