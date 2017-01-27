var c = document.createElement('canvas');
var ctx = c.getContext('2d');
var cw = c.width = 600;
var ch = c.height = 600;
var pause = false, dead = false;
//ctx.translate(transX, transY);
var objects = [];
var shots = [];
var PI2 = Math.PI*2;
var score = 00;
var objectCount = 10;

//Power up effects
var powerUps = [];
var currentEffect = "";
var damageIncrease = 1;
var numAddShots = 0;
var pierce = false;
var emptyColor = "rgba(0,0,0,0.0)";
var magnetColor = "rgb(255,255,255)";

var rand = function(a, b) {
    return (Math.random())*b+a;
}
function getDeg(rad) {
  var deg = rad * 180/Math.PI;
  return deg;
}
var scoreBool = [false, false, false, false, false, false];

var resize = function() {
    cw = c.width = 600;//$(window).width();
    ch = c.height = 600;//$(window).height();
};

var render = function() {
    ctx.clearRect(0, 0, c.width, c.height);
    //ctx.translate(transX, transY);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText(score, 290, 500);
    ctx.beginPath();
    ctx.arc(cw/2, ch/2, 15, 0, PI2, false);
    ctx.fillStyle = magnetColor;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.fill();
    ctx.stroke();
    for (var i = 0; i < objects.length; i++) {
        ctx.beginPath();
        ctx.arc(objects[i].X, objects[i].Y, objects[i].radius, 0, PI2, false);
        ctx.fillStyle = emptyColor;
        ctx.fill();
        ctx.strokeStyle = objects[i].color;
        ctx.stroke();
        ctx.closePath();
        //inner circle
        
        if (objects[i].level >= 2) {
            ctx.beginPath();
            ctx.arc(objects[i].X, objects[i].Y, objects[i].innerRadius, 0, PI2, false);
            ctx.fillStyle = emptyColor;
            ctx.fill();
            ctx.strokeStyle = objects[i].innerColor;
            ctx.stroke();
            ctx.closePath();  
            
            ctx.beginPath();
            ctx.arc(objects[i].X, objects[i].Y, objects[i].innerRadius-1, 0, PI2, false);
            ctx.fillStyle = emptyColor;
            ctx.fill();
            ctx.strokeStyle = objects[i].innerColor;
            ctx.stroke();
            ctx.closePath();   
        }
    }
    for (var i = 0; i < shots.length; i++) {
        ctx.beginPath();
        ctx.moveTo(shots[i].posX, shots[i].posY);
        ctx.lineTo(shots[i].posX + shots[i].vX, shots[i].posY + shots[i].vY);
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.stroke();
        ctx.closePath();
    }
    for (var i = 0; i < powerUps.length; i++) {
        ctx.beginPath();
        ctx.arc(powerUps[i].X, powerUps[i].Y, powerUps[i].radius, 0, PI2, false);
        ctx.fillStyle = powerUps[i].color;
        ctx.fill();
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.stroke();
        ctx.closePath();
    }
}
$(document).keypress(function( event) {
    if (event.which == 98) {
        var temp = [];
                for (var i = 0; i < objects.length; i++) { 
                    if (objects[i].level >= 2) {
                        temp.push[objects[i]];
                    }
                    else {
                        score += objects[i].reward;
                    }
                }
                objects = [];
                objectCount = 0;
                for (var i = 0; i < temp.length; i++) {
                    objects.push(temp[i]);
                    objectCount+=1;
                }
                currentEffect = "";
    }   
    else if (event.which == 112) {
        pause = !pause;
    }
    else if (event.which == 115) {
        damageIncrease = 5;
        numAddShots = 5;
        pierce = true;
        magnetColor = "rgb(44,54,65)";
    }
});
$(document).click(function(e) {
    shots.push(new Shot(e.pageX, e.pageY, ""));
    for (var s = 0; s < numAddShots; s++) {
        shots.push(new Shot(e.pageX+rand(-20*numAddShots,33*numAddShots), e.pageY+rand(-20*numAddShots,33*numAddShots), ""));
    }
    if (currentEffect === "Double Shot") {
        numAddShots+=1;
        if (numAddShots > 5) {
            numAddShots = 5;
        }
        currentEffect = "";
    }
    else if (currentEffect === "Damage Up") {
        damageIncrease+=1;
        if (damageIncrease >= 5) {
            damageIncrease = 5;
            pierce = true;
        }
    }
    if (pause) {
        pause = !pause;
    }
    if (dead) {
        objectCount = 10;
        pause = false;
        score = 0;
        objects = [];
        powerUps = [];
        pierce = false;
        damageIncrease = 1;
        numAddShots = 1;
        currentEffect = "";
        for (var x = 0; x < objectCount; x++) {
            objects.push(new Object(1));
        }
    }
});
var compareShots = function(x2, y2, radius) {
    for (var x = 0; x < shots.length; x++) { 
        /*var dX = objects[i].X - shots[x].posX;
        var dY = objects[i].Y - shots[x].posY;
        var dist = Math.sqrt(dX*dX + dY * dY);
        */var dX2 = x2 - (shots[x].posX+shots[x].vX);
        var dY2 = y2 - (shots[x].posY+shots[x].vY);
        var dist2 = Math.sqrt(dX2*dX2 + dY2 * dY2);
        if (/*dist < objects[i].radius ||*/ dist2 < radius) {
            return [true, x];
            alert("here");
        }
   }
   return [false, 0];
}
$(document).ready(function() {
    $('body').append(c);
    for (var x = 0; x < objectCount; x++) {
        objects.push(new Object(1));
    }
    render();
    setInterval(function() {
        if (!pause) {
            for (var i = 0; i < objects.length; i++) { 
                objects[i].update();
                if (objects[i].radius2 <= 15) {
                    objects.splice(i, 1);
                    objectCount-=1;
                    pause = true;
                    dead = true;
                }
                var tempArr = compareShots(objects[i].X, objects[i].Y, objects[i].radius);
                if (tempArr[0]) {
                    objects[i].health -= shots[tempArr[1]].damage;
                    if (objects[i].health <= 0) {
                        score += objects[i].reward;
                        powerUp(objects[i]);
                        if (!pierce) {
                            shots.splice(tempArr[1], 1);
                        }
                        objects.splice(i, 1);
                        objectCount--;
                    }
                }
            }
            //Update shot movement
            for (var i = 0; i < shots.length; i++) { 
                shots[i].update();
                if (shots[i].posX <= -300 || shots[i].posX >= c.width+300) {
                    shots.splice(i, 1);
                }
                else if (shots[i].posY <= -300 || shots[i].posY >= c.height+300) {
                    shots.splice(i, 1);
                }
            }
            //update powerup exist timer 
             for (var i = 0; i < powerUps.length; i++) {
                powerUps[i].exist -= 1;
                if (powerUps[i].exist <= 0) {
                    powerUps.splice(i, 1);
                }
                try {
                    if (powerUps[i].exist < 390  && powerUps[i].hit == false) {
                    var tempArr = compareShots(powerUps[i].X, powerUps[i].Y, powerUps[i].radius);
                    if (tempArr[0]) {
                        powerUps[i].hit == true;
                        currentEffect = powerUps[i].effect;
                        if (!pierce) {
                            shots.splice(tempArr[1], 1);
                        }
                        powerUps.splice(i, 1);
                        }   
                    }
                } catch(err) {
                    console.log(err);
                    powerUps = [];
                }
            }
            //handling instant bombing
            if (currentEffect === "Mass Casualties") {
                var temp = [];
                for (var i = 0; i < objects.length; i++) { 
                    if (objects[i].level >= 2) {
                        temp.push[objects[i]];
                    }
                    else {
                        score += objects[i].reward;
                    }
                }
                objects = [];
                objectCount = 0;
                for (var i = 0; i < temp.length; i++) {
                    objects.push(temp[i]);
                    objectCount+=1;
                }
                currentEffect = "";
            }
            if (currentEffect === "Pierce") { 
                if (pierce) {
                    for (var s = 0; s < 10; s++) {
                        shots.push(new Shot(200+rand(-20*100,33*100), 200+rand(-20*100,33*100), ""));
                    }
                    currentEffect = "";
                }
                else { 
                    pierce = true;
                    currentEffect = "";
                }
            }
        render();
        }
    }, 1000/42);
    

    
    setInterval(function() {
        if (!pause) {
            objectCount+=Math.floor(1+score/5000);
            for (var x = 0; x < Math.floor(1+score/5000); x++) {
                objects.push(new Object(1));
                if (score >= 500 && !scoreBool[0]) {
                    objects.push(new Object(2));
                    scoreBool[0] == true;
                    objectCount+=1;
                }
                else if (score >= 1000 && !scoreBool[1]) {
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    scoreBool[1] == true;
                    objectCount+=4;
                }
                else if (score >= 1500 && !scoreBool[2]) {
                    objects.push(new Object(3));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    scoreBool[2] == true;
                    objectCount+=4;
                }
                else if (score >= 2000 && !scoreBool[3]) {
                    objects.push(new Object(3));
                    objects.push(new Object(3));
                    objects.push(new Object(3));
                    objects.push(new Object(3));
                    scoreBool[3] == true;
                    objectCount+=4;
                }
                else if (score > 2500) {
                    var x = Math.floor(rand(1,10));
                    if (x == 2) {
                        objectCount+=1;
                        objects.push(new Object(3));
                    }
                }
            }
        }
    }, 1000);
});