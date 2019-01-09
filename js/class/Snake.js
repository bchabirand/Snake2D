class Snake {
    constructor() {
        this.body = [{
            y: 0,
            x: 0
        }];
        this.direction = "RIGHT";
    }

    /* @desc Draw each part of the snake */
    draw() {
        for (let key in this.body) {
            ctx.beginPath();
            ctx.rect(this.body[key].x, this.body[key].y, board.cellSize, board.cellSize);
            ctx.closePath();
            ctx.fillStyle = (key === 0) ? '#FFFFFF' : '#F4F4F4';
            ctx.fill();
        }
    }

    /* @desc Move the snake to this.direction */
    moveToThisDirection() {
        let head = {
            y: this.body[0].y,
            x: this.body[0].x
        }

        if (this.direction === "LEFT") {
            head.x -= board.cellSize;
        } else if (this.direction === "UP") {
            head.y -= board.cellSize;
        } else if (this.direction === "RIGHT") {
            head.x += board.cellSize;
        } else if (this.direction === "DOWN") {
            head.y += board.cellSize;
        }

        this.body.pop();
        this.body.unshift(head);
    }


    /* @desc Check if the snake collides a wall, himself or food */
    checkCollisions() {
        let head = {
            y: this.body[0].y,
            x: this.body[0].x
        }

        /* Collides a wall */
        if (head.y < 0 ||
            head.x < 0 ||
            head.x + board.cellSize > canvas.width ||
            head.y + board.cellSize > canvas.height) {
            game.isOver = 1;
        }

        /* Collides himself */
        for (let key in this.body) {
            if (head.x === this.body[key].x && head.y === this.body[key].y && key > 0) {
                game.isOver = 1;
            }
        }

        /* Collides food */
        if (head.x === food.position.x && head.y === food.position.y) {
            this.eatFood();
        }
    }

    eatFood() {
        game.score += food.value;
        food = new Food();
        this.body.push({
            y: this.body[0].y,
            x: this.body[0].x
        });
    }
}