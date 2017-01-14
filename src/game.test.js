// @flow
import * as Game from "./game";
import _ from "lodash";
import * as Action from "./game-actions";
import * as Reducers from "./game-reducers";
import * as Types from "./game-types";
import * as Constants from "./constants";

it("can configure a game", () => {
  const configuredGame = reduceAll(null, [
    Action.newAddPlayerAction(),
    Action.newAddPlayerAction(),
    Action.newRemovePlayerAction(1),
    Action.newSetPlayerNameAction(1, "aba"),
    Action.newSetPlayerUserAction(1, "Computer"),
    Action.newRemovePlayerAction(2),
  ]);
  if (configuredGame) {
    const player1 = {name: "", wins: 0, user: "Human"};
    const player2 = {name: "aba", wins: 0, user: "Computer"};
    expect(configuredGame.players).toEqual([player1, player2]);
  } else {
    throw new Error("finished game falsey");
  }
});
it("can play a simple game", () => {
  let game = reduceAll(null, [Action.newStartGameAction()]);
  function playRound(gameIndex) {
    console.log("");
    const boardWidth = 4 + gameIndex;
    game = reduceAll(game, [
      Action.newSetBoardSizeAction([3, boardWidth]),
      Action.newSetWinLengthAction(4),
      Action.newStartRoundAction(),
      // since game starts with player 2 iff it is an odd numbered game
      // we have that player make a junk move if they are starting
      // otherwise play starts on the line below with player 1
      gameIndex % 2 === 0 ? null : Action.newTakeSquareAction([2, 0]),
      Action.newTakeSquareAction([0, 0]),
      Action.newTakeSquareAction([1, 0]),
      Action.newTakeSquareAction([0, 1]),
      Action.newTakeSquareAction([1, 1]),
      Action.newTakeSquareAction([0, 2]),
      Action.newTakeSquareAction([1, 2]),
      Action.newTakeSquareAction([0, 3]),
    ]);

    expect(game.board.dimensions).toEqual([3, boardWidth]);
    expect(game.board.winLength).toEqual(4);
    expect(_.keys(game.board.squares).length).toEqual(3 * boardWidth);

    expect(game.round.lastSquarePlayed).toEqual([0, 3]);
    expect(game.round.currentPlayerId).toBe(0);
    expect(game.round.winningLine).toEqual([[0, 0], [0, 1], [0, 2], [0, 3]]);
    if (game.mode === "ROUND_OVER") {
      game = reduceAll(game, [Action.newEndRoundAction()]);
      expect(game.mode).toBe("SETUP_BOARD");
    }
  }
  for (let gameIndex = 0; gameIndex < Constants.WINNING_SCORE; gameIndex += 1) {
    playRound(gameIndex);
  }
  expect(game.mode).toBe("GAME_OVER");
  game = reduceAll(game, [Action.newEndGameAction()]);
  expect(game).toEqual(reduceAll(null, [null]));
});

it("can compute a set product", () => {
  expect(
    Game.setProduct([[1, 2], ["a", "b"]]),
  ).toEqual([[1, "a"], [1, "b"], [2, "a"], [2, "b"]]);
});

it("can repeat a number", () => {
  expect(Game.repeat(1, 4)).toEqual([1, 1, 1, 1]);
});

it("can construct a pair", () => {
  expect(Game.pairToObject(1, 2)).toEqual({"1": 2});
});

// -----------------------------------------------------------------------------
// Utilities
function reduceAll(startState, actions): Types.Game {
  let ret = startState;
  for (const anAction of actions) {
    ret = reduceWithoutSideEffects(ret, anAction);
  }
  return ret;
}

function reduceWithoutSideEffects(state, action) {
  const startState = prettyPrint(state);
  const ret = Reducers.gameReducer(state, action);
  const startStateAfterReduce = prettyPrint(state);
  expect(startState).toBe(startStateAfterReduce);
  return ret;
}

function prettyPrint(obj) {
  return JSON.stringify(obj, null, "    ");
}
