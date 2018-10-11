var Enemy = function(init_x, init_y, speed, sprite) {
    // variables applied to each of our instances go here
    Character.call(this, init_x, init_y);
    this.current_x = this.init_x;
    this.current_y = this.init_y;
    this.speed = speed;
    // the image/sprite for enemies, this uses
    // a helper provided to easily load images
    this.sprite = sprite;
};

// update the enemy's position, required method for game
// parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.current_x + 101 > 605) {
        this.speed = Math.floor(1 + Math.random() * maxSpeed);
        this.current_x = 0;
    } else {
        this.current_x += 101 * dt * this.speed;
    }
};

// draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.current_x, this.current_y);
};