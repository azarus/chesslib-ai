import { Chessboard, Positions, COLORS } from "@chesslib/core";
import { ChessAI } from "@chesslib/ai";

var board = new Chessboard();
board.loadPositions(Positions.default);
console.log("chessboard", board.getBoard());

var moves = board.getMoves();
console.log("Moves:", moves);


// AI
var ai = new ChessAI(board, COLORS.BLACK, 2);
var bestMoves = ai.getBestMoves(2, 10);
console.log("Best Moves for black:", bestMoves);