class Game {
	constructor() {
		this.score = 0;
		this.isOver = 0;
		this.controls = {
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
				let collision = snake.checkCollisions();

				if (collision === 1) { 
					this.isOver = 1;
				}
				if (collision === 2) { 
					this.score += 10;
					food = new Food();
				}

			} else {
				clearInterval(this.loop);
				this.over();
			}
		}, this.refreshTime);
	}

	restart() {
		clearInterval(this.loop);
		snake = new Snake();
		food = new Food();
		this.score = 0;
		this.isOver = 0;
		this.start();
	}

	ready() {
		let horizontalCenter = canvas.width / 2;
		let verticalCenter = canvas.height / 2;

		ctx.font = "40px Roboto";
		ctx.textAlign = "center";
		ctx.fillStyle = '#fff';
		ctx.fillText("Snake 2D", horizontalCenter, verticalCenter - 25);
		ctx.font = "20px Roboto";
		ctx.fillText(`Use the arrow keys to move`, horizontalCenter, verticalCenter + 25);
		ctx.fillText(`Press ${String.fromCharCode(this.controls.start)} to start`, horizontalCenter, verticalCenter + 60);
	}

	over() {
		let horizontalCenter = canvas.width / 2;
		let verticalCenter = canvas.height / 2;

		ctx.font = "30px Roboto";
		ctx.textAlign = "center";
		ctx.fillText("Game Over", horizontalCenter, verticalCenter - 25);
		ctx.fillText(`Score: ${this.score}`, horizontalCenter, verticalCenter + 25);
		ctx.font = "20px Roboto";
		ctx.fillText(`Press ${String.fromCharCode(this.controls.restart)} to restart`, horizontalCenter, canvas.height - 50);
	}

	clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}