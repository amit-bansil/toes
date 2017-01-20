# Toes- Tic Tac Toe for Geniuses

Toes is a generalized version of the game tic tac toe.

You can play it at [toes.bansil.org](http://toes.bansil.org).

## Rules

Gameplay is as follows:

 1. The game begins by an arbitrary number of 2 or more humans and computers registering their names.

 2. The first player selects a `board size` and `win length` that has not yet been selected. The minimum win length is 4. and the minimum board size is 4x4.

 3. Starting with the first player, each player takes turns grabbing open squares on a `board size` rectangular grid until one player makes a horizontal,vertical, or diagonal string of consecutive pieces of their color that is `win length` long.

 4. The winner recieves one point and this round of the game ends. If all the squares get filled before anyone wins the round is declared a stalemate and nobody receives any points.

 5. Once the round is over the second player selects a `board size` and `win length` as per step 2. Another round of play commences as per `Step 3` except this the second player begins the round.

 6. Rounds continue to commence with each successive player taking their turn until a player earns 5 points at which point that player is declared the winner of the game.

## Project Structure

This project is a fairly standard [React](https://facebook.github.io/react/)/[Redux](http://redux.js.org) app.

The source code is organized as follows:

 - src/game-types.js describes the state of the game.
 - src/game.js encapsulates the board mechanics into a pure API.
 - src/game-reducers.js mediates the effect of actions on the game state.
 - src/game-actions.js provides factory function for creating instances of the various actions.

 - src/player.js, src/board.js, src/scores.js contain utility react components used by the components below.

 - src/setup-players.js, src/setup-board.js, src/round.js, src/over-round.js, over-game.js contain the react components that describe the screens corresponding to the respective game modes.

 - src/app.js routes between the various screen components.
 - src/index.js is the main js entry point. It sets up Redux and app.js. It is loaded by index.html.
 - public/index.html is the main html entry point and is mostly boilerplate and metadata. It loads index.js.

## Tooling

This project is designed to be edited with [Visual Studio Code](https://code.visualstudio.com/).

It uses the following extensions:
 - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) js formatter.
 - [Wallaby](http://dm.gl/2015/11/26/wallaby-for-visual-studio-code/) test runner.
 - [vscode-flow-ide](https://marketplace.visualstudio.com/items?itemName=gcazaciuc.vscode-flow-ide) Flow type checker integration. Don't use vscode-flow.
 - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) linter.

## Build

To build this project you need to use [Node 6](https://nodejs.org).

Here is how to perform basic project tasks:

```sh
npm run start   # Run this project locally.
npm run lint    # Check source code for common errors.
npm run flow    # Check project for type errors.
npm test
npm run build   # Create production distribution of project in build/.
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the guide for the version of create-react-app used to create this project [here](https://github.com/facebookincubator/create-react-app/blob/4d7b7544e74db1aaca22e847b233ed1f3b95b72b/packages/react-scripts/template/README.md).

## TODO

 - Setup Snapshot testing https://github.com/wallabyjs/public/issues/870.
 - Setup react storybook with snapshot testing: https://github.com/storybooks/storyshots.
 - Create mobile versions via cordova.
 - Allow head to head play via firebase.
 - Intelligently pair people based on ELO rankings.
 - Add a simple user feedback system ala VS Code
 - Implement a computer AI
 - Deal with corner case where users run out of baords