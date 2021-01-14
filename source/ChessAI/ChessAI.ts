import { Chessboard, Positions, COLORS } from "@chesslib/core";

/**
 * Pawn = 10
 */
export interface Evaluator {

	evaluateBoard(board: Chessboard, color): number;
}

export class ChessAI {
	chessboard: Chessboard = null;

	terminalPositions = 0;

	moves = [];
	playingSide = 0;
	playerCount = 2;
	searchTime = 0;

	constructor(chessboard, playingSide, private evaluator: Evaluator, playerCount = 2) {
		this.chessboard = chessboard;
		this.playingSide = playingSide;
		this.playerCount = playerCount;
	}

	setBoard(chessboard) {
		this.chessboard = chessboard;
	}

	loadBoard(positions) {
		this.chessboard = Chessboard.fromPosition(positions);
	}

	doMove(move) {
		if (!this.chessboard.doMove(move)) {
			return false;
		}

		return true;
	}

	doMoveFEN(move) {
		if (!this.chessboard.doMoveFEN(move)) {
			return false;
		}

		return true;
	}

	makeMoves(searchDepth = 4, amount = 1) {
		var bestMoves = this.getBestMoves(searchDepth, amount);
		if (!bestMoves.length) {
			return null;
		}

		for (var bestMove of bestMoves) {
			this.doMove(bestMove);
		}
		return bestMoves;
	}

	getBestMove(side, searchDepth) {

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
	}

	getBestMoves(searchDepth, limit = 5) {
		this.searchTime = Date.now() + 100;
		var moves = this.chessboard.getMovesFEN(this.playingSide);

		for (let move of moves) {
			this.chessboard.moveFEN(move.from, move.to);

			// Do not allow the king to be killed?
			move.score = this.evaluateBestMove(this.playingSide, searchDepth - 1, -10000, 10000, false);
			this.chessboard.undo();

		}

		return moves.sort((a, b) => {
			if (a.score < b.score)
				return 1;
			if (a.score > b.score)
				return -1;
			return 0;
		}).slice(0, limit);
	}

	getNextPlayerSide(playerSide) {
		return (playerSide + 1) % this.playerCount;
	}

	evaluateBestMove(playerSide, depth, alpha, beta, isMaximisingPlayer) {
		if (depth === 0) {
			return this.evaluateBoard(this.playingSide);
		}
		var currentPlayer = this.getNextPlayerSide(playerSide);
		var moves = this.chessboard.getMoves(currentPlayer);

		if (isMaximisingPlayer) {
			var bestValue = -9999;
			for (let move of moves) {
				this.chessboard.move(move.from, move.to);
				bestValue = Math.max(bestValue, this.evaluateBestMove(currentPlayer, depth - 1, alpha, beta, !isMaximisingPlayer));
				this.chessboard.undo();
				alpha = Math.max(alpha, bestValue);
				if (beta <= alpha) {
					return bestValue;
				}
			}
			return bestValue;
		} else {
			var bestValue = 9999;
			for (let move of moves) {
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
	}

	getRandomMove() {
		var moves = this.chessboard.getMovesFEN(this.playingSide);
		if (!moves.length)
			return null;
		var randMove = moves[Math.floor(Math.random() * moves.length)];
		randMove.score = 0;
		return randMove;
	}

	evaluateBoard(side) {
		++this.terminalPositions;
		return this.evaluator.evaluateBoard(this.chessboard, side);
	}

}
