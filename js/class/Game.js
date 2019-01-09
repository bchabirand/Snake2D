class Game {
	constructor() {
		this.score = 0;
		this.isOver = 0;
		this.controls = {
		   left: 37, // arrow left
		   up: 38, // arrow up
		   right: 39, // arrow right
		   down: 40, // arrow down
		   start: 83, // S
		   restart: 82 // R
		}
		this.loop = 0;
		this.refreshTime = 100; //ms

		this.addEventControls();
		this.ready();
	}

	addEventControls() {
		document.addEventListener('keydown', (e) => {
			if (this.loop > 0) {
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
			}
			if (e.keyCode === this.controls.start && this.loop === 0) {
				this.start();
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
				board.draw();
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

	ready() {
		ctx.font = "40px Roboto";
		ctx.textAlign = "center";
		ctx.fillStyle = '#fff';
		ctx.fillText("Snake 2D", canvas.width / 2, canvas.height / 2 - 25);
		ctx.font = "20px Roboto";
		ctx.fillText(`Use the arrow keys to move`, canvas.width / 2, canvas.height / 2 + 25);
		ctx.fillText(`Press ${String.fromCharCode(this.controls.start)} to start`, canvas.width / 2, canvas.height / 2 + 60);
	}

	over() {
		ctx.font = "30px Roboto";
		ctx.textAlign = "center";
		ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 25);
		ctx.fillText(`Score: ${this.score}`, canvas.width / 2, canvas.height / 2 + 25);
		ctx.font = "20px Roboto";
		ctx.fillText(`Press ${String.fromCharCode(this.controls.restart)} to restart`, canvas.width / 2, canvas.height - 50);
	}

	clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}