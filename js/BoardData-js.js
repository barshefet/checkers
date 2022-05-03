//a class which keeps track of the positioning of all the pieces
class BoardData {
    constructor() {
      this.initialPieces();
    }
    //defines the location of all the pieces at the start of the game
   initialPieces() {
    
    this.pieces = [];
  
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (i % 2 !== 0) {
        this.pieces.push(new Piece(0, i, BLACK_PLAYER));
        this.pieces.push(new Piece(2, i, BLACK_PLAYER));
        this.pieces.push(new Piece(6, i, WHITE_PLAYER));
      } else {
        this.pieces.push(new Piece(1, i, BLACK_PLAYER));
        this.pieces.push(new Piece(5, i, WHITE_PLAYER));
        this.pieces.push(new Piece(7, i, WHITE_PLAYER));
      }
    }
    
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