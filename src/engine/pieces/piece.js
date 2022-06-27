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

    getAllLateralAvailableMoves(board) {
        const availableMoves = [];
        const fromPosition = board.findPiece(this);

        for (let i = 0; i < board.board.length; i++) {
            availableMoves.push(new Square(i, fromPosition.col));
            availableMoves.push(new Square(fromPosition.row, i));
        }

        const upClosestPiece = this.findClosestPiece(fromPosition, board, 0, -1);
        const downClosestPiece = this.findClosestPiece(fromPosition, board, 0, 1);
        const leftClosestPiece = this.findClosestPiece(fromPosition, board, -1, 0);
        const rightClosestPiece = this.findClosestPiece(fromPosition, board, 1, 0);

        return availableMoves.filter(square => !square.equals(fromPosition))
            .filter(square => leftClosestPiece.col < square.col && square.col < rightClosestPiece.col)
            .filter(square => upClosestPiece.row < square.row && square.row < downClosestPiece.row);
    }

    getAllDiagonalAvailableMoves(board) {
        const fromPosition = board.findPiece(this);

        const upLeftClosestPiece = this.findClosestPiece(fromPosition, board, -1, -1);
        const upRightClosestPiece = this.findClosestPiece(fromPosition, board, 1, -1);
        const downLeftClosestPiece = this.findClosestPiece(fromPosition, board, -1, 1);
        const downRightClosestPiece = this.findClosestPiece(fromPosition, board, 1, 1);

        const a = this.diagonalAvailableMoves(board, fromPosition, 1, 1)
            .concat(this.diagonalAvailableMoves(board, fromPosition, -1, 1))
            .concat(this.diagonalAvailableMoves(board, fromPosition, 1, -1))
            .concat(this.diagonalAvailableMoves(board, fromPosition, -1, -1))
            .filter(square => !square.equals(fromPosition))
            .filter(square => upLeftClosestPiece.col < square.col || upLeftClosestPiece.row < square.row)
            .filter(square => square.col < upRightClosestPiece.col || upRightClosestPiece.row < square.row)
            .filter(square => downLeftClosestPiece.col < square.col || square.row < downLeftClosestPiece.row)
            .filter(square => square.col < downRightClosestPiece.col || square.row < downRightClosestPiece.row);
        console.log(a);
        return a;
    }

    diagonalAvailableMoves(board, fromPosition, xDirection, yDirection) {
        let row = fromPosition.row;
        let col = fromPosition.col;
        const size = board.board.length;

        const availableMoves = [];
        while (this.boundsCheck(row, col, size)) {
            availableMoves.push(new Square(row, col));
            row += yDirection;
            col += xDirection;
        }

        return availableMoves;
    }

    boundsCheck(row, col, size) {
        return 0 <= row && row < size && 0 <= col && col < size;
    }

    findClosestPiece(currentPosition, board, xDirection, yDirection) {
        let row = currentPosition.row + yDirection;
        let col = currentPosition.col + xDirection;

        while (this.boundsCheck(row, col, board.board.length)) {
            if (typeof board.getPiece(Square.at(row, col)) !== "undefined") {
                break;
            }
            row += yDirection;
            col += xDirection;
        }

        return new Square(row, col);
    }

}
