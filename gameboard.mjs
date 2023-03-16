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

  function knightMoves(initCoords, endCoords) {
    // each element in the cell is the list of all coordinates (steps) that led to it.
    // for the first cell, it's just itself
    // for example, an element with two previous steps would be: [initCoords, prevCoords, CurrentCoords]
    const queue = [[initCoords]];
    let shortestPath;

    // create a visited array that is filled with false by default
    let visited = new Array(lenX);
    for (let i = 0; i < visited.length; i++) {
      visited[i] = new Array(lenY).fill(false);
    }

    console.log(cells);

    while (queue.length > 0) {
      const currentSteps = queue.shift();
      const currentCoords = currentSteps[currentSteps.length - 1];
      const [idx1, idx2] = [...currentCoords];

      console.log(idx1);
      console.log(idx2);

      const currentCell = cells[idx1][idx2];

      // if currentCell not visited,
      if (!visited[idx1][idx2]) {
        // check if it matches the final coordinates
        if (
          currentCoords.every(
            (element, index) => element === endCoords[index]
          )
        ) {
          // if it's destination, set shortestPath
          shortestPath = currentSteps;
          // break
          break;
        }

        // if not,
        // set it to visited
        visited[idx1][idx2] = true;

        // add its children to queue with length = length + 1
        for (let nextCell of currentCell.nextMoves) {
          queue.push([...currentSteps, nextCell]);
        }
      }
    }

    // if shortestPath found
    const shortestLen = shortestPath.length;
    if (shortestLen > 0) {
      // print the stuff
      console.log(
        `You made it in ${shortestLen} moves! Here's your path:`
      );
      for (let step of shortestPath) {
        console.log(step);
      }
    } else {
      console.log(
        `Looks like we can't reach that cell in our ${lenX} by ${lenY} board with a knight.`
      );
    }
  }

  return knightMoves;
})();
