const INIT_VELOCITY = 0.03;
const INCREASE_VELOCITY = 0.00002;


var paddleTap = new Audio("sounds/paddlehit.wav");
paddleTap.currentTime = 0;

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }

    set x(value){
        this.ballElem.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }

    set y(value){
        this.ballElem.style.setProperty("--y", value);
    }

    collisionBoundary() {
        return this.ballElem.getBoundingClientRect();
    }


    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };
        while (
          Math.abs(this.direction.x) <= 0.2 ||
          Math.abs(this.direction.x) >= 0.9
        ) {
          const val = randNumBetween(0, 2 * Math.PI);
          this.direction = { x: Math.cos(val), y: Math.sin(val) };
        }
        this.velocity = INIT_VELOCITY;
      }


    update(delta, paddleRects) {

        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += INCREASE_VELOCITY;
        const boundary = this.collisionBoundary();

        if(boundary.bottom >= window.innerHeight || boundary.top <= 0){
            this.direction.y *= -1;
        }

        if(paddleRects.some(r => isCollision(r, boundary))){
            this.direction.x *= -1;
        }
        
    }
}


function randNumBetween(min, max){
    return Math.random() * (max-min) + min;
}

function isCollision(rect1, rect2){
    
    if(
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top) {
            paddleTap.play();
            return true;
        }
      
}