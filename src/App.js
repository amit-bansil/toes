// @flow
import React from "react";
import {connect} from "react-redux";
import "./app.css";
import SetupPlayers from "./setup-players";
import SetupBoard from "./setup-board";
import Round from "./round";
import RoundOver from "./over-round";
import GameOver from "./over-game";

function render(options) {
  return <div className="appWrap">{renderInner(options)}</div>;
}

function renderInner({mode}) {
  switch (mode) {
    case "SETUP_PLAYERS":
      return <SetupPlayers />;
    case "SETUP_BOARD":
      return <SetupBoard />;
    case "PLAY_ROUND":
      return <Round />;
    case "ROUND_OVER":
      return <RoundOver />;
    case "GAME_OVER":
      return <GameOver />;
    default:
      throw new Error(`unknown mode: ${mode}`);
  }
}

function mapStateToProps(state) {
  return {mode: state.mode};
}

// for some reason prettier is killing the trailing semicolon here
export default connect(mapStateToProps)(render) // eslint-disable-line semi
