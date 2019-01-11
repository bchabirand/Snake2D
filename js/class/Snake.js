class Snake {
    constructor() {
        this.body = [{
            y: 0,
            x: 0
        }];
        this.controls = {
           left: 37, // arrow left
           up: 38, // arrow up
           right: 39, // arrow right
           down: 40, // arrow down
        }
        this.direction = "RIGHT";

        this.addEventControls();
    }

    get headPos() {
        return { 
            y: this.body[0].y, 
            x: this.body[0].x
        };
    }

    addEventControls() {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === this.controls.left && this.direction != "RIGHT") {
                this.direction = "LEFT";
            }
            if (e.keyCode === this.controls.up && this.direction != "DOWN") {
                this.direction = "UP";
            }
            if (e.keyCode === this.controls.right && this.direction != "LEFT") {
                this.direction = "RIGHT";
            }
            if (e.keyCode === this.controls.down && this.direction != "UP") {
                this.direction = "DOWN";
            }
        });
    }

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

    moveToThisDirection() {
        let snakeHead = this.headPos;

        if (this.direction === "LEFT") {
            snakeHead.x -= 1;
        } else if (this.direction === "UP") {
            snakeHead.y -= 1;
        } else if (this.direction === "RIGHT") {
            snakeHead.x += 1;
        } else if (this.direction === "DOWN") {
            snakeHead.y += 1;
        }

        this.body.pop();
        this.body.unshift(snakeHead);
    }

    checkCollisions() {

        if (this.collidesWall() || this.collidesHimself()) {
            return 1;
        }
        
        if (this.collidesFood()) {
            this.growUp();
            return 2;
        }
        
        return 0;
    }

    /* @return {boolean} */
    collidesFood() {
        let snakeHead = this.headPos;

        if (snakeHead.x == food.position.x && snakeHead.y == food.position.y) {
            return 1;
        }
        return 0;
    }

    /* @return {boolean} */
    collidesWall() {
        let snakeHead = this.headPos;

        if (snakeHead.y < 0 || snakeHead.x < 0 || snakeHead.x + 1 > board.width || snakeHead.y + 1 > board.height) {
            return 1;
        }
        return 0;
    }

    /* @return {boolean} */
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