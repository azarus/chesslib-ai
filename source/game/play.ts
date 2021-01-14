
import { COLORS, Chessboard, Positions } from "@chesslib/core";
import { ChessAI, Evaluator } from "../ChessAI";
import { RuleBasedEvaluator } from "../ChessAI/RuleBasedEvaluator";
import { computeAndMakeMove } from "./move";

import { question } from "readline-sync";

const board = new Chessboard();
board.loadPositions(Positions.default);

let moveCount = 0;

const aiColor = COLORS.BLACK;

const depth = 5;
const evaluator: Evaluator = new RuleBasedEvaluator();

while (true) {
    ++moveCount;

    const move = question(`${moveCount}: `);
    // TODO: Log the answer in a database

    const from = move.substring(0, 2);
    const to = move.substring(2, 4);

    // TODO error handling
    //console.log(`You played: ${from}-${to}`);

    board.doMoveFEN({ from, to });

    //var moves = board.getMoves();
    //console.log("Moves:", moves);

    computeAndMakeMove(board, aiColor, moveCount, evaluator, depth);

    //console.log("chessboard", board.getBoard());

}
