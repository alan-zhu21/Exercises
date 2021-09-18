/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// Step One: Planning

// what HTML would be useful for the game board itself?
// use HTML to create the game board 7 wide and 6 deep as well as the top of the board

// how could you represent a played-piece in the HTML board?
// have a red and blue circle set to a variable so I can easily grab the circle and with the data structure I plan to use to represent the played board will have the variable in each grid with a circle

// in the JavaScript, what would be a good structure for the in-memory game board?
// maybe a nested array with each array corresponding to a row

// what might the flow of the game be?
// have a text box at top to provide instructions on whose turn it is and who wins. It could display which player's turn it is or I could have player 1 and player 2 on each side and have a style that shows whose turn it is

// Then, write down some functions names/descriptions that would be useful for this game.
// document.querySelector, position and color in css, alert, need to be able to check four in a row. create a helper function that can check all around it for four in a row and run it each time a move is made then create conditional logic to either proceed to next turn or designate a winner

// Step Two: ES2015

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

//my first attempt:
// function makeBoard() {
//   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
//   // HEIGHT should equal the number of rows or arrays and WIDTH should equal the number of elements in each array
//   const row = [];
//   for (let i = 0; i < WIDTH; i++) {
//     row.push(null);
//   };
//   for (let i = 0; i < HEIGHT; i++) {
//     board.push(row);
//   };
// }

//why didn't this approach work?

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH })); //ask about how this works
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');
  // TODO: add comment for this code

  let top = document.createElement("tr"); //creates top row which will behave differently than the rest of rows
  top.setAttribute("id", "column-top"); //adds id attribute for easier selecting
  top.addEventListener("click", handleClick); //adds function response when an event, a click, occurs

  //this for loop sets up the actual top row for the game board and appends it to the current htmlBoard
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x); //creates a table with the id set to the counter, x
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //creates the actual game board
  for (let y = 0; y < HEIGHT; y++) { //for the number of times equal to the height of the game board, create an html table row and append a cell for the number of times equal to the width of the game board, then append that entire row to the htmlBoard
    const row = document.createElement("tr"); //creates an html table row
    for (let x = 0; x < WIDTH; x++) { //for the width of each row, create a html table cell, set id to template literal that represents it's height and width
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
// y is the row and x is the column  row-col  y-x
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  //takes in 2 parameters, y and x, which correspond to which row and which column respectively
  const newPiece = document.createElement('div');
  newPiece.setAttribute('class', `piece p${currPlayer}`);
  // htmlBoard.append(newPiece)
  const placeInCell = document.getElementById(`${y}-${x}`);
  placeInCell.append(newPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x); //x is 0 which is the column
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currentPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(square => square))) {
    return endGame('Tie game!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) { //this is the function that checks if there's a winner
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) => //for every y and x passed in, it needs to be:
        y >= 0 && //not in the top row
        y < HEIGHT && //within the playing board/grid
        x >= 0 && //same with the horizontal position of the circle which corresponds to the x
        x < WIDTH &&
        board[y][x] === currPlayer //must be true that they are all by the same player
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { //loop down the board
    for (let x = 0; x < WIDTH; x++) { //loop to the right of the board
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //given the cell, check row of 4 to the right
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //given the cell, check col of 4 downward
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //given the cell, check diagonal right; do not need to check up because it starts at the top right; therefore, this logic already covers all possible winning situations
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //given the cell, check diagonal left

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //checks each possible win || is the OR operator
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
