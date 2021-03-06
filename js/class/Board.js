class Board {
	constructor() {
		this.width;
		this.height;

		this.cells;
		this.cellSize = 32;
		this.cellColorPrimary = '#222';
		this.cellColorSecondary = '#1d1d1d';

		this.init();
	}

	init() {
		this.width = canvas.width / this.cellSize;
		this.height = canvas.height / this.cellSize;

		this.cells = new Array(this.width);
		for (let col = 0; col < this.height; col++) {
			this.cells[col] = new Array(this.height);
		}

		for (let col = 0; col < this.height; col++) {
			for (let row = 0; row < this.width; row++) {
				this.cells[col][row] = row * this.cellSize;
			}
		}
	}

	draw() {
		for (let col in this.cells) {
			for (let row in this.cells[col]) {

				ctx.beginPath();
				ctx.rect(row * this.cellSize, col * this.cellSize, this.cellSize, this.cellSize);
				ctx.closePath();

				if (col % 2 == 0) {
					ctx.fillStyle = (row % 2 == 0) ? this.cellColorPrimary : this.cellColorSecondary;
				} else {
					ctx.fillStyle = (row % 2 == 1) ? this.cellColorPrimary : this.cellColorSecondary;
				}

				ctx.fill();
			}
		}
	}

	/* @return {object: y, x} */
	getRandomEmptyCell() {
		let emptyCells = this.getEmptyCells();
		let random = Math.floor(Math.random() * emptyCells.length);

		let position = {
			y: emptyCells[random].y,
			x: emptyCells[random].x
		};

		return position;
	}

	/* @return {array} */
	getEmptyCells() {
		let emptyCells = [];
		
		for (let col in this.cells) {
			for (let row in this.cells[col]) {
				let cell = {
					y: col,
					x: row
				};
				if (this.isThisAnEmptyCell(cell.y, cell.x)) {
					emptyCells.push(cell);
				}
			}
		}

		return emptyCells;
	}

	/* @return {boolean} */
	isThisAnEmptyCell(y, x) {
		for (let i in snake.body) {
			if (snake.body[i].y == y && snake.body[i].x == x) {
				return false;
			}
		}
		return true;
	}
}