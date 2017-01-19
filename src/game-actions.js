import Action, * as Types from "./game-types";
export function newAddPlayerAction(): Action {
  return {type: "ADD_PLAYER"};
}
export function newRemovePlayerAction(id: number): Action {
  return {type: "REMOVE_PLAYER", id};
}
export function newSetPlayerNameAction(id: number, name: string): Action {
  return {type: "SET_PLAYER_NAME", id, name};
}
export function newSetPlayerUserAction(id: number, user: Types.PlayerUser): Action {
  return {type: "SET_PLAYER_USER", id, user};
}
export function newSetBoardSizeAction(dimensions: Types.Coordinates): Action {
  return {type: "SET_BOARD_SIZE", dimensions};
}
export function newSetWinLengthAction(length: number): Action {
  return {type: "SET_WIN_LENGTH", length};
}
export function newStartGameAction(): Action {
  return {type: "START_GAME"};
}
export function newStartRoundAction(): Action {
  return {type: "START_ROUND"};
}
export function newTakeSquareAction(coordinates: Types.Coordinates): Action {
  return {type: "TAKE_SQUARE", coordinates};
}
export function newEndRoundAction(): Action {
  return {type: "END_ROUND"};
}
export function newEndGameAction(): Action {
  return {type: "END_GAME"};
}
export function newErrorAction(error): Action {
  return {type: "ERROR", error};
}
