import Ball from "./Ball.js"
import Paddle from "./paddle.js"


const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player_paddle"));
const computerPaddle = new Paddle(document.getElementById("computer_paddle"));
const playerScore = document.getElementById("player_score");
const computerScore = document.getElementById("computer_score");
const button = document.getElementById("button");
let lastTime;

var lose = new Audio("sounds/loss.wav");
var winner  = new Audio("sounds/win.wav");
var game_running;

button.addEventListener("click", game);

function game() {
    game_running = true;

    if(game_running == true){
    button.style.visibility = "hidden";
    lastTime = null;
    window.requestAnimationFrame(update);
    
    }
    
}



function update(time){
    

    if(game_running == true){
        document.addEventListener("mousemove", e => {
        playerPaddle.pos = (e.y / window.innerHeight) * 100;
    });

    if(lastTime != null){
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
        document.documentElement.style.setProperty("--hue", hue+delta * 0.01);
    }

    
    if(isLose()){
        handleLose();
        
    }  
    window.requestAnimationFrame(update);
    lastTime = time;
    
    
    
    }
}

function isLose(){
    const bound = ball.collisionBoundary();
    return (bound.right >= window.innerWidth || bound.left <= 0)

}

function handleLose(){
    winner.currentTime = 0;
    lose.currentTime = 0;
    const bound = ball.collisionBoundary();
    if(bound.right >= window.innerWidth){
        winner.play();
        playerScore.textContent = parseInt(playerScore.textContent) + 1;

    }else{
        lose.play();
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }

    button.textContent = "CONTINUE";
    button.style.visibility = "visible";
    game_running = false;
    console.log(game_running);
    ball.reset();
    computerPaddle.reset();
    playerPaddle.reset();

    



}

