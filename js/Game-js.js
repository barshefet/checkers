//this class contains the boardData and the method to check if a move can be made, as well as desiding what turn is it.
class Game {
  constructor(firstPlayer) {
    this.boardData = new BoardData();
    this.currentPlayer = firstPlayer;
    this.winner = undefined;
  }

  // Tries to actually make a move. Returns true if successful.
  tryMove(piece, row, col) {
    const possibleMoves = this.getPossibleMoves(piece);

    for (const possibleMove of possibleMoves) {
      
      if (possibleMove[0] === row && possibleMove[1] === col) {
        // There is a legal move
        // console.log(possibleMove[0] - piece.row);
        // console.log(possibleMove[1] - piece.col);
        let rowMove = possibleMove[0] - piece.row;
        let colMove = possibleMove[1] - piece.col;
         //checks for legal jump and removes pieces accordingly
        this.isJump(rowMove, colMove, row, col);
        //redefine the piece location.
        piece.row = row;
        piece.col = col;
         //switches turn to the other player (black/white).
        this.currentPlayer = piece.getOpponent();
        
        return true;
      }
    }
    return false;
  }

  //checks if a jump was made and removes the piece that was jumped on.
  isJump(rowMove, colMove, row, col) {
    //checks what type of jump was it (black jump right, white jump left)
    if (rowMove === 2 && colMove === -2) {
      //removes the piece that was captured by the jump.
      this.boardData.removePiece(row - 1, col + 1);
      capturedWhiteCount++; //adds to the captured pieces count.
    } else if (rowMove === 2 && colMove === 2) {
      this.boardData.removePiece(row - 1, col - 1);
      capturedWhiteCount++;
    } else if (rowMove === -2 && colMove === 2) {
      this.boardData.removePiece(row + 1, col - 1);
      capturedBlackCount++;
    } else if (rowMove === -2 && colMove === -2) {
      this.boardData.removePiece(row + 1, col + 1);
      capturedBlackCount++;
    }
  }

   //only show possible moves to the cuurent player.
  getPossibleMoves(piece) {
    if (this.currentPlayer !== piece.player) {
      return [];
    }
    return piece.getPossibleMoves(this.boardData);
  }

 
}
