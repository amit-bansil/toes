import React from "react";
import {connect} from "react-redux";

function RenderTurnIndicator({player}) {
  return <h3 className="turnIndicator">It is{possesivate(player.name)}turn.</h3>;
}
function RenderWinnerTitle({player}) {
  // need weird {" "} b/c prettier is stripping spaces from jsx
  return <span className="winnerTitle">{player.name}{" "}Wins!</span>;
}
function mapStateToProps(state, ownProps) {
  return {player: state.players[ownProps.playerId]};
}
export const TurnIndicator = connect(mapStateToProps)(RenderTurnIndicator);
export const WinnerTitle = connect(mapStateToProps)(RenderWinnerTitle);

// need spaces around return value because prettier is stripping them from html
function possesivate(word) {
  if (word[word.length - 1] === "s") {
    return ` ${word}' `;
  } else {
    return ` ${word}'s `;
  }
}
