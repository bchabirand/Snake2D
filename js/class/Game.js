class Game {
	constructor() {
		this.cellSize = 32; //px
		this.score = 0;
		this.isOver = 0;
		this.controls = {
		   left: 37, // arrow left
		   up: 38, // arrow up
		   right: 39, // arrow right
		   down: 40, // arrow down
		   restart: 82 // R
		}
		this.loop;
		this.refreshTime = 100; //ms

		this.addEventControls();
	}

	set Score(value) {
		this.score += value;
	}

	get emptyCells() {
		let emptyCells = [];
		let lastCell = {
			x: canvas.width / this.cellSize,
			y: canvas.height / this.cellSize
		};
		for (let y = 0; y < lastCell.y; y++) {

			for (let x = 0; x < lastCell.x; x++) {

				let cell = {
					x: x * this.cellSize,
					y: y * this.cellSize
				};
				if (this.isThisAnEmptyCell(cell.x, cell.y)) {
					emptyCells.push(cell);
				}
			}
		}

		return emptyCells;
	}

	/**
     * @desc Check if the cell is empty
     * @param {num} x
     * @param {num} y 
     * @return {boolean}
     */
	isThisAnEmptyCell(x, y) {
		for (let key in snake.body) {
			if (snake.body[key].x === x && snake.body[key].y === y) {
				return false;
			}
		}
		return true;
	}

	addEventControls() {
		document.addEventListener('keydown', (e) => {
			if (e.keyCode === this.controls.left && snake.direction != "RIGHT") {
				snake.direction = "LEFT";
			}
			if (e.keyCode === this.controls.up && snake.direction != "DOWN") {
				snake.direction = "UP";
			}
			if (e.keyCode === this.controls.right && snake.direction != "LEFT") {
				snake.direction = "RIGHT";
			}
			if (e.keyCode === this.controls.down && snake.direction != "UP") {
				snake.direction = "DOWN";
			}
			if (e.keyCode === this.controls.restart && this.isOver) {
				this.restart();
			}
		});
	}

	start() {
		this.loop = setInterval(() => {
			this.clear();
			if (!this.isOver) {
				food.draw();
				snake.draw();
				snake.moveToThisDirection();
				snake.checkCollisions();
			} else {
				this.over();
				clearInterval(this.loop);
			}
		}, this.refreshTime);
	}

	restart() {
		snake = new Snake();
		food = new Food();
		this.score = 0;
		this.isOver = 0;
		this.start();
	}

	over() {
		ctx.font = "30px Roboto";
		ctx.textAlign = "center";
		ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 25);
		ctx.fillText(`Score: ${this.score}`, canvas.width / 2, canvas.height / 2 + 25);
		ctx.font = "20px Roboto";
		ctx.fillText(`Appuyez sur ${String.fromCharCode(this.controls.restart)} pour rejouer`, canvas.width / 2, canvas.height - 50);
	}

	clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}