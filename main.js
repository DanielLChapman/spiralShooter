var c = document.createElement('canvas');
var ctx = c.getContext('2d');
var cw = c.width = 600;
var ch = c.height = 600;
var pause = false;
//ctx.translate(transX, transY);
var objects = [];
var shots = [];
var PI2 = Math.PI*2;
var score = 0;
var objectCount = 10;
var rand = function(a, b) {
    return (Math.random())*b+a;
}
function getDeg(rad) {
  var deg = rad * 180/Math.PI;
  return deg;
}
var scoreBool = [false, false, false];

var resize = function() {
    cw = c.width = 600;//$(window).width();
    ch = c.height = 600;//$(window).height();
};

var render = function() {
    ctx.clearRect(0, 0, c.width, c.height);
    //ctx.translate(transX, transY);
    ctx.fillText(score, 290, 500);
    ctx.beginPath();
    ctx.arc(cw/2, ch/2, 15, 0, PI2, false);
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.fill();
    ctx.stroke();
    for (var i = 0; i < objects.length; i++) {
        ctx.beginPath();
        ctx.arc(objects[i].X, objects[i].Y, objects[i].radius, 0, PI2, false);
        ctx.fillStyle = objects[i].color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    for (var i = 0; i < shots.length; i++) {
        ctx.beginPath();
        ctx.moveTo(shots[i].posX, shots[i].posY);
        ctx.lineTo(shots[i].posX + shots[i].vX, shots[i].posY + shots[i].vY);
        ctx.fillStyle = "rgb(250,250,250)";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

$(document).click(function(e) {
    shots.push(new Shot(e.pageX, e.pageY, ""));
    if (pause) {
        objectCount = 10;
        pause = false;
        score = 0;
        objects = [];
        for (var x = 0; x < objectCount; x++) {
            objects.push(new Object(1));
        }
    }
});

$(document).ready(function() {
    $('body').append(c);
    for (var x = 0; x < objectCount; x++) {
        objects.push(new Object(1));
    }
    render();
    setInterval(function() {
        if (!pause) {
            resize();
            //Update objects, and object interactions
            for (var i = 0; i < objects.length; i++) { 
                objects[i].update();
                if (objects[i].radius2 <= 15) {
                    objects.splice(i, 1);
                    objectCount-=1;
                    pause = true;
                }
                for (var x = 0; x < shots.length; x++) { 
                    /*var dX = objects[i].X - shots[x].posX;
                    var dY = objects[i].Y - shots[x].posY;
                    var dist = Math.sqrt(dX*dX + dY * dY);
                    */var dX2 = objects[i].X - (shots[x].posX+shots[x].vX);
                    var dY2 = objects[i].Y - (shots[x].posY+shots[x].vY);
                    var dist2 = Math.sqrt(dX2*dX2 + dY2 * dY2);
                    if (/*dist < objects[i].radius ||*/ dist2 < objects[i].radius) {
                        objects[i].health -= shots[x].damage;
                        if (objects[i].health <= 0) {
                            score += objects[i].reward;
                            shots.splice(x, 1);
                            objects.splice(i, 1);
                            objectCount--;
                        }
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
            render();
        }
    }, 1000/60);
    setInterval(function() {
        if (!pause) {
            objectCount+=Math.floor(1+score/1500);
            for (var x = 0; x < Math.floor(1+score/1500); x++) {
                objects.push(new Object(1));
                if (score == 500 && !scoreBool[0]) {
                    objects.push(new Object(2));
                    scoreBool[0] == true;
                }
                if (score == 1000 && !scoreBool[1]) {
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    scoreBool[1] == true;
                }
                if (score == 1500 && !scoreBool[2]) {
                    objects.push(new Object(3));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    objects.push(new Object(2));
                    scoreBool[2] == true;
                }
            }
        }
    }, 1000);
});