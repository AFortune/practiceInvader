//helper functions





//ArcadeBox instead of Screen

var ArcadeBox = function(width, height){
    this.canvas = document.createElement("canvas");
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

};

ArcadeBox.prototype.drawSprite = function(sprite, x, y){
    this.ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);
};
ArcadeBox.prototype.clear = function(){
    this.ctx.clearRect(0,0,this.width, this.height);
};

//Sprite

var Sprite = function(img, x, y, w, h){
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};


//InputHandler
var InputHandler = function(){
    this.down = {};
    this.pressed = {};
    var self = this;
    document.addEventListener("keydown", function(evt){
    
        self.down[evt.keyCode] = true;
    });
    document.addEventListener("keyup", function(evt){
        delete self.down[evt.keyCode];
        delete self.pressed[evt.keyCode];
    
    });
};

InputHandler.prototype.isDown = function(code){
    return this.down[code];
};

InputHandler.prototype.isPressed = function(code){//find this really confusing at the moment
    if(this.pressed[code]){
        return false;
    }
    else if(this.down[code]){
        return this.pressed[code] = true;
    }
    return false;
};



