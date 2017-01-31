var c = document.createElement('canvas');
var ctx = c.getContext('2d');
var cw = c.width = 600;
var ch = c.height = 600;
var pause = false, dead = false;
//ctx.translate(transX, transY);
var objects = [];
var shots = [];
var PI2 = Math.PI*2;
var score = 70000;
var objectCount = 10;
var bombs = 1;
//Power up effects
var powerUps = [];
var currentEffect = "";
var damageIncrease = 1;
var numAddShots = 0;
var pierce = false;
var emptyColor = "rgba(0,0,0,0.0)";
var whiteColor = "rgb(255,255,255)";
var magnetColor = whiteColor;

var superMode = false; //Super mode for infinite bombs
var startMenu = true;

var numLevelSix = 0;

var rand = function(a, b) {
    return (Math.random())*b+a;
}
function getDeg(rad) {
  var deg = rad * 180/Math.PI;
  return deg;
}
var scoreBool = [false, false, false, false, false, false, false, false];

var resize = function() {
    cw = c.width = 600;//$(window).width();
    ch = c.height = 600;//$(window).height();
};

/*var colorfulString = function() {
    return "rgb("+Math.floor(rand(0,255))+","+Math.floor(rand(0,255))+","+Math.floor(rand(0,255))+")";
}*/
var drawArc = function(x, y, colorFill, colorStroke, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, PI2, false);
    ctx.fillStyle = colorFill;
    ctx.fill();
    ctx.strokeStyle = colorStroke;
    ctx.stroke();
    ctx.closePath();
}
var drawText = function( text, x, y, fill, fontRules) {
    ctx.font=fontRules;
    ctx.fillStyle = fill;
    ctx.fillText(text, x, y);
}

