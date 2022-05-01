//global veriables that we use
const BOARD_SIZE = 8;
const CHESS_BOARD_ID = "board";
const BLACK_PLAYER = "black";
const WHITE_PLAYER = "white";

let table;
let boardData;
let pieces;

//a class which keeps track of the positioning of all the pieces
class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }
}

//defines the location of all the pieces at the start of the game
function getInitialPieces() {
  let result = [];

  for (let i = 0; i < BOARD_SIZE; i++) {
    if (i % 2 !== 0) {
      result.push(new Piece(0, i, BLACK_PLAYER));
      result.push(new Piece(2, i, BLACK_PLAYER));
      result.push(new Piece(6, i, WHITE_PLAYER));
    } else {
      result.push(new Piece(1, i, BLACK_PLAYER));
      result.push(new Piece(5, i, WHITE_PLAYER));
      result.push(new Piece(7, i, WHITE_PLAYER));
    }
  }
  return result;
}



//class that will store all our pieces
class Piece {
  constructor(row, col, player) {
    this.row = row;
    this.col = col;
    this.player = player;
  }
}
//add image of pieces to their boardData locations
function addImage(cell, player) {
  const image = document.createElement("img");
  image.src = "images/" + player + ".png";
  image.draggable = false;
  cell.appendChild(image);
}

//creates the board + initial places of the pieces.
function intializeGame() {
  boardData = new BoardData(getInitialPieces());
  createBoard(boardData);
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
      //cell.addEventListener("click", (event) => onCellClick(event, row, col));
    }
  }
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}

// when page loads the intializeGame() is initiated.
window.addEventListener("load", intializeGame());
