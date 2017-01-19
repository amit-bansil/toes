// @flow
import _ from "lodash";
import * as Types from "./game-types";
import * as Constants from "./constants";

// -----------------------------------------------------------------------------
// constructors
export function createPlayer() {
  return {name: "", wins: 0, user: Constants.DEFAULT_PLAYER_USER};
}

export function createBoard(dimensions: number[], winLength: number) {
  const dimensionRanges = dimensions.map(aDimension => {
    return _.range(aDimension);
  });
  const squares = _.fromPairs(
    setProduct(dimensionRanges).map(coordinates => {
      return [coordinates, {coordinates, highligted: false}];
    }),
  );
  return {dimensions, squares, winLength};
}

// -----------------------------------------------------------------------------
// game mechanics
// find first line (if any) along which playerId is winnner on board and return it
export function findWinningLine(
  board: Types.Board,
  playerId: number,
): ?(Types.Coordinates[]) {
  // OPTIMIZE cache computeLines
  for (const line: Types.Coordinates[] of computeLines(board)) {
    if (isWinningLine(board, playerId, line)) {
      return line;
    }
  }
  return null;
}
// return all lines of square coordinates on the board of length of board.winLength
export function computeLines(board: Types.Board): Types.Coordinates[] {
  const deltas = setProduct(repeat(_.range(-1, 2), board.dimensions.length));

  // ignore lines that are either backward (all deltas negative/0)
  // or points (all deltas zero) by only including those
  // deltas that are positive in atleast 1 direction
  function isPositive(value) {
    return value > 0;
  }
  const increasingDeltas = deltas.filter(aDelta => {
    return aDelta.some(isPositive);
  });
  const squareDeltas = setProduct([_.values(board.squares), increasingDeltas]);
  function computeALine(
    square: Types.Square,
    lineDelta: Types.Coordinates,
  ): Types.Coordinates[] {
    function walk(step) {
      return _.range(square.coordinates.length).map(axis => {
        return square.coordinates[axis] + step * lineDelta[axis];
      });
    }

    return _.range(board.winLength).map(walk);
  }
  const lines = squareDeltas.map(squareDelta => {
    const square = squareDelta[0];
    const delta = squareDelta[1];
    return computeALine(square, delta, board.winLength);
  });
  function isInBounds(coord) {
    return _.range(coord.length).every(axis => {
      return 0 <= coord[axis] && coord[axis] < board.dimensions[axis];
    });
  }
  return lines.filter(line => {
    return line.every(isInBounds);
  });
}
export function isWinningLine(
  board: Types.Board,
  playerId: number,
  line: Types.Coordinates[],
) {
  return line.every(coords => {
    return board.squares[coords].ownerId === playerId;
  });
}
export function checkHasOpenSquare(board: Types.Board): boolean {
  return _.values(board.squares).some(square => {
    return !square.ownerId && square.ownerId !== 0;
  });
}
// -----------------------------------------------------------------------------
// Utilities
// see wikipedia:cartesian product
export function setProduct(sets: any): any {
  function product2(memos, set) {
    const ret = memos.map(memo => {
      return set.map(element => {
        return memo.concat([element]);
      });
    });
    return _.flatten(ret, true);
  }
  return sets.reduce(product2, [[]]);
}

export function repeat<T>(element: T, times: number): T[] {
  return _.times(times, () => {
    return element;
  });
}

export function pairToObject(key: any, value: any): any {
  const ret = {};
  ret[key] = value;
  return ret;
}
