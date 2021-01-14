import { ChessAI, Evaluator } from "../ChessAI";
import { COLORS } from "@chesslib/core";

export function computeAndMakeMove(board, color, moveCount, evaluator: Evaluator, depth) {
    const ai = new ChessAI(board, color, evaluator);
    const startTime = new Date().getTime();
    const bestMoves = ai.getBestMoves(depth, 15);
    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;
    const perSec = 1000 * ai.terminalPositions / elapsedTime;
    //console.log("Best Moves for black:", bestMoves);

    // TODO randomize if no great difference
    const bestMove = bestMoves[0];

    // Make it always the score for white
    const score = (color === COLORS.BLACK) ? -bestMove.score : bestMove.score;


    console.log(`${color === COLORS.WHITE ? (moveCount + ":") : "  "} ${bestMove.from}-${bestMove.to} (W${score}): ${ai.terminalPositions} terminal positions in ${elapsedTime}ms, ${perSec.toFixed(0)}/s`);
    board.doMoveFEN(bestMove);

    //console.log("chessboard", board.getBoard());
}


