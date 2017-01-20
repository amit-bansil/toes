// @flow

import React from "react";
import {App} from "./app";
import * as TestUtils from "./test-util";

TestUtils.smoke("App", <App mode="SETUP_PLAYERS" />);
TestUtils.smoke("App", <App mode="SETUP_BOARD" />);
TestUtils.smoke("App", <App mode="PLAY_ROUND" />);
TestUtils.smoke("App", <App mode="ROUND_OVER" />);
TestUtils.smoke("App", <App mode="GAME_OVER" />);
