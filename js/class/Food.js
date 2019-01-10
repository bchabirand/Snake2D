class Food {
	constructor() {
		this.position = {
			y: board.getRandomEmptyCell().y,
			x: board.getRandomEmptyCell().x
		}
	}

	draw() {
		let cellDivide = board.cellSize / 2;
		ctx.beginPath();
		ctx.arc(this.position.x * board.cellSize + cellDivide, this.position.y * board.cellSize + cellDivide, cellDivide, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = 'red';
		ctx.fill();
	}
}