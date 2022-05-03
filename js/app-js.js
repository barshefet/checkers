//global veriables that we use
const BOARD_SIZE = 8;
const CHESS_BOARD_ID = "board";
const BLACK_PLAYER = "black";
const WHITE_PLAYER = "white";

let table;
let game;
let pieces;
let selectedPiece;
let capturedBlackCount = 0;
let capturedWhiteCount = 0;

//adds image of pieces that are black/white.
function addImage(cell, player) {
  const image = document.createElement("img");
  image.src = "images/" + player + ".png";
  image.draggable = false;
  cell.appendChild(image);
}

//initiated by the event listener. marks in classes selected cell and possible moves. and initiates the tryMove function.
function onCellClick(event, row, col) {
  console.log("row " + row);
  console.log("col " + col);

  if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
    selectedPiece = undefined;

    // Recreate whole board
    createBoard(game.boardData);
  } else {
    tryUpdate(row, col);
  }
}
//
function tryUpdate(row, col) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove("possible-move");
      table.rows[i].cells[j].classList.remove("selected");
    }
  }

  const piece = game.boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = game.getPossibleMoves(piece);
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add("possible-move");
    }
  }

  table.rows[row].cells[col].classList.add("selected");
  selectedPiece = piece;
}

//creates the board of the game and peices according to boardData
//TODO: addEvent listener "onclick"
function createBoard(boardData) {
  table = document.getElementById(CHESS_BOARD_ID);
  if (table !== null) {
    //deletes previous board
    table.remove();
  }
  table = document.createElement("table");
  table.id = CHESS_BOARD_ID;

  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();

    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();

      if ((row + col) % 2 === 0) {
        cell.className = "light-box";
      } else {
        cell.className = "dark-box";
      }
      cell.addEventListener("click", (event) => onCellClick(event, row, col));
    }
  }
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player);
  }
  //if the captured pieces count reaches 12 than its game over.
  if (capturedBlackCount === 12) {
    game.winner = WHITE_PLAYER;
  } else if (capturedWhiteCount === 12) {
    game.winner = BLACK_PLAYER;
  }
   //shows end of game banner.
  if (game.winner !== undefined) {
    const winnerPopup = document.createElement("div");
    const winner = game.winner.charAt(0).toUpperCase() + game.winner.slice(1);
    winnerPopup.textContent = winner + " player wins!";
    winnerPopup.classList.add("winner-dialog");
    table.appendChild(winnerPopup);
  }
}

//creates the board + initial places of the pieces.
function intializeGame() {
  game = new Game(WHITE_PLAYER);
  createBoard(game.boardData);
}

// when page loads the intializeGame() is initiated.
window.addEventListener("load", intializeGame);
