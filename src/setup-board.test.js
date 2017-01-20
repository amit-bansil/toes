// @flow
import {SetupBoard} from "./setup-board";
import * as TestUtils from "./test-util";

TestUtils.smoke("SetupBoard", SetupBoard, {
  playedBoards: [TestUtils.SAMPLE_BOARD],
  activePlayerId: 0,
  board: TestUtils.SAMPLE_BOARD,
  error: "aba",
  round: TestUtils.SAMPLE_ROUND,
});
