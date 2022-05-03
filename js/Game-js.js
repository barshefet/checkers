class Game {
    constructor(firstPlayer) {
      this.boardData = new BoardData();
      this.currentPlayer = firstPlayer;
      this.winner = undefined;
    }
  
  // Tries to actually make a move. Returns true if successful.
  tryMove(piece, row, col) {
    const possibleMoves = this.getPossibleMoves(piece);
    
    // possibleMoves looks like this: [[1,2], [3,2]]
    for (const possibleMove of possibleMoves) {
      // possibleMove looks like this: [1,2]
      if (possibleMove[0] === row && possibleMove[1] === col) {
        // There is a legal move
        // console.log(possibleMove[0] - piece.row);
        // console.log(possibleMove[1] - piece.col);
        let rowMove = possibleMove[0] - piece.row;
        let colMove = possibleMove[1] - piece.col;

        if(rowMove === 2 && colMove === -2){
          this.boardData.removePiece(row - 1, col + 1);

        }else if(rowMove === 2 && colMove === 2){
          this.boardData.removePiece(row - 1, col - 1);
        
        }else if(rowMove === -2 && colMove === 2){
          this.boardData.removePiece(row + 1, col - 1);
        
        }else if(rowMove === -2 && colMove === -2){
          this.boardData.removePiece(row + 1, col +1);
        }
        piece.row = row;
        piece.col = col;
        this.currentPlayer = piece.getOpponent();
        game.gameWinner(game.boardData);
        return true;
      }
    }
    return false;
  }
  
    getPossibleMoves(piece) {
      if (this.currentPlayer !== piece.player) {
        return [];
      }
      return piece.getPossibleMoves(this.boardData);
    }

    gameWinner(boardData){
      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
          if(boardData.isPlayer(i, j, BLACK_PLAYER) === undefined){
            this.winner = BLACK_PLAYER;
          }else if(boardData.isPlayer(i, j, WHITE_PLAYER) === undefined){
            this.winner = WHITE_PLAYER;
          }
        }
      }
    }
  }
