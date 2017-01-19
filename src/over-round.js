// @flow
import React from "react";
import {connect} from "react-redux";
import "./over-round.css";
import * as Action from "./game-actions";
import {WinnerTitle} from "./player";
import BoardScores from "./scores";

function render({dispatch, round}) {
  function nextRound() {
    dispatch(Action.newEndRoundAction());
  }
  let winnerInfo = "Stalemate";
  if (round.winningLine) {
    winnerInfo = <WinnerTitle playerId={round.currentPlayerId} />;
  }
  return (
    <div className="roundOver">
      <h2>Round Over:{" "}{winnerInfo}</h2>
      <a onClick={nextRound}>Next Round</a>
      <BoardScores />
    </div>
  );
}
function mapStateToProps(state) {
  return {round: state.round};
}
// for some reason prettier is killing the trailing semicolon here
export default connect(mapStateToProps)(render) // eslint-disable-line semi
