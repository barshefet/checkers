//class that stores information about each piece and the possible moves it has.
class Piece {
  constructor(row, col, player) {
    this.row = row;
    this.col = col;
    this.player = player;
  }
  //returns the opposite player which is the opponent.
  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER;
    }
    return WHITE_PLAYER;
  }

  /*for all of the pieces in the game there are possible moves, 
    in this function, according to the player selected and the surrounding player,
    the function returns said moves. for examle [(7, 6), (5, 3)] */
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
    //filters the moves so that only move that are on the board will be shown.
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
  //the black player moves can be 1 cell diagonally or 2 cells diagonally("jump")
  getBlackMoves(boardData) {
    let result = [];
    let pieceToRemove = [];

    let jump = [this.row + 2, this.col - 2];
    let position = [this.row + 1, this.col - 1];
    //the possibilities on the left of the player (one cell move or jump)
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position);
    } else if (
      boardData.isPlayer(position[0], position[1], this.getOpponent()) &&
      boardData.isEmpty(jump[0], jump[1])
    ) {
      result.push(jump);
    }

    jump = [this.row + 2, this.col + 2];
    position = [this.row + 1, this.col + 1];
    //the possibilities on the right of the player (one cell move or jump)
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position);
    } else if (
      boardData.isPlayer(position[0], position[1], this.getOpponent()) &&
      boardData.isEmpty(jump[0], jump[1])
    ) {
      result.push(jump);
    }

    return result;
  }
  //the white player moves. can be 1 cell diagonally or 2 cells diagonally("jump")
  getWhiteMoves(boardData) {
    let result = [];

    let jump = [this.row - 2, this.col - 2];
    let position = [this.row - 1, this.col - 1];
    //the possibilities on the left of the player (one cell move or jump)
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position);
    } else if (
      boardData.isPlayer(position[0], position[1], this.getOpponent()) &&
      boardData.isEmpty(jump[0], jump[1])
    ) {
      result.push(jump);
    }

    jump = [this.row - 2, this.col + 2];
    position = [this.row - 1, this.col + 1];
    //the possibilities on the right of the player (one cell move or jump)
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position);
    } else if (
      boardData.isPlayer(position[0], position[1], this.getOpponent()) &&
      boardData.isEmpty(jump[0], jump[1])
    ) {
      result.push(jump);
    }

    return result;
  }
}
