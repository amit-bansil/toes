// @flow
import React from "react";
import {connect} from "react-redux";
import Board from "./board";
import * as Action from "./game-actions";
import {WinnerTitle} from "./player";
import BoardScores from "./scores";
import * as Types from "./game-types";

type args = {round: Types.Round, dispatch: Types.DispatchFn};
export function GameOver({dispatch, round}: args) {
  function newGame() {
    dispatch(Action.newEndGameAction());
  }
  return (
    <div className="gameOver">
      <h2>Game Over:{" "}<WinnerTitle playerId={round.currentPlayerId} /></h2>
      <a onClick={newGame}>New Game</a>
      <div className="boardAndScores">
        <Board clickable={false} />
        <BoardScores />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {round: state.round};
}
// for some reason prettier is killing the trailing semicolon here
export default connect(mapStateToProps)(GameOver) // eslint-disable-line semi
