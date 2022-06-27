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

        const boardSize = board.board.length;
        return availableMoves.filter(square => this.boundsCheck(square.row, square.col, boardSize))
            .filter(square => {
                const piece = board.getPiece(square);
                return typeof piece === "undefined" || (piece.capturable && piece.player !== this.player);
            });
    }


}
