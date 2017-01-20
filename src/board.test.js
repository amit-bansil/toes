// @flow
import {Board} from "./board";
import * as TestUtils from "./test-util";

TestUtils.smoke("Board", Board, {
  clickable: false,
  round: TestUtils.SAMPLE_ROUND,
  board: TestUtils.SAMPLE_BOARD,
});
