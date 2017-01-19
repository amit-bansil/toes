// @flow
import React from "react";
import {connect} from "react-redux";
import "./setup-players.css";
import {PLAYER_COLORS} from "./constants";
import * as Action from "./game-actions";
function render({players, error, dispatch}) {
  const playerDivs = players.map((aPlayer, index) => {
    return (
      <div key={index} className="playerLine">
        <span className="swatch" style={{color: PLAYER_COLORS[index]}}>•</span>
        <input className="name" type="text" value={aPlayer.name} onChange={evt => {
            dispatch(Action.newSetPlayerNameAction(index, evt.target.value));
          }} />
        <a className="remove" onClick={() => {
            dispatch(Action.newRemovePlayerAction(index));
          }}>×</a>
      </div>
    );
  });
  function startGame() {
    function hasName(aPlayer) {
      return aPlayer.name !== "";
    }
    if (players.length < 2) {
      dispatch(Action.newErrorAction("Must have at least 2 players"));
    } else if (players.length > 6) {
      dispatch(Action.newErrorAction("Can't have more than 6 players"));
    } else if (!players.every(hasName)) {
      dispatch(Action.newErrorAction("Every player must have a name"));
    } else {
      dispatch(Action.newErrorAction(""));
      dispatch(Action.newStartGameAction());
    }
  }
  return (
    <div className="setupPlayers">
      <h2>Setup Players</h2>
      <a className="startGame" onClick={startGame}>Start Game</a>
      <div className="players">{playerDivs}</div>
      <a className="addPlayer" onClick={() => {
          dispatch(Action.newAddPlayerAction());
        }}>Add Player</a>
      {error ? <div className="error">{error}</div> : null}
    </div>
  );
}
function mapStateToProps(state) {
  return {players: state.players, error: state.error};
}
// for some reason prettier is killing the trailing semicolon here
export default connect(mapStateToProps)(render) // eslint-disable-line semi
