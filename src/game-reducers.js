import * as Constants from "./constants";
import * as Types from "./game-types";
import * as Game from "./game";
import _ from "lodash";

export function gameReducer(state: ?Types.Game, action: ?Types.Action): Types.Game {
  if (!state) {
    state = {
      players: [Game.createPlayer(), Game.createPlayer()],
      alreadyPlayedBoards: [],
      mode: "SETUP_PLAYERS",
      round: null,
      board: null,
    };
  }
  if (!action) {
    return state;
  }
  state = {...state, players: playerReducer(state, action)};
  switch (action.type) {
    case "START_GAME":
      if (state.mode !== "SETUP_PLAYERS") {
        throw new Error(`can't start game from mode ${state.mode}`);
      }
      if (state.players.length < 2) {
        throw new Error("must have at least 2 players");
      }
      return {
        ...state,
        board: Game.createBoard(
          Constants.INITIAL_DIMENSIONS,
          Constants.INITIAL_WIN_LENGTH,
        ),
        mode: "SETUP_BOARD",
      };
    case "SET_BOARD_SIZE":
      if (state.round || state.mode !== "SETUP_BOARD") {
        throw new Error("can only resize board from SETUP_BOARD");
      }
      return {
        ...state,
        board: Game.createBoard(action.dimensions, state.board.winLength),
      };
    case "SET_WIN_LENGTH":
      if (state.round || state.mode !== "SETUP_BOARD") {
        throw new Error("can only change win length from SETUP_BOARD");
      }
      const winLength = action.length;
      return {...state, board: Game.createBoard(state.board.dimensions, winLength)};
    case "START_ROUND":
      if (state.round || state.mode !== "SETUP_BOARD") {
        throw new Error("can only start round from SETUP_BOARD");
      }
      for (const board of state.alreadyPlayedBoards) {
        if (_.isEqual(board.dimensions, state.board.dimensions)) {
          throw new Error(`board size ${board.dimensions} already played`);
        }
      }
      // starting players rotates around
      const startingPlayerId = state.alreadyPlayedBoards.length % state.players.length;
      return {
        ...state,
        mode: "PLAY_ROUND",
        round: {startingPlayerId, currentPlayerId: startingPlayerId, hasOpenSquare: true},
      };
    case "TAKE_SQUARE":
      if (!state.round || state.mode !== "PLAY_ROUND") {
        throw new Error("can't take square when not in a round");
      }
      const targetSquare = state.board.squares[action.coordinates];
      if (!targetSquare) {
        throw new Error(
          `square not found for coorinates: ${JSON.stringify(action.coordinates)}`,
        );
      }
      if (targetSquare.owner) {
        throw new Error(
          `coordinates is already taken: ${JSON.stringify(targetSquare.owner)}`,
        );
      }
      if (state.round.winningLine) {
        throw new Error("can't move, current round has already been won.");
      }
      const currentPlayerId = state.round.currentPlayerId;
      const currentPlayer = state.players[currentPlayerId];
      const lastSquarePlayed = {owner: currentPlayer, coordinates: action.coordinates};
      const squares = Object.assign(
        {},
        state.board.squares,
        Game.pairToObject(action.coordinates, lastSquarePlayed),
      );
      const board = {...state.board, squares};
      const nextPlayerIndex = (currentPlayerId + 1) % state.players.length;
      const winningLine = Game.findWinningLine(board, currentPlayer);
      if (winningLine) {
        const wins = currentPlayer.wins + 1;
        const currentPlayerWithWins = {...currentPlayer, wins};
        const players = [...state.players];
        players[currentPlayerId] = currentPlayerWithWins;
        return {
          ...state,
          mode: wins === Constants.WINNING_SCORE ? "GAME_OVER" : "ROUND_OVER",
          players,
          board,
          round: {...state.round, lastSquarePlayed: action.coordinates, winningLine},
        };
      } else {
        const hasOpenSquare = Game.checkHasOpenSquare(board);
        return {
          ...state,
          board: {...state.board, squares},
          round: {
            ...state.round,
            currentPlayerId: nextPlayerIndex,
            lastSquarePlayed: action.coordinates,
            hasOpenSquare,
          },
        };
      }
    case "END_ROUND":
      if (state.mode !== "ROUND_OVER") {
        throw new Error(`can't end round while in mode ${state.mode}`);
      }
      if (state.hasOpenSquare && !state.round.winningLine) {
        throw new Error("can't end a round while it is still in play");
      }
      return {
        ...state,
        mode: "SETUP_BOARD",
        round: null,
        alreadyPlayedBoards: [...state.alreadyPlayedBoards, state.board],
        board: Game.createBoard(state.board.dimensions, state.board.winLength),
      };
    case "END_GAME":
      // game can be ended at any point
      const players = state.players.map(aPlayer => {
        return {...aPlayer, wins: 0};
      });
      return {
        ...state,
        players,
        mode: "SETUP_PLAYERS",
        round: null,
        alreadyPlayedBoards: [],
        board: null,
      };
    default:
      return state;
  }
}

function playerReducer(state: Game, action: Types.Action): Array<Types.Player> {
  // flow crap. note id is not defined for add.
  const id = (action: any).id;
  const players = state.players;
  switch (action.type) {
    case "REMOVE_PLAYER":
    case "SET_PLAYER_USER":
    case "SET_PLAYER":
      if (!id) {
        throw new Error(`player with id '${id}' not defined`);
      }
    // eslint-disable-line no-fallthrough
    case "ADD_PLAYER":
      if (state.round) {
        throw new Error("can't set/add/remove player while game is in play");
      }
      if (state.mode !== "SETUP_PLAYERS") {
        throw new Error(`can't change players in mode ${state.mode}`);
      }
  }

  switch (action.type) {
    case "ADD_PLAYER":
      return [...players, Game.createPlayer(players.length + 1)];
    case "REMOVE_PLAYER":
      return _.without(players, players[id]);
    case "SET_PLAYER_NAME":
      const retName = [...players];
      retName[id] = {...players[id], name: action.name};
      return retName;
    case "SET_PLAYER_USER":
      const retUser = [...players];
      retUser[id] = {...players[id], user: action.user};
      return retUser;
    default:
      return players;
  }
}
