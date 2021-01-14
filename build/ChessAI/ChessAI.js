"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessAI = void 0;
var core_1 = require("@chesslib/core");
var ChessAI = /** @class */ (function () {
    function ChessAI(chessboard, playingSide, evaluator, playerCount) {
        if (playerCount === void 0) { playerCount = 2; }
        this.evaluator = evaluator;
        this.chessboard = null;
        this.terminalPositions = 0;
        this.moves = [];
        this.playingSide = 0;
        this.playerCount = 2;
        this.searchTime = 0;
        this.chessboard = chessboard;
        this.playingSide = playingSide;
        this.playerCount = playerCount;
    }
    ChessAI.prototype.setBoard = function (chessboard) {
        this.chessboard = chessboard;
    };
    ChessAI.prototype.loadBoard = function (positions) {
        this.chessboard = core_1.Chessboard.fromPosition(positions);
    };
    ChessAI.prototype.doMove = function (move) {
        if (!this.chessboard.doMove(move)) {
            return false;
        }
        return true;
    };
    ChessAI.prototype.doMoveFEN = function (move) {
        if (!this.chessboard.doMoveFEN(move)) {
            return false;
        }
        return true;
    };
    ChessAI.prototype.makeMoves = function (searchDepth, amount) {
        if (searchDepth === void 0) { searchDepth = 4; }
        if (amount === void 0) { amount = 1; }
        var bestMoves = this.getBestMoves(searchDepth, amount);
        if (!bestMoves.length) {
            return null;
        }
        for (var _i = 0, bestMoves_1 = bestMoves; _i < bestMoves_1.length; _i++) {
            var bestMove = bestMoves_1[_i];
            this.doMove(bestMove);
        }
        return bestMoves;
    };
    ChessAI.prototype.getBestMove = function (side, searchDepth) {
        var bestMoves = this.getBestMoves(searchDepth);
        if (!bestMoves.length) {
            return this.getRandomMove();
        }
        // var bestMove = null;
        // var bestValue = -9999;
        // if(move.score > bestValue)
        // {
        // 	bestMove = move;
        // 	bestValue = move.score;
        // }
        return bestMoves[0];
    };
    ChessAI.prototype.getBestMoves = function (searchDepth, limit) {
        if (limit === void 0) { limit = 5; }
        this.searchTime = Date.now() + 100;
        var moves = this.chessboard.getMovesFEN(this.playingSide);
        for (var _i = 0, moves_1 = moves; _i < moves_1.length; _i++) {
            var move = moves_1[_i];
            this.chessboard.moveFEN(move.from, move.to);
            // Do not allow the king to be killed?
            move.score = this.evaluateBestMove(this.playingSide, searchDepth - 1, -10000, 10000, false);
            this.chessboard.undo();
        }
        return moves.sort(function (a, b) {
            if (a.score < b.score)
                return 1;
            if (a.score > b.score)
                return -1;
            return 0;
        }).slice(0, limit);
    };
    ChessAI.prototype.getNextPlayerSide = function (playerSide) {
        return (playerSide + 1) % this.playerCount;
    };
    ChessAI.prototype.evaluateBestMove = function (playerSide, depth, alpha, beta, isMaximisingPlayer) {
        if (depth === 0) {
            return this.evaluateBoard(this.playingSide);
        }
        var currentPlayer = this.getNextPlayerSide(playerSide);
        var moves = this.chessboard.getMoves(currentPlayer);
        if (isMaximisingPlayer) {
            var bestValue = -9999;
            for (var _i = 0, moves_2 = moves; _i < moves_2.length; _i++) {
                var move = moves_2[_i];
                this.chessboard.move(move.from, move.to);
                bestValue = Math.max(bestValue, this.evaluateBestMove(currentPlayer, depth - 1, alpha, beta, !isMaximisingPlayer));
                this.chessboard.undo();
                alpha = Math.max(alpha, bestValue);
                if (beta <= alpha) {
                    return bestValue;
                }
            }
            return bestValue;
        }
        else {
            var bestValue = 9999;
            for (var _a = 0, moves_3 = moves; _a < moves_3.length; _a++) {
                var move = moves_3[_a];
                this.chessboard.move(move.from, move.to);
                bestValue = Math.min(bestValue, this.evaluateBestMove(currentPlayer, depth - 1, alpha, beta, !isMaximisingPlayer));
                this.chessboard.undo();
                beta = Math.min(beta, bestValue);
                if (beta <= alpha) {
                    return bestValue;
                }
            }
            return bestValue;
        }
    };
    ChessAI.prototype.getRandomMove = function () {
        var moves = this.chessboard.getMovesFEN(this.playingSide);
        if (!moves.length)
            return null;
        var randMove = moves[Math.floor(Math.random() * moves.length)];
        randMove.score = 0;
        return randMove;
    };
    ChessAI.prototype.evaluateBoard = function (side) {
        ++this.terminalPositions;
        return this.evaluator.evaluateBoard(this.chessboard, side);
    };
    return ChessAI;
}());
exports.ChessAI = ChessAI;
//# sourceMappingURL=ChessAI.js.map