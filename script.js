import Ball from "./Ball.js"
import Paddle from "./paddle.js"

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player_paddle"));
const computerPaddle = new Paddle(document.getElementById("computer_paddle"));
const playerScore = document.getElementById("player_score");
const computerScore = document.getElementById("computer_score");
const button = document.getElementById("button");
let lastTime;

button.addEventListener("click", game);

function game() {

    button.style.visibility = "hidden";
    window.requestAnimationFrame(update);
    
}



function update(time){
    
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
        
    }else{

        
        window.requestAnimationFrame(update);
         
    }

    lastTime = time;
    
}

function isLose(){
    const bound = ball.collisionBoundary();
    return (bound.right >= window.innerWidth || bound.left <= 0)

}

function handleLose(){
    const bound = ball.collisionBoundary();
    if(bound.right >= window.innerWidth){
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    }else{
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
    playerPaddle.reset();

    button.textContent = "CONTINUE";
    button.style.visibility = "visible";



}

window.requestAnimationFrame();