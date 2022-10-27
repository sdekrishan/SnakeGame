//for initializing the game 
function init (){
    // our board section 
 canvas = document.getElementById('mycanvas');
  pen = canvas.getContext('2d');
 W= canvas.width;
 H= canvas.height;
food = getRandomFood();
score = 0;

//snake properties (cells means its lengths and blocks)
 snake = {
    init_length:5,
    color:"red",
    cells :[],
    direction :'right',
//for creating snakes length last 5-1 that is 4 and 0 (x,y will be our snake's head)
    createSnake : function (){
        for (let i = this.init_length-1; i >=0 ; i--){
            this.cells.push({x:i,y:0})
        }
    },

    //  draw the snake it has x-axis, y-axis, width and height
    drawSnake:function (){
        for(let i = 0; i < this.cells.length; i++){
            pen.fillStyle = this.color;
            pen.strokeStyle = 'brown';
            pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10)
            pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10)


        }
    },
    gameOver:function (){

    },

    // after eating the fruits the snake will grow that functionality goes here

    updateSnake:function(){
        var headX = this.cells[0].x;
        var headY = this.cells[0].y;

      // if food eaten by snake then we will increase the score and increase the length
        if(headX == food.x && headY == food.y){
            food = getRandomFood();
            score+=5;
        }
        // if snake doesn't eat the food and he is running on the canvas then for its moving its last node will
        // always come to forward after a particular time which is given in setInterval
        else {
            this.cells.pop()
        }
//for movement of snakes the head's direction will change
        if(this.direction == 'right'){
            nextX = headX+1;
            nextY = headY
        }
        else if( this.direction=='left'){
            nextX = headX - 1;
            nextY = headY;
        }
        else if (this.direction == 'down'){
            nextX = headX;
            nextY = headY+1;
        }
        else {
            nextX = headX;
            nextY = headY - 1;
        }

        

        //insert the new head at the end or in the front 
       
        this.cells.unshift({x:nextX,y:nextY})

        // for ending the game if snake touches his part

        for(let i = 1; i < this.cells.length;i++){
            if(this.cells[0].x === this.cells[i].x && this.cells[0].y === this.cells[i].y){
                location.reload()
                alert("Game over")
                clearInterval(f)
            }
        }

        // for ending the game if snakes cross the canvas

        let lastX = Math.round(W/10);
        let lastY = Math.round(H/10);
        if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY){
            location.reload()
            alert('Game Over, Press F5 3 three time to continue')
            clearInterval(f)
        }

    }

};

// calling createSnake so that it could be created

snake.createSnake()


    //Adding event listeners to our game
    //listen for keyboard event
function KeyPressed(e){
    if(e.key =='ArrowRight'){
        snake.direction='right'
    }
    else if(e.key == 'ArrowLeft'){
        snake.direction='left'
    }
    else if (e.key =="ArrowDown"){
        snake.direction="down"
    }
    else if (e.key ==' '){
        clearInterval(f)
    }
    else {
        snake.direction='up'
    }
}
    document.addEventListener('keydown',KeyPressed)

}


//for drawing snakes, food and scoring sections 

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake()

    //for food drawing
    pen.fillStyle = food.color;
    pen.fillRect(food.x*10,food.y*10,10,10)

    //for scoring part
    pen.fillStyle = 'white';
    pen.font = 'Roboto';
    pen.fillText("Score: "+score,10,10)

}

//to call the update function

function update(){
    snake.updateSnake()
}

// our game loop that will continuously run 

function gameLoop(){
    draw();
    update()
}

// for making food section

function getRandomFood(){
    let foodX = Math.round(Math.random()*(W-10)/10 );
    let foodY = Math.round(Math.random()*(H-10)/10 );

    foodColors = ['orange','orchid','pink','blue','grey']
    let i = Math.round(Math.random()*foodColors.length)
     food = {
        x:foodX,
        y:foodY,
        color:foodColors[i]
    }
    return food
}
// for initialising our game and then keep running it after a particular time
init()
setInterval(gameLoop,400)

// for levels
document.getElementById("pro").addEventListener("click",function (){
    clearInterval(easy)
    clearInterval(medium)
    clearInterval(hard)
    pro = setInterval(gameLoop,100)
 })
 document.getElementById("easy").addEventListener("click",function (){
        clearInterval(pro);
        clearInterval(hard)
        clearInterval(medium)
        easy = setInterval(gameLoop,400)
        
    })
    document.getElementById("medium").addEventListener("click",function (){
        clearInterval(easy)
        clearInterval(pro)
        clearInterval(hard)
        medium = setInterval(gameLoop,300)
     })
     document.getElementById("hard").addEventListener("click",function (){
    clearInterval(easy)
    clearInterval(medium)
    clearInterval(pro)
    hard = setInterval(gameLoop,200)
 })
 