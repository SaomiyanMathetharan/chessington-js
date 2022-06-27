import Piece from './piece';
import Square from "../square";

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const availableMoves = [];
        const fromPosition = board.findPiece(this);

        for (let i = 0; i < board.board.length; i++) {
            availableMoves.push(new Square(i, fromPosition.col));
            availableMoves.push(new Square(fromPosition.row, i));
        }

        return availableMoves.filter(square => !square.equals(fromPosition));
    }
}
