import React from "react";
import {Board} from "./board";
import * as TestUtils from "./test-util";
import * as Game from "./game";

TestUtils.smoke(
  "Board",
  <Board clickable={false} round={
    {
      startingPlayerId: 0,
      currentPlayerId: 0,
      lastSquarePlayed: null,
      winningLine: null,
      hasOpenSquare: true,
    }
  } board={Game.createBoard([4, 4], 4)} />,
);
