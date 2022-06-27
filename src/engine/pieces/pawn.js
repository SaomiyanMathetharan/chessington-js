import Piece from './piece';
import Player from "../player";
import Square from "../square";

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }


    getAvailableMoves(board) {
        const fromPosition = board.findPiece(this);
        return this.forwardAvailableMoves(board, fromPosition);
    }

    // TODO: what if piece is blocking
    forwardAvailableMoves(board, fromPosition) {
        const direction = this.player === Player.WHITE ? 1 : -1;

        return this.concatAvailableMoves(
            this.forwardOneSpaceAvailableMoves(board, fromPosition, direction),
            this.forwardTwoSpacesAvailableMoves(board, fromPosition, direction)
        );
    }

    forwardOneSpaceAvailableMoves(board, fromPosition, direction) {
        const availableMoves = [];

        const toPositionRow = fromPosition.row + direction;
        if (toPositionRow >= 0 && toPositionRow < board.board.length) {
            availableMoves.push(new Square(toPositionRow, fromPosition.col));
        }

        return availableMoves;
    }

    forwardTwoSpacesAvailableMoves(board, fromPosition, direction) {
        const availableMoves = [];

        const toPositionRow = fromPosition.row + direction * 2;
        // TODO: check if boundary needs to be checked
        if ((fromPosition.row === 1) ||
                (fromPosition.row === board.board.length - 2)) {
            availableMoves.push(new Square(toPositionRow, fromPosition.col));
        }

        /* INCLUDES BOUNDARY CHECK
        if ((fromPosition.row === 1 && toPositionRow === 3) ||
                (fromPosition.row === board.board.length - 2 && toPositionRow === board.board.length - 4)) {
            availableMoves.push(new Square(toPositionRow, fromPosition.col));
        }
         */

        return availableMoves;
    }


}
