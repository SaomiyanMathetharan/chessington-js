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
}
