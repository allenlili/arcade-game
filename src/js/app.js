'use strict';
// for player's moving coordinate: gap between each square block y, (x: 101, y: 82.5)
var maxSpeed = 5;
var maxScore = 3;
var maxLives = 3;
var defaultCharForEnemy = 'images/enemy-bug.png';
var defaultCharForPlayer = 'images/char-boy.png';

// enemies player must avoid
var allEnemies = [];
for (var i = 1; i <= 3; i++) {
    var enemy = new Enemy(
        0,                                          // x
        60.5 + 82.5 * (i - 1),              // y
        Math.floor(1 + Math.random() * maxSpeed),   // speed
        defaultCharForEnemy);                               // character
    allEnemies.push(enemy);
}

// create player instance
var player = new Player(
    101 * 2,                // init x
    60.5 + 4 * 82.5,        // init y
    0,                      // score
    maxLives,               // lives
    0,                      // win flag
    defaultCharForPlayer    // char image for player
);
