// @flow
import React from "react";
import {connect} from "react-redux";
import {TurnIndicator} from "./player";
import "./round.css";
import Board from "./board";

function render({round}) {
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
export default connect(mapStateToProps)(render) // eslint-disable-line semi
