var Player = function(init_x, init_y, score, lives, win, sprite){
    Character.call(this, init_x, init_y);
    this.score = score;
    this.lives = lives;
    this.win = win;
    this.sprite = sprite;
    this.current_x = init_x;
    this.current_y = init_y;
};

// update all properties of this object
Player.prototype.update = function(direction, offset) {
    switch (direction){
        case 'left':
            this.current_x -= offset;
            break;
        case 'right':
            this.current_x += offset;
            break;
        case 'up':
            this.current_y -= offset;
            break;
        case 'down':
            this.current_y += offset;
            break;
        default:
            break;
    }
    this.checkDead();
    this.checkOneRoundWin();
    this.checkWin();
    this.checkCollisions();
};

// draw the player on the screen, required method for game
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.current_x, this.current_y);
    ctx.font = '29px Impact';
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    var lives = this.lives < 0 ? 0 : this.lives;
    var score = this.score >= 3 ? 3 : this.score;
    var text = "score: " + score + "<=3, " + "lives: " + lives;
    ctx.fillStyle = 'red';
    ctx.fillText(text, 505 / 2, 606 - 30);
    ctx.strokeStyle = 'black';
    ctx.strokeText(text, 505 / 2, 606 - 30);
    if (this.win !== 0){
        var remark = this.win === 1 ? "😁You win!😁" : "😂You lose!😂";
        alert("Total score=" + score + "! " + remark);
        this.reset();
    }
};

// handle direction and movement
Player.prototype.handleInput = function (direction) {
    if (direction === 'left' && this.current_x - 101 >= 0)
        this.update('left', 101);
    else if (direction === 'right' && this.current_x + 101 < 405)
        this.update('right', 101);
    else if (direction === 'up' && (this.current_y - 82.5 > 0 || this.current_y - 60.5 >= 0))
        this.update('up', 82.5);
    else if (direction === 'down' && this.current_y + 82.5 < 412.5)
        this.update('down', 82.5);
};

// initialise properties of player
Player.prototype.reset = function () {
    this.resetPos();
    this.score = 0;
    this.lives = maxLives;
    this.win = 0;
};

// initialise position of player
Player.prototype.resetPos = function (){
    this.current_x = this.init_x;
    this.current_y = this.init_y;
};

// check 'one-round win'
Player.prototype.checkOneRoundWin = function () {
    // check one-round win
    if (this.current_y <= -23) {
        this.resetPos();
        this.score += 1;
    }
    this.optimise.call(this, 'current_y', -22, 0.1);  // make the disappearance from sea smooth
};

// check 'finally win'
Player.prototype.checkWin = function () {
    if (this.score >= maxScore) {
        this.win = 1;
    }
};

// check 'finally die'
Player.prototype.checkDead = function () {
    if (this.lives < 0){
        this.win = 2;
    }
};

// check collision
Player.prototype.checkCollisions = function(){
    allEnemies.forEach(function (enemy) {
        if (Math.abs(enemy.current_y - this.current_y) < 10 && Math.abs(enemy.current_x - this.current_x) < 75){
            this.lives -= 1;
            this.resetPos();
        }
    }.bind(this));
};

// optimise the display of arrival at the water
Player.prototype.optimise = function (property, cond, offset){
    if (this[property] <= cond) {
        this[property] -= offset;
    }
};
