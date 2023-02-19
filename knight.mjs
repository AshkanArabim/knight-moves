export default function knightFactory(gameboard) {
  function randomIndex() {
    return Math.floor(Math.random() * 8);
  }

  // randomly place knight
  let x = randomIndex();
  let y = randomIndex();
  let currentCell = gameboard.getCells()[x][y];
  let nextMoves = currentCell.nextMoves;

  function moveValid(targetX, targetY) {
    for (let nextMove of nextMoves) {
      // x and y
      if (nextMove[0] === targetX && nextMove[1] === targetY) {
        return true;
      }
    }
    return false;
  }

  function move(newX, newY) {
    if (moveValid(newX, newY)) {
      x = newX;
      y = newY;
    } else {
      console.log("Invalid move!");
    }
  }

  function getPosition() {
    return [x, y];
  }

  return {
    move,
    getPosition
  };
}
