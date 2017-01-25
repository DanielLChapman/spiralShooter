var Power = function(x, y, type) {
    this.X = x;
    this.Y = y;
    this.radius = 20;
    this.exist = 400;
    this.color = "rgb(150,150,150)";
    this.id = type;
    this.effect = "";
    switch (type) {
        case 1:
            this.color = "rgb(250,150,250)";
            this.effect = "Double Shot";
            break;
        case 3:
            this.color = "rgb(50,250,250)";
            this.effect = "Damage Up";
            break;
        case 10:
            this.color = "rgb(50,100,250)";
            this.effect = "Mass Casualties";
            break;
        default: 
            break;
    }
}
var powerUp = function(tObject) {
    var nObject = new Object(1);
    nObject = tObject;
    var type = Math.floor(rand(0,30/nObject.level));
    if (type == 1 || type == 3 || type == 10) {
        powerUps.push(new Power(nObject.X, nObject.Y, type));
    }
    //alert(nObject.angle);
}