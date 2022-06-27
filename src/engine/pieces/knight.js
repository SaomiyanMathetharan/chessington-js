import Piece from './piece';
import Square from "../square";

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const availableMoves = [];
        const fromPosition = board.findPiece(this);
        const knightMoveAdditions = [[1,2], [1,-2], [-1,2], [-1,-2], [2,1], [2,-1], [-2,1], [-2,-1]];
        for (const addToPos of knightMoveAdditions) {
            availableMoves.push(new Square(fromPosition.row + addToPos[0], fromPosition.col + addToPos[1]));
        }

        const size = board.board.length;
        return availableMoves.filter(square => 0 <= square.row && square.row < size && 0 <= square.col && square.col < size);
    }

}
