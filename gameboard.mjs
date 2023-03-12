import cellFactory from "./cell.mjs";

export default (function gameboardFactory() {
  const lenX = 8;
  const lenY = 8;

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

      // console.log(cell); // DEBUG

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

  // recursive method to find the shortest path
  let shortestPath = [];
  function knightRecurse(currentCoords, endCoords, breadCrumbs) {
    const currentCell = cells[currentCoords[0]][currentCoords[1]];

    if (
      // check if breadcrumbs already includes the current coordinates
      breadCrumbs.some((arr) =>
        arr.every((val, index) => val === currentCoords[index])
      )
    ) {
      return;
    } else {
      // if not, add current move to tracking
      breadCrumbs.push(currentCoords);
      console.log(breadCrumbs);
      if (
        // check if the coordinates match
        currentCoords.every(
          (val, index) => val === endCoords[index]
        ) &&
        breadCrumbs.length < shortestPath.length
      ) {
        shortestPath = breadCrumbs;
        console.log("finished!")
      } else {
        for (let nextMove of currentCell.nextMoves) {
          console.log(nextMove.getCoords());
          knightRecurse(nextMove.getCoords(), endCoords, breadCrumbs);
        }
      }
    }
  }

  // function to determine whether an array contains another array
  function arrayIncludes(bigArr, subArr) {
    // iterate over arrays in original array
    for (let i in bigArr) {
      let bothEqual = true;

      // compare the elements of this array with the elements of subArr
      for (let j in bigArr[i]) {
        // if one is different, z
        if (bigArr[i][j] !== subArr[j]) {
          bothEqual = false;
          break;
        }
      }

      if (bothEqual) {
        return true;
      }
    }

    return false;
  }

  function knightMoves(initCoords, endCoords) {
    knightRecurse(initCoords, endCoords, []);
    let moves = "";

    for (cell of shortestPath) {
      let coords = cell.getCoords();
      let x = coords[0];
      let y = coords[1];
      moves += `${x}, ${y}`;
    }
    console.log("finished!");
    console.log(shortestPath);
    return moves;
  }

  return knightMoves;
})();
