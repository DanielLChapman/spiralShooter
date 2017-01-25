//console.log(this.X + " " + this.Y + " " + this.angle + " " + this.radius2);
            //Change the velocity to point towards the center;
        /*var tempX = mX - this.X;
        var tempY = mY - this.Y;
        var m = tempY/tempX*-1;
        console.log(m + " Width: " + Math.cos(m)*this.hypotenuse + " Height: " + Math.sin(m)*this.hypotenuse);
        this.vX += Math.cos(m);
        this.vY += Math.sin(m);
        this.X += this.vX;
        this.Y += this.vY;
        /*
        var tempX = mX - this.X;
        var tempY = mY - this.Y;
        var m = (-1*(mY-this.Y))/(mX-this.X);
        if (this.X < mX) {
            tempX = Math.abs(tempX)*-1;
        }
        if (this.Y > mY) {
            tempY = Math.abs(tempY)*-1;
        }
        //var hypotenuse = this.hypotenuse;
        var angle = Math.acos((this.hypotenuse*this.hypotenuse+tempX*tempX-tempY*tempY)/(2*this.hypotenuse*tempX));
        var angle2 = getDeg(angle);
        console.log(" Hypot " + this.hypotenuse + " Width: " + this.hypotenuse*Math.cos(m) + " Height: " + this.hypotenuse*Math.sin(m) + " TempX " + tempX + " TempY " + tempY + " Angle: " + angle2 + " Width: " + Math.cos(angle)*this.hypotenuse + " Height: " + Math.sin(angle)*this.hypotenuse);
        angle-=.016;
        if (angle2 >= 91 && angle2 < 180) {
            this.X = mX+Math.cos(angle)*this.hypotenuse;
            this.Y = mY-Math.sin(angle)*this.hypotenuse;   
        }
        if (angle2 < 91 && angle2 > 0) {
            this.X = Math.abs(mX)+Math.abs(Math.cos(angle)*this.hypotenuse);
            if (angle2 > 89) {
                this.X += 1;
            }
            this.Y = mY-Math.sin(angle)*this.hypotenuse;   
        }
        //M: 0.5 Hypot 282.842712474619 Width: 248.21783222549826 Height: 135.60201976841796
        //M: 0.5 Hypot 282.842712474619
        //M: 0.5 Hypot 282.842712474619 Width: 248.21783222549826 Height: 135.60201976841796 TempX 200 TempY 200
        
        //this.X += this.vX;
        //this.Y += this.vY;
        //var m = (0-tempY)/(0-tempX);
        //var angle = Math.atan(m);
        //angle -= 7.6;
        //angle *= 57.2958;
        //angle -= 0;
        //if (angle < 0) {
        //    angle = 360;
        //}
        /*var hypotenuse = Math.sqrt(tempX * tempX + tempY*tempY);
        hypotenuse -= 7.6;
        if (hypotenuse <=0) {
            hypotenuse = 0;
        }*/
        //this.vY = (hypotenuse*Math.sin(angle)+mY)/7.6;
        //this.vX = (hypotenuse*Math.cos(angle)+mX)/7.6;
        
        //this.X = hypotenuse*Math.cos(90)+mX;
        //this.Y = hypotenuse*Math.sin(90)+mY;
        //console.log("Angle: " + angle + " Y: " + this.Y + " X: " + this.X + " Hypotenuse: " + hypotenuse );