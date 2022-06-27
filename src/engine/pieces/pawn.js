import Piece from './piece';
import Player from "../player";
import Square from "../square";

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
        this.direction = this.player === Player.WHITE ? 1 : -1;
    }


    getAvailableMoves(board) {
        const fromPosition = board.findPiece(this);
        const attackSquares = [Square.at(fromPosition.row + this.direction, fromPosition.col - 1),
            Square.at(fromPosition.row + this.direction, fromPosition.col + 1)];
        return this.forwardAvailableMoves(board, fromPosition)
            .concat(this.getAvailableCaptures(attackSquares, board));
    }

    // TODO: what if piece is blocking
    forwardAvailableMoves(board, fromPosition) {
        return this.forwardOneSpaceAvailableMoves(board, fromPosition, this.direction)
            .concat(this.forwardTwoSpacesAvailableMoves(board, fromPosition, this.direction))
            .filter(square => typeof board.getPiece(square) === "undefined");
    }

    forwardOneSpaceAvailableMoves(board, fromPosition) {
        const availableMoves = [];

        const toPositionRow = fromPosition.row + this.direction;
        if (this.boundsCheck(toPositionRow, fromPosition.col, board.board.length)) {
            availableMoves.push(new Square(toPositionRow, fromPosition.col));
        }

        return availableMoves;
    }

    forwardTwoSpacesAvailableMoves(board, fromPosition) {
        const availableMoves = [];

        const toPositionRow = fromPosition.row + this.direction * 2;
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

        return availableMoves
            .filter(square => typeof board.getPiece(Square.at(square.row - this.direction, square.col)) === "undefined");
    }
}
