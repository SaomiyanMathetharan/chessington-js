import Piece from './piece';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const fromPosition = board.findPiece(this);
        return this.getAllDiagonalAvailableMoves(board)
            .concat(this.getAllLateralAvailableMoves(board))
            .filter((square) => this.oneSpaceAway(fromPosition, square));
    }

    oneSpaceAway(fromPosition, toPosition) {
        return Math.pow(fromPosition.row - toPosition.row, 2) === 1
            || Math.pow(fromPosition.col - toPosition.col, 2) === 1;
    }
}
