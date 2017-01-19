// @flow
import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import "./board.css";
import * as Action from "./game-actions";
import {PLAYER_COLORS} from "./constants";

function render({clickable, round, board, dispatch}) {
  function takeSquare(x, y) {
    dispatch(Action.newTakeSquareAction([x, y]));
  }
  const boardRows = [];
  for (let y = 0; y < board.dimensions[1]; y += 1) {
    const tr = [];
    for (let x = 0; x < board.dimensions[0]; x += 1) {
      const square = board.squares[[x, y]];
      const hasOwner = square.ownerId || square.ownerId === 0;
      const taken = hasOwner ? "taken" : "open";
      let color = "none";
      let onClick = _.noop;
      if (hasOwner) {
        color = PLAYER_COLORS[square.ownerId];
      } else if (clickable) {
        color = PLAYER_COLORS[round.currentPlayerId];
        onClick = takeSquare.bind(null, x, y);
      }
      let highlighted = _.isEqual(square.coordinates, round.lastSquarePlayed);
      if ((round.winningLine || []).some(aCoordinate => {
          return _.isEqual(aCoordinate, square.coordinates);
        })) {
        highlighted = true;
      }
      let highlight = null;
      if (highlighted) {
        highlight = <circle cx="35px" cy="38px" r="5px" stroke={
          color
        } strokeWidth="10px" fill="none" />;
      }
      const svg = <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle cx="35px" cy="38px" r="23px" stroke={
          color
        } strokeWidth="15px" fill="none" />
        {highlight}
      </svg>;
      tr.push(<td key={x} className={taken} onClick={onClick}>{svg}</td>);
    }
    boardRows.push(<tr key={y}>{tr}</tr>);
  }
  return <table className="board"><tbody>{boardRows}</tbody></table>;
}
function mapStateToProps(state, ownProps) {
  return {clickable: ownProps.clickable, round: state.round, board: state.board};
}
// for some reason prettier is killing the trailing semicolon here
export default connect(mapStateToProps)(render) // eslint-disable-line semi
