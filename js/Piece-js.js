//class that will store information about each piece and the possible moves it has.
class Piece {
  constructor(row, col, player) {
    this.row = row;
    this.col = col;
    this.player = player;
  }

  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER;
    }
    return WHITE_PLAYER;
  }

  getPossibleMoves(boardData) {
    let moves = [];
    if (this.player === BLACK_PLAYER) {
      //to be +1, +1
      moves = this.getBlackMoves(boardData);
    }
    if (this.player === WHITE_PLAYER) {
      //to be -1 ,-1
      moves = this.getWhiteMoves(boardData);
    }

    let filteredMoves = [];
    for (const absoluteMove of moves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }

  getBlackMoves(boardData) {
    let result = [];
    

    let position = [this.row + 1, this.col - 1];
    if(boardData.isEmpty(position[0], position[1])){
    result.push(position);
    }

    position = [this.row + 1, this.col + 1];
    if(boardData.isEmpty(position[0], position[1])){
    result.push(position);
    }

    return result;
  }

  getWhiteMoves(boardData) {
    let result = [];

    let position = [this.row - 1, this.col - 1];
    if(boardData.isEmpty(position[0], position[1])){
    result.push(position);
    }

    position = [this.row - 1, this.col + 1];
    if(boardData.isEmpty(position[0], position[1])){
    result.push(position);
    }
    return result;
  }
}
