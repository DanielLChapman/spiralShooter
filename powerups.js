var massCasualties = function() {
    bombs += 1;
}
var pierceFunc = function() {
    if (pierce) {
        for (var s = 0; s < 10; s++) {
            shots.push(new Shot(200+rand(-20*100,33*100), 200+rand(-20*100,33*100), ""));
        }
    }
    else { 
        pierce = true;
    }
}
var doubleShot = function() {
    numAddShots+=1;
    if (numAddShots > (5+Math.floor(score/20000))) {
        numAddShots = (5+Math.floor(score/20000));
    }
    if (numAddShots > 15) {
        numAddShots = 15;
    }
}
var damageUp = function() {
    damageIncrease+=1;
    if (damageIncrease >= (5+Math.floor(score/20000))) {
        damageIncrease = 5;
        pierceFunc();
    }
}
var Power = function(x, y, type) {
    this.hit = false;
    this.X = x;
    this.Y = y;
    this.charI = "";
    this.radius = 20;
    this.exist = 400;
    this.color = "rgb(150,150,150)";
    this.id = type;
    this.effect = "";
    switch (type) {
        case 1:
            this.color = "rgb(250,150,250)";
            this.effect = "Double Shot";
            this.charI = "M"
            break;
        case 3:
            this.color = "rgb(50,250,250)";
            this.effect = "Damage Up";
            this.charI = "D"
            break;
        case 12:
            this.color = "rgb(50,250,250)";
            this.effect = "Damage Up";
            this.charI = "D"
            break;
        case 5: 
            this.color = "rgb(200,250,250)"
            this.effect = "Pierce";
            this.charI = "P";
            break;
        case 10:
            this.color = "rgb(50,100,250)";
            this.effect = "Mass Casualties";
            this.charI = "B";
            break;
        default: 
            break;
    }
}
var runPowerUp = function(caseSw) {
    switch (caseSw) {
        case "Double Shot":
            doubleShot();
            break;
        case "Damage Up":
            damageUp();
            break;
        case "Pierce":
            pierceFunc();
            break;
        case "Mass Casualties":
            massCasualties();
            break;
    }
}

var powerUp = function(tObject) {
    var nObject = new Object(1);
    nObject = tObject;
    var maxRandom = 40;
    if (score > 250000) {
        //testing to see if i can make it less OP.
        maxRandom = 500;
    }
    var type = Math.floor(rand(0,maxRandom/nObject.level));
    if (nObject.level == 3) {
        var temp = rand(0,4);
        if (temp == 3) {
            type = 10;
        }
    }
    if (nObject.level == 5) {
        type = 2;
    }
    if (type == 1 || type == 3 || type == 10 || type == 5 || type == 12) {
        powerUps.push(new Power(nObject.X, nObject.Y, type));
    }
    //alert(nObject.angle);
}