var render = function() {
    //background
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "rgba(20,20,20, .8)";
    ctx.rect(0,0,c.width,c.height);
    ctx.fill();
    
    //game
    if (!startMenu) { 
        drawText(score, cw/2-10, ch-100, "rgb(255,255,255)", "14px Arial");
        drawText("Bombs: " + bombs, cw-100, ch-50, "rgb(255,255,255)", "14px Arial");

        drawArc(cw/2, ch/2, magnetColor,"rgb(0,0,0)", 15 );
        
        for (var i = 0; i < objects.length; i++) {
            drawArc(objects[i].X, objects[i].Y, emptyColor, objects[i].color, objects[i].radius );
            //inner circle

            if (objects[i].level >= 2) {
                drawArc(objects[i].X, objects[i].Y, emptyColor, objects[i].innerColor, objects[i].innerRadius );
            }
        }
        for (var i = 0; i < shots.length; i++) {
            ctx.beginPath();
            ctx.moveTo(shots[i].posX, shots[i].posY);
            ctx.lineTo(shots[i].posX + shots[i].vX, shots[i].posY + shots[i].vY);
            ctx.strokeStyle = "rgb(255,255,255)";
            ctx.stroke();
            ctx.closePath();
        }
        for (var i = 0; i < powerUps.length; i++) {
            drawArc(powerUps[i].X, powerUps[i].Y, powerUps[i].color, "rgb(0,0,0)", powerUps[i].radius );

            drawText(powerUps[i].charI, powerUps[i].X-5, powerUps[i].Y+5, "rgb(255,255,255)", "14px Arial");
        }
        if (pause) {
            
            var tempText = "PAUSED";
            var leftTemp = (cw/2-(55+(rand(-1, 1))));
            if (dead) {
                tempText = "DEAD";
                leftTemp = (cw/2-(43+(rand(-1, 1))))
            }
            drawText(tempText, leftTemp,(ch/2-(50+(rand(-1, 1)))), 'hsl(' + rand(100,110) + ', 50%, 50%)', "30px Arial");

        }
    }//start menu
    else {
        drawText("MAGNET RAIDS", (cw/2-(120+(rand(-1, 1)))), (ch/2-(50+(rand(-1, 1)))), 'hsl(' + rand(100,110) + ', 50%, 50%)', "30px Arial");
        
        ctx.beginPath();
        ctx.rect(cw/2-100, ch-150, 200, 50);
        ctx.fillStyle = emptyColor;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        //Not using the function for this as all the styling the same, so i wouldnt be saving but a few lines
        //Powerup display
        ctx.font="14px Arial";
        var tempText = "Click to Start"
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillText(tempText, cw/2-35, (ch-120));
        
        var tempText = "Press P to pause"
        ctx.fillText(tempText, cw/2-50, (ch/2+105));
        
        //powerup demos
        powerUps.push(new Power(cw/2-100, ch/2, 1));
        var tempText = "Multi Shot"
        ctx.fillText(tempText, cw/2-200, (ch/2+5));
        
        powerUps.push(new Power(cw/2+90, ch/2, 3));
        var tempText = "Damage Up"
        ctx.fillText(tempText, cw/2+140, (ch/2+5));
        
        powerUps.push(new Power(cw/2-100, ch/2+50, 10));
        var tempText = "Bomb: Press B"
        ctx.fillText(tempText, cw/2-230, (ch/2+55));
        
        powerUps.push(new Power(cw/2+90, ch/2+50, 5));
        var tempText = "Pierce/Barrage"
        ctx.fillText(tempText, cw/2+140, (ch/2+55));
        
        for (var i = 0; i < powerUps.length; i++) {
            drawArc(powerUps[i].X, powerUps[i].Y, powerUps[i].color, "rgb(0,0,0)", powerUps[i].radius );

            drawText(powerUps[i].charI, powerUps[i].X-5, powerUps[i].Y+5, "rgb(255,255,255)", "14px Arial");
            

        }
    }

}
$(document).keypress(function( event) {
    if (!startMenu) { 
        if (event.which == 98) {
            bombs-=1;
            if (bombs > 0 || superMode == true) {
                for (var i = 0; i < objects.length; i++) {
                    var temp = 500;
                    if (score > 25000) {
                        temp = 1000;
                    }
                    if (objects[i].canBeBombed) {
                        objects[i].health -= temp;
                        if (objects[i].health <= 0) {
                            objects.splice(i, 1);
                            objectCount--;
                            i--;
                        }  
                    }      
                }
            }
            else {
                bombs = 0;
            }
        }   
        else if (event.which == 112) {
            pause = !pause;
        }
        else if (event.which == 115) {
            superMode = true;
            damageIncrease = 5;
            numAddShots = 5;
            pierce = true;
            magnetColor = "rgb(44,54,65)";
        }
    }
});
var clickEvent = function(e) {
    if (!startMenu) {
        shots.push(new Shot(e.pageX, e.pageY, ""));
        for (var s = 0; s < numAddShots; s++) {
            shots.push(new Shot(e.pageX+rand(-20*numAddShots,33*numAddShots), e.pageY+rand(-20*numAddShots,33*numAddShots), ""));
        }
        if (pause) {
            pause = !pause;
        }
        if (dead) {
            objectCount = 10;
            dead = false;
            pause = false;
            superMode = false;
            score = 0;
            objects = [];
            powerUps = [];
            pierce = false;
            damageIncrease = 1;
            numAddShots = 0;
            magnetColor = whiteColor;
            currentEffect = "";
            for (var x = 0; x < objectCount; x++) {
                objects.push(new Object(1));
            }
        }
    }
    else { 
        startMenu = !startMenu;
        powerUps = [];
    }
};
$(document).click(function(e) {
    clickEvent(e);
});
$(document).on("tap", function(e){
    alert("tap" + e.originalEvent.touches[0].pageX);
  clickEvent(e);
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
    alert("testing update .01");
    $('body').append(c);
    for (var x = 0; x < objectCount; x++) {
        objects.push(new Object(1));
    }
    render();
    setInterval(function() {
        
        if (!pause && !startMenu) {
            //Update shot movement
            for (var i = 0; i < shots.length; i++) { 
                shots[i].update();
                if (shots[i].posX <= -100 || shots[i].posX >= c.width+100) {
                    shots.splice(i, 1);
                }
                else if (shots[i].posY <= -100 || shots[i].posY >= c.height+100) {
                    shots.splice(i, 1);
                }
            }
            for (var i = 0; i < objects.length; i++) { 
                objects[i].update();
                if (objects[i].level == 6) {
                    if (Math.floor(rand(1,11)) == 4) {
                        objects.push(new Object(Math.floor(rand(1,4))));
                        objectCount++;
                        objects[objects.length-1].X = objects[i].X;
                        objects[objects.length-1].Y = objects[i].Y;
                        objects[objects.length-1].angle = objects[i].angle;
                        objects[objects.length-1].radius2 = objects[i].radius2;
                    }
                }
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
                        if (objects[i].level == 5) {
                            for (var x = 0; x < 5; x++) {
                                objects.push(new Object(1));
                                objects[objects.length-1].X = objects[i].X+rand(1, 40);
                                objects[objects.length-1].Y = objects[i].Y+rand(1, 40);
                                objects[objects.length-1].angle = objects[i].angle;
                                objects[objects.length-1].radius2 = objects[i].radius2;
                            }
                            objectCount-=5;
                        }
                        if (objects[i].level == 6) {
                            numLevelSix-=1;
                        }
                        objects.splice(i, 1);
                        objectCount-=1;
                        i--;
                    }
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
                        runPowerUp(powerUps[i].effect);
                        if (!pierce) {
                            shots.splice(tempArr[1], 1);
                        }
                        powerUps.splice(i, 1);
                        }   
                    }
                } catch(err) {
                    //console.log(err);
                    powerUps = [];
                }
            }
            if (damageIncrease >= 5 && numAddShots >= 5 && pierce && !superMode) {
                magnetColor = "rgb(144,54,65)";
            }
        }
        render();
    }, 1000/60);

    //Monster Summoning
    setInterval(function() {
        if (!pause && !startMenu) {
            objectCount+=Math.floor(1+score/10000);
            for (var x = 0; x < Math.floor(1+score/10000); x++) {
                objects.push(new Object(1));
                if (score >= 500 && !scoreBool[0]) {
                    objects.push(new Object(2));
                    scoreBool[0] = true;
                    objectCount+=1;
                }
                else if (score >= 1000 && !scoreBool[1]) {
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    scoreBool[1] = true;
                    objectCount+=4;
                }
                else if (score >= 1500 && !scoreBool[2]) {
                    objects.push(new Object(3));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    scoreBool[2] = true;
                    objectCount+=4;
                }
                else if (score >= 2000 && !scoreBool[3]) {
                    objects.push(new Object(3));
                    objects.push(new Object(3));
                    objects.push(new Object(3));
                    objects.push(new Object(3));
                    scoreBool[3] = true;
                    objectCount+=4;
                }
                else if (score >= 25000 && !scoreBool[4]) {
                    objects.push(new Object(5));
                    scoreBool[4] = true;
                    objectCount+=1;
                }
                else if (score >= 70000 && !scoreBool[5]) {
                    if (numLevelSix <= 6) {
                        objects.push(new Object(6));
                        numLevelSix++;
                        scoreBool[5] = true;
                        objectCount+=1;
                    }
                }
                if (score > 100000) {
                    objects.push(new Object(4));
                    objects.push(new Object(5));
                    if (numLevelSix <= 6) {
                        numLevelSix++;
                        objects.push(new Object(6));
                        objectCount+=1;
                    }
                    objectCount+=2;
                }
                else if (score > 50000) {
                    objects.push(new Object(5));
                    objectCount+=1;
                }
                else if (score > 15000) {
                    objects.push(new Object(3));
                    objects.push(new Object(4));
                    objects.push(new Object(3));
                    objectCount+=3;
                }
                else if (score > 10000) {
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objects.push(new Object(3));
                    objects.push(new Object(3));
                    objects.push(new Object(3));
                    objects.push(new Object(3));
                    objectCount+=6;
                }
                else if (score > 5000) {
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objects.push(new Object(3));
                    objectCount+=3;
                }
                else if (score > 2500) {
                    var x = Math.floor(rand(1,10));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objectCount+=2;
                    if (x == 2) {
                        objectCount+=1;
                        objects.push(new Object(3));
                    }
                }
            }
        }
    }, 1000);

});