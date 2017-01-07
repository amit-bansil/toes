# T4 implemented in React

T4 is a generalized version of the game tic tac toe.

You can play it at [t4.bansil.org](http://t4.bansil.org).

TODO: insert screenshot here

## Rules

Gameplay is as follows:

 1. The game begins by an arbitrary number of 2 or more humans and computers registering their names.

 2. The first player selects a `board size` and `win length` that has not yet been selected. The minimum win length is 3. and the minimum board size is 3x3.

 3. Starting with the first player, each player takes turns grabbing open squares on a `board size` rectangular grid until one player makes a horizontal,vertical, or diagonal string of consecutive pieces of their color that is `win length` long.

 4. The winner recieves one point and this round of the game ends. If all the squares get filled before anyone wins the round is declared a stalemate and every player recieves one point.

 5. Once the round is over the second player selects a `board size` and `win length` as per step 2. Another round of play commences as per `Step 3` except this the second player begins the round.

 6. Rounds continue to commence with each successive player taking their turn until a player earns 10 points at which point that player is declared the winner of the game.

## Build

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the guide for the version of create-react-app used to create this project [here](https://github.com/facebookincubator/create-react-app/blob/4d7b7544e74db1aaca22e847b233ed1f3b95b72b/packages/react-scripts/template/README.md).
