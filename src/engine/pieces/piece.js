import Square from "../square";

export default class Piece {
    constructor(player) {
        this.player = player;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    concatAvailableMoves() {
        let availableMoves = [];
        for (const possibleMoves of arguments) {
            availableMoves = availableMoves.concat(possibleMoves);
        }
        return availableMoves;
    }

    getAllLateralAvailableMoves(board) {
        const availableMoves = [];
        const fromPosition = board.findPiece(this);

        for (let i = 0; i < board.board.length; i++) {
            availableMoves.push(new Square(i, fromPosition.col));
            availableMoves.push(new Square(fromPosition.row, i));
        }

        return availableMoves.filter(square => !square.equals(fromPosition));
    }

    getAllDiagonalAvailableMoves(board) {
        const fromPosition = board.findPiece(this);

        let availableMoves = this.concatAvailableMoves(
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
