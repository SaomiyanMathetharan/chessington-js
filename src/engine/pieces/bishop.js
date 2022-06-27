import Piece from './piece';
import Square from "../square";

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let availableMoves = [];
        const fromPosition = board.findPiece(this);

        availableMoves = this.concatAvailableMoves(
            this.diagonalAvailableMoves(board, fromPosition, 1, 1),
            this.diagonalAvailableMoves(board, fromPosition, -1, 1),
            this.diagonalAvailableMoves(board, fromPosition, 1, -1),
            this.diagonalAvailableMoves(board, fromPosition, -1, -1)
        )

        return availableMoves.filter(square => !square.equals(fromPosition));
    }

    diagonalAvailableMoves(board, fromPosition, xDirection, yDirection) {
        let row = fromPosition.row;
        let col = fromPosition.col;
        const size = board.board.length;

        const availableMoves = [];
        while (0 <= row && row < size && 0 <= col && col < size) {
            availableMoves.push(new Square(row, col));
            row += yDirection;
            col += xDirection;
        }

        return availableMoves;
    }
}
