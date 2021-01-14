# @chesslib/ai
The AI is a simple implementation of a basic board evaluation. The AI is trying every moves possible confirming the board value is better for a given move. The search depth can be configured, and due to it's high CPU intensivity it is recommended to use it with webworkers in browsers, and run it as a seperate process or thread in nodejs if required.


**NOTICE**
This library is not actively maintained, if you wish to take it over please let me know. Cheers!

## Install:
`npm install @chesslib/ai`

https://www.npmjs.com/package/@chesslib/ai

Required dependency:
https://www.npmjs.com/package/@chesslib/core

## API (Basic)

```typescript
import { ChessAI } from "@chesslib/ai";
import { Chessboard, COLORS, Positions } from "@chesslib/core";
var chessboard = Chessboard.fromPosition(Positions.default);

// Create AI that find the best moves for BLACK for the chessboard with 2 players
var ai = new ChessAI(chessboard, COLORS.BLACK, 2);
// Returns the 5 best moves with search depth 3
var moves = ai.getBestMoves(3, 5);
ai.doMoveFEN({
  from: "a2",
  to: "a4"
});
```
For more please see examples folder

## WebWorkers
Simply include `worker.js` in your application.

```typescript
import { Chessboard, COLORS, Positions } from "@chesslib/ai";
import { ChessAIWorker } from "@chesslib/ai";
var chessboard = Chessboard.fromPosition(Positions.default);

let AIWorker = new ChessAIWorker("./worker.js");
// Gets the 210 best moves for BLACK for the given chessboard with 2 players and depth: 5
AIWorker.exec("getBestMoves", chessboard.getBoard(), COLORS.BLACK, 5, 10);
AIWorker.on("moves", moves => {
    // Received Moves array of 
    // {
    //   from: "a2",
    //   to: "a4"
    // }
});
```

The example use of the AI is available in the repo under examples/ folder.

### License:

Apache 2.0


### Got an issue or question?

Open an issue!
