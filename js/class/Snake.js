class Snake {
    constructor() {
        this.body = [{
            x: 0,
            y: 0
        }];
        this.direction = "RIGHT";
    }

    /* @desc Draw each part of the snake */
    draw() {
        for (let key in this.body) {
            ctx.beginPath();
            ctx.rect(this.body[key].x, this.body[key].y, game.cellSize, game.cellSize);
            ctx.closePath();
            ctx.fillStyle = (key === 0) ? '#FFFFFF' : '#F4F4F4';
            ctx.fill();
        }
    }

    /* @desc Move the snake to this.direction */
    moveToThisDirection() {
        let head = {
            x: this.body[0].x,
            y: this.body[0].y
        }

        if (this.direction === "LEFT") {
            head.x -= game.cellSize;
        } else if (this.direction === "UP") {
            head.y -= game.cellSize;
        } else if (this.direction === "RIGHT") {
            head.x += game.cellSize;
        } else if (this.direction === "DOWN") {
            head.y += game.cellSize;
        }

        this.body.pop();
        this.body.unshift(head);
    }


    /* @desc Check if the snake collides a wall, himself or food */
    checkCollisions() {
        let head = {
            x: this.body[0].x,
            y: this.body[0].y
        }

        /* Collides a wall */
        if (head.y < 0 ||
            head.x < 0 ||
            head.x + game.cellSize > canvas.width ||
            head.y + game.cellSize > canvas.height) {
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
        game.Score = food.value;
        food = new Food();
        this.body.push({
            x: this.body[0].x,
            y: this.body[0].y
        });
    }
}