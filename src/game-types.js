// Flow between GameModes as mediated by Actions
// SETUP_PLAYERS<-+
// v START_GAME   |
// SETUP_BOARD<-+ |
// v START_ROUND| |
// PLAY_ROUND<+ | |
// | TAKE_SQUARE| END_ROUND  
// +>ROUND_OVER-+ |
// |              | END_GAME
// +>GAME_OVER----+
export type GameMode = 
  | "SETUP_PLAYERS"
  | "SETUP_BOARD"
  | "PLAY_ROUND"
  | "ROUND_OVER"
  | "GAME_OVER";

// first coordinate is x, second is y 
export type Coordinates = [number, number];

export type PlayerUser = "Computer" | "Human";

export type Action = 
  | {type: "ADD_PLAYER"}
  | {type: "REMOVE_PLAYER", id: number}
  | {type: "SET_PLAYER_NAME", id: number, name: string}
  | {type: "SET_PLAYER_USER", id: number, user: PlayerUser}
  | {type: "SET_BOARD_SIZE", dimensions: Coordinates}
  | {type: "SET_WIN_LENGTH", length: number}
  | {type: "START_GAME"}
  | {type: "START_ROUND"}
  | {type: "TAKE_SQUARE", coordinates: Coordinates}
  | {type: "END_ROUND"}
  | {type: "END_GAME"}
  | {type: "ERROR", error: string};

// not game related but nice to have here
export type DispatchFn = (action: Action) => void;

export type Player = {+name: string, +wins: number, +user: PlayerUser};

export type Square = {+ownerId?: number, +coordinates: Coordinates};

export type Board = {
  +squares: {[coordinates: Coordinates]: Square},
  +dimensions: Coordinates,
  +winLength: number,
};

export type Round = {
  // we use ids here to prevent the data from getting out of sync due to all
  // the redux copying
  +startingPlayerId: number,
  +currentPlayerId: number,
  +lastSquarePlayed?: Coordinates,
  +winningLine?: Coordinates[],
  +hasOpenSquare: boolean,
};

export type Game = {
  +mode: GameMode,
  +players: Player[],
  +board?: Board,
  +round?: Round,
  +alreadyPlayedBoards: Board[],
};
