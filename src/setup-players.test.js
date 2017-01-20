// @flow
import {SetupPlayers} from "./setup-players";
import * as TestUtils from "./test-util";

TestUtils.smoke("SetupPlayers", SetupPlayers, {
  players: TestUtils.SAMPLE_PLAYERS,
  error: "aba",
});
