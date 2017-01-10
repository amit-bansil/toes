// @flow
export type PlayerType = 'Computer' | 'Human';
export type Player = {
  +colorHex: string,
  +name: string,
  +wins: number,
  +type: PlayerType,
}

export type Square = {
  +owner?: Player,
}

export type Board = {
  +squares: Array<Array<Square>>,
  +width: number,
  +height: number,
}

export type Game = {
  +players: Array<Player>,
  +board: Board,
  +lastSquarePlayed?: Square,
  +startingPlayer: Player,
}

export type Action =
  | {type: 'ADD_PLAYER'}
  | {type: 'REMOVE_PLAYER', id: number}
  | {type: 'SET_PLAYER_NAME', id: number, name: string}
  | {type: 'SET_PLAYER_TYPE', id: number, type: PlayerType}

  | {type: 'START_GAME'}
  | {type: 'TAKE_SQUARE', x: number, y:number}
  | {type: 'END_ROUND'}
  | {type: 'RESET_GAME'};
