// @flow

import React from "react";
import {shallow} from "enzyme";
import * as Game from "./game";

// TODO try screenshot test
export function smoke(name: string, component: any, props: any) {
  it(`renders ${name} without crashing`, () => {
    shallow(React.createElement(component, props));
  });
}

export const SAMPLE_ROUND = {
  startingPlayerId: 0,
  currentPlayerId: 0,
  lastSquarePlayed: null,
  winningLine: null,
  hasOpenSquare: true,
};
export const SAMPLE_BOARD = Game.createBoard([4, 4], 4);
export const SAMPLE_PLAYERS = [Game.createPlayer(), Game.createPlayer()];
