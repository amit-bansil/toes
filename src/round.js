// @flow
import React from "react";
import {connect} from "react-redux";
import {TurnIndicator} from "./player";
import Board from "./board";
import * as Types from "./game-types";

type args = {round: Types.Round};
export function Round({round}: args) {
  return (
    <div className="round">
      <TurnIndicator playerId={round.currentPlayerId} />
      <Board clickable={true} />
    </div>
  );
}
function mapStateToProps(state) {
  return {round: state.round};
}
// for some reason prettier is killing the trailing semicolon here
export default connect(mapStateToProps)(Round) // eslint-disable-line semi
