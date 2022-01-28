const SPEED = 0.02;

export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem;
        this.reset();
    }

    get pos() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }

    rect(){
        return this.paddleElem.getBoundingClientRect();
    }
    set pos(value){
        this.paddleElem.style.setProperty("--position", value);
    }

    update(delta, ballY){
        this.pos += SPEED * delta * (ballY - this.pos);
    }

    reset() {
        this.pos = 50;
    }
}
