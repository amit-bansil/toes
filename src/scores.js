// @flow
import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import "./scores.css";
import Board from "./board";

function render({players}) {
  const playersTrs = _.orderBy(players, "wins", "desc").map((aPlayer, index) => {
    return (
      <tr key={index}>
        <td>{aPlayer.name}</td>
        <td>{aPlayer.wins}</td>
      </tr>
    );
  });
  return (
    <div className="boardAndScores">
      <Board />
      <div className="scores">
        <h3>Scores</h3>
        <table><tbody>{playersTrs}</tbody></table>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {players: state.players};
}
// for some reason prettier is killing the trailing semicolon here
export default connect(mapStateToProps)(render) // eslint-disable-line semi
