//the actual game logic

var arcadeBox, input, frames, spFrame, lvFrame;
var alSprite, taSprite, ciSprite;
var aliens, dir, tank, bullets, cities;

var main = function(){
    arcadeBox = new ArcadeBox(510, 600);
    input = new InputHandler();

    var img = new Image();
    img.addEventListener("load", function(){
        alSprite = [
            [new Sprite(this,0,0,22,16),new Sprite(this,0,16,22,16)],
            [new Sprite(this,22,0,16,16),new Sprite(this,22,16,16,16)],
            [new Sprite(this,38,0,24,16),new Sprite(this,38,16,24,16)]
        ];
        taSprite = new Sprite(this,62,0,22,16);
        ciSprite = new Sprite(this,64,8,36,24);
        init();//find out the importance of function dec order
        run();
    });
    img.src = "invaders.png"; 
};
var init = function(){
    frames = 0;
    dir = 1;
    spFrame = 0;
    lvFrame = 50;
    tank = {
        sprite: taSprite,
        x:(arcadeBox.width - taSprite.x),
        y: arcadeBox.height - (30 + taSprite.h)
        
    };
    aliens = [];
    var rows = [1,0,0,2,2];
    for(var i=0, len=rows.length; i<len;i++){
        for(var j=0; j<10;j++){
           var a = rows[i];
           aliens.push({//this is crazy go through this slow
               sprite: alSprite[a],
               x: 30 + j*30 + [0,4,0][a],
               y: 30 + i*30,
               w: alSprite[a][0].w,
               h: alSprite[a][0].h
           
           })
        }
    }
    
};
var run = function(){
    var loop = function(){
        update();
        render();
        window.requestAnimationFrame(loop, arcadeBox.canvas);
    };
    window.requestAnimationFrame(loop, arcadeBox.canvas);
};
var update = function(){
    if(input.isDown(37)){//left
        tank.x -= 4;
    }
    if(input.isDown(39)){//right
        tank.x += 4;
    }

    frames++;
    if(frames % lvFrame === 0){
        spFrame = (spFrame + 1) % 2;//also what on earth is this?
    
        var _max = 1;
        var _min = arcadeBox.width;
        for(var i = 0; i<aliens.length; i++){
            var a = aliens[i];
            a.x += 30 * dir;
            _max = Math.max(_max, a.x, a.w);
            _min = Math.min(_min, a.x);
        }
        if(_max > arcadeBox.width -30 || _min < 30){
            dir = dir * -1;
            for(var i = 0; i< aliens.length; i++){
                aliens[i].x += 30*dir;
                aliens[i].y += 30;
            }

        }
    }
};
var render = function(){
    arcadeBox.clear();
    for(var i = 0; i<aliens.length; i++){
        var a = aliens[i];
        arcadeBox.drawSprite(a.sprite[spFrame], a.x,a.y);
    }
    arcadeBox.drawSprite(tank.sprite, tank.x, tank.y);
};

main();//why is this here
