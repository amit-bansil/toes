// @flow
import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import "./setup-board.css";
import * as Action from "./game-actions";
import {TurnIndicator} from "./player";
import * as Constants from "./constants";
import * as Types from "./game-types";

type args = {
  playedBoards: Types.Board[],
  activePlayerId: number,
  board: Types.Board,
  dispatch: Types.DispatchFn,
  error: string,
};
export function SetupBoard({playedBoards, activePlayerId, board, dispatch, error}: args) {
  function startRound() {
    function boardMatches(aBoard) {
      return _.isEqual(aBoard.dimensions, board.dimensions);
    }
    if (playedBoards.some(boardMatches)) {
      dispatch(Action.newErrorAction("Board Already Played"));
    } else {
      dispatch(Action.newErrorAction(""));
      dispatch(Action.newStartRoundAction());
    }
  }

  function changeWinLength(value) {
    dispatch(Action.newSetWinLengthAction(value));
  }
  function changeBoardWidth(value) {
    dispatch(Action.newSetBoardSizeAction([value, board.dimensions[1]]));
  }
  function changeBoardHeight(value) {
    dispatch(Action.newSetBoardSizeAction([board.dimensions[0], value]));
  }

  const controlsRow = <tr>
    <td><RangeSelect min={Constants.MIN_BOARD_SIZE} max={Constants.MAX_BOARD_SIZE} value={
      board.dimensions[0]
    } onChange={changeBoardWidth} /></td>
    <td>×</td>
    <td><RangeSelect min={Constants.MIN_BOARD_SIZE} max={Constants.MAX_BOARD_SIZE} value={
      board.dimensions[1]
    } onChange={changeBoardHeight} /></td>
    <td><RangeSelect min={Constants.MIN_WIN_LENGTH} max={Constants.MAX_WIN_LENGTH} value={
      board.winLength
    } onChange={changeWinLength} /></td>
  </tr>;

  const playedBoardsRows = playedBoards.map((aBoard, index) => {
    return (
      <tr key={index}>
        <td>{aBoard.dimensions[0]}</td>
        <td>×</td>
        <td>{aBoard.dimensions[1]}</td>
        <td>{aBoard.winLength}</td>
      </tr>
    );
  });
  let playedBoardsHeader = null;
  if (playedBoards.length > 0) {
    playedBoardsHeader = <tr>
      <td colSpan="4">Already Played Boards</td>
    </tr>;
  }
  return (
    <div className="setupBoard">
      <h2>Choose a Board</h2>
      <a className="startRound" onClick={startRound}>Start Round</a>
      <TurnIndicator playerId={activePlayerId} />
      <table>
        <thead>
          <tr>
            <td>Width</td>
            <td>×</td>
            <td>Height</td>
            <td>Win Length</td>
          </tr>
        </thead>
        <tbody>
          {controlsRow}
          {playedBoardsHeader}
          {playedBoardsRows}
        </tbody>
      </table>
      {error ? <div className="error">{error}</div> : null}
    </div>
  );
}
function RangeSelect({min, max, value, onChange}) {
  function onChangeText(evt) {
    onChange(Number(evt.target.value));
  }
  return (
    <select value={value} onChange={onChangeText}>
      {_.range(min, max + 1).map(aValue => {
          return <option key={aValue} value={aValue}>{aValue}</option>;
        })}
    </select>
  );
}
function mapStateToProps(state) {
  const activePlayerId = state.alreadyPlayedBoards.length % state.players.length;
  return {
    playedBoards: state.alreadyPlayedBoards,
    board: state.board,
    activePlayerId,
    error: state.error,
  };
}
// for some reason prettier is killing the trailing semicolon here
export default connect(mapStateToProps)(SetupBoard) // eslint-disable-line semi
