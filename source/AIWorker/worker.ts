import { Chessboard, Positions, COLORS } from "@chesslib/core";
import { ChessAI } from "../ChessAI";
import { RuleBasedEvaluator } from "../ChessAI/RuleBasedEvaluator";

import { AIWorker } from "./Utils/AIWorker";

export class ChessAIWorker extends AIWorker {
	constructor() {
		super();
		console.log("ChessAIWorker running.");
	}

	getBestMoves(boardData, color, searchDepth, moveCount) {
		var board = new Chessboard();
		board.setBoard(boardData);
		var ai = new ChessAI(board, color, new RuleBasedEvaluator(), 2);
		var moves = ai.getBestMoves(searchDepth, moveCount);
		this.emit("moves", moves);

	}
};

// Launch AI Worker
var aiWorker = new ChessAIWorker();