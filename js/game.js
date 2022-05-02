//global veriables that we use
const BOARD_SIZE = 8;
const CHESS_BOARD_ID = "board";
const BLACK_PLAYER = "black";
const WHITE_PLAYER = "white";

let table;
let boardData;
let pieces;
let selectedCell;

//a class which keeps track of the positioning of all the pieces
class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }
  
  
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }

  removePiece(row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i];
      if (piece.row === row && piece.col === col) {
        // Remove piece at index i
        this.pieces.splice(i, 1);
        return piece;
      }
    }
  }

  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col);
    return piece !== undefined && piece.player === player;
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

//class that will store information about each piece and the possible moves it has.
class Piece {
  constructor(row, col, player) {
    this.row = row;
    this.col = col;
    this.player = player;
  }


  getPossibleMoves(BoardData){
   let moves = [];
   if(this.player === BLACK_PLAYER){
     //to be +1, +1
     moves = this.getBlackMoves(BoardData);
   }
   if(this.player === WHITE_PLAYER){
     //to be -1 ,-1
     moves = this.getWhiteMoves(boardData);
   }

   let filteredMoves = [];
      for (const absoluteMove of moves) {
        const absoluteRow = absoluteMove[0];
        const absoluteCol = absoluteMove[1];
        if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
          filteredMoves.push(absoluteMove);
        }
      }
      return filteredMoves;
  }


  getBlackMoves(BoardData){
    let result = [];
    let firstPosition = [this.row + 1, this.col + 1]
    const piece = BoardData.getPiece(firstPosition[0], firstPosition[1]);
    
    result.push(firstPosition);
    result.push([this.row + 1, this.col - 1]);
    
    return result;

  }
  
  getWhiteMoves(){
    let result = [];
    result.push([this.row - 1, this.col - 1]);
    result.push([this.row - 1, this.col + 1]);

    return result;

  }
}


//add image of pieces to their boardData locations
function addImage(cell, player) {
  const image = document.createElement("img");
  image.src = "images/" + player + ".png";
  image.draggable = false;
  cell.appendChild(image);
}

//initiated by the event listener. shows the cell the user selected and possible moves.
function onCellClick(event, row, col){
  console.log("row " + row);
  console.log("col " + col);

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }
  
  const piece = boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves(piece);
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add('possible-move');
    }
  }

  table.rows[row].cells[col].classList.add('selected');
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
      cell.addEventListener("click", (event) => onCellClick(event, row, col));
    }
  }
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}

// when page loads the intializeGame() is initiated.
window.addEventListener("load", intializeGame());