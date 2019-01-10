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
		let emptyCell = Math.floor(Math.random() * this.getEmptyCells().length);

		let position = {
			y: this.getEmptyCells()[emptyCell].y / this.cellSize,
			x: this.getEmptyCells()[emptyCell].x / this.cellSize
		};

		return position;
	}

	/* @return {array} */
	getEmptyCells() {
		let emptyCells = [];
		
		for (let col in this.cells) {
			for (let row in this.cells[col]) {
				let cell = {
					y: col * this.cellSize,
					x: row * this.cellSize
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
		for (let key in snake.body) {
			if (snake.body[key].y === y && snake.body[key].x === x) {
				return false;
			}
		}
		return true;
	}
}