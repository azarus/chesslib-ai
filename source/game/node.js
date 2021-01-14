var COLORS = require("@chesslib/core").COLORS;
var Chessboard = require("@chesslib/core").Chessboard;
var Positions = require("@chesslib/core").Positions;


var board = new Chessboard();
board.loadPositions(Positions.default);
console.log("chessboard", board.getBoard());

var moves = board.getMoves();
console.log("Moves:", moves);


// AI
var ChessAI = require("@chesslib/ai").ChessAI;
var ai = new ChessAI(board, COLORS.BLACK, 2);
var bestMoves = ai.getBestMoves(2, 10);
console.log("Best Moves for black:", bestMoves);