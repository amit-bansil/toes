// @flow
import {App} from "./app";
import * as TestUtils from "./test-util";

TestUtils.smoke("App.SETUP_PLAYERS", App, {mode: "SETUP_PLAYERS"});
TestUtils.smoke("App.SETUP_BOARD", App, {mode: "SETUP_BOARD"});
TestUtils.smoke("App.PLAY_ROUND", App, {mode: "PLAY_ROUND"});
TestUtils.smoke("App.ROUND_OVER", App, {mode: "ROUND_OVER"});
TestUtils.smoke("App.GAME_OVER", App, {mode: "GAME_OVER"});
