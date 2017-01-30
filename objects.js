var Object = function(level) {
    this.X = 0;
    this.Y = 0;
    var tempX = 0 - this.X;
    var tempY = 0 - this.Y;
    this.V = .01;
    this.centerX = cw/2;
    this.centerY = ch/2;
    this.radius2 = rand(300, 900);
    this.angle = rand(0, 100);
    this.radius = 15;
    this.color = "rgb(216, 159, 211)";
    this.innerColor = "rgb(255,127,80)";
    this.innerRadius = 15;
    this.level = level;
    this.health = 50;
    this.reward = 25;
    this.canBeBombed = true;
    if (level == 2) {
        this.color = "rgb(255, 122, 200)";
        this.health = 550;
        this.reward = 50;
        this.radius = 20;
        this.V = .02;
    }
    else if (level == 3) {
        this.color = "rgb(0, 250, 250)";
        this.health = 1500;
        this.reward = 100;
        this.radius = 25;
    }
    else if (level == 4) {
        this.color = "rgb(200, 150, 50)";
        this.health = 60;
        this.reward = 200;
        this.radius = 30;
        this.V = .06
        this.canBeBombed = false;
    }
    else if (level == 5) {
        this.color = "rgb(100, 50, 20)";
        this.health = 2500;
        this.reward = 250;
        this.radius = 35;
        this.V = .02;
        this.canBeBombed = false;
    }
}
var Shot = function(x, y, powerUp) {
    this.posX = cw/2;
    this.posY = ch/2;
    this.X = x;
    this.Y = y;
    this.hypotenuse = Math.sqrt((cw/2-this.X)*(cw/2-this.X) + (ch/2-this.Y)*(ch/2-this.Y));
    var angle = Math.acos((this.hypotenuse*this.hypotenuse+(cw/2-this.X)*(cw/2-this.X)-(ch/2-this.Y)*(ch/2-this.Y))/(2*this.hypotenuse*(this.X-cw/2)));
    this.vX = Math.cos(angle)*15;//(this.X-300);
    this.vY = Math.sin(angle)*15;//(this.Y-300);
    if (this.Y < ch/2) {
        this.vY = Math.abs(this.vY) * -1;
    }
    this.damage = 50*damageIncrease;
}
Object.prototype = {
    update: function(i) {
        //Get position relative to center.
        this.X = this.centerX + Math.cos(this.angle) * this.radius2;
        this.Y = this.centerY + Math.sin(this.angle) * this.radius2;
        
        this.angle += this.V;
        this.radius2 -= 1;
        if (this.radius2 < 0) {
            this.radius2 = 0;
        }
        
    }
}
Shot.prototype = {
    update: function(i) {
        this.posX += this.vX;
        this.posY += this.vY;
    }
}