class Snake {
    constructor() {
        this.body = [{
            y: 0,
            x: 0
        }];
        this.direction = "RIGHT";
    }

    get headPos() {
        return { 
            y: this.body[0].y, 
            x: this.body[0].x
        };
    }

    /* @desc Draw each part of the snake */
    draw() {
        for (let i in this.body) {
            ctx.beginPath();
            ctx.rect(this.body[i].x * board.cellSize, this.body[i].y * board.cellSize, board.cellSize, board.cellSize);
            ctx.closePath();
            ctx.fillStyle = (i === 0) ? '#FFFFFF' : '#F4F4F4';
            ctx.fill();
        }
    }

    growUp() {
        this.body.push(this.headPos);
    }

    /* @desc Move the snake to this.direction */
    moveToThisDirection() {
        let snakehead = this.headPos;

        if (this.direction === "LEFT") {
            snakehead.x -= 1;
        } else if (this.direction === "UP") {
            snakehead.y -= 1;
        } else if (this.direction === "RIGHT") {
            snakehead.x += 1;
        } else if (this.direction === "DOWN") {
            snakehead.y += 1;
        }

        this.body.pop();
        this.body.unshift(snakehead);
    }

    checkCollisions() {

        if (this.collidesWalls() || this.collidesHimself()) {
            return 1;
        }
        
        if (this.collidesFood()) {
            this.growUp();
            return 2;
        }
        
        return 0;
    }

    collidesFood() {
        let snakeHead = this.headPos;

        if (snakeHead.x === food.position.x && snakeHead.y === food.position.y) {
            return 1;
        }
        return 0;
    }

    collidesWalls() {
        let snakeHead = this.headPos;

        if (snakeHead.y < 0 || snakeHead.x < 0 || snakeHead.x + 1 > board.width || snakeHead.y + 1 > board.height) {
            return 1;
        }
        return 0;
    }

    collidesHimself() {
        let snakeHead = this.headPos;

        for (let i in this.body) {
            if (snakeHead.x === this.body[i].x && snakeHead.y === this.body[i].y && i > 0) {
                return 1;
            }
        }
        return 0;
    }
}