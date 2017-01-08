# Toes- Tic Tac Toe for Geniuses

Toes is a generalized version of the game tic tac toe.

You can play it at [toes.bansil.org](http://toes.bansil.org).

TODO: insert screenshot here

## Rules

Gameplay is as follows:

 1. The game begins by an arbitrary number of 2 or more humans and computers registering their names.

 2. The first player selects a `board size` and `win length` that has not yet been selected. The minimum win length is 3. and the minimum board size is 3x3.

 3. Starting with the first player, each player takes turns grabbing open squares on a `board size` rectangular grid until one player makes a horizontal,vertical, or diagonal string of consecutive pieces of their color that is `win length` long.

 4. The winner recieves one point and this round of the game ends. If all the squares get filled before anyone wins the round is declared a stalemate and every player recieves one point.

 5. Once the round is over the second player selects a `board size` and `win length` as per step 2. Another round of play commences as per `Step 3` except this the second player begins the round.

 6. Rounds continue to commence with each successive player taking their turn until a player earns 10 points at which point that player is declared the winner of the game.

## Project Structure

This project is a fairly standard [React](https://facebook.github.io/react/)/[Redux](http://redux.js.org) app.

The source code is organized as follows:

 - src/game.js encapsulates the rules above into a pure API. It is created by app.js.
 - src/setup.js is loaded by app.js and displays the game configuration screen. It's only dependency is game.js. It is loaded by app.js.
 - src/round.js displays the game play screen. It's only dependency is game.js. It is loaded by app.js. 
 - src/app.js combines all the js files except index.js into a single cohesive app. It is loaded by index.js.
 - src/index.js is the main js entry point. It sets up Redux. It is loaded by index.html.
 - public/index.html is the main html entry point and is mostly boilerplate and metadata. It loads app.js.

```
                  +-------------+
                  |             |
       +--------->+  game.js    +<---------+
       |          |             |          |
       |          +------+------+          |
       |                 ^                 |
       |                 |                 |
+------+------+   +------+------+   +------+------+
|             |   |             |   |             |
|  setup.js   +<--+  app.js     +-->+  round.js   |
|             |   |             |   |             |
+-------------+   +------+------+   +-------------+
                         ^
                         |
                  +------+------+
                  |             |
                  |  index.js   |
                  |             |
                  +------+------+
                         ^
                         |
                  +------+------+
                  |             |
                  |  index.html |
                  |             |
                  +-------------+
```

## Tooling

This project is designed to be edited with [Visual Studio Code](https://code.visualstudio.com/).

It uses the following extensions:

 - [Wallaby](http://dm.gl/2015/11/26/wallaby-for-visual-studio-code/) test runner.
 - [vscode-flow-ide](https://marketplace.visualstudio.com/items?itemName=gcazaciuc.vscode-flow-ide) Flow type checker integration. Don't use vscode-flow.
 - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) linter.

## Build

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the guide for the version of create-react-app used to create this project [here](https://github.com/facebookincubator/create-react-app/blob/4d7b7544e74db1aaca22e847b233ed1f3b95b72b/packages/react-scripts/template/README.md).

To deploy the project run `node run deploy`. You will be prompted to setup s3 credentials the first time.

## TODO

 - Setup Snapshot testing https://github.com/wallabyjs/public/issues/870.
 - setup react storybook with snapshot testing: https://github.com/storybooks/storyshots.
 - Create mobile versions via cordova.

 - Allow head to head play via firebase.

 - Intelligently pair people based on ELO rankings.

 - Add a simple user feedback system ala VS Code