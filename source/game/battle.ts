
import { COLORS, Chessboard, Positions } from "@chesslib/core";
import { ChessAI, Evaluator } from "../ChessAI";
import { bishopPairBoost, pawnWeakness, RuleBasedEvaluator } from "../ChessAI/RuleBasedEvaluator";
import { computeAndMakeMove } from "./move";


const board = new Chessboard();
board.loadPositions(Positions.default);

let moveCount = 0;

const whiteEvaluator: Evaluator = new RuleBasedEvaluator(
    bishopPairBoost(3),
    pawnWeakness({ doubledPawnPenalty: 2, isolatedPawnPenalty: 2, backwardPawnPenalty: 3 }),
);
const blackEvaluator: Evaluator = new RuleBasedEvaluator();
const depth = 5;


while (board) {
    ++moveCount;

    computeAndMakeMove(board, COLORS.WHITE, moveCount, whiteEvaluator, depth);
    computeAndMakeMove(board, COLORS.BLACK, moveCount, blackEvaluator, depth);

}
