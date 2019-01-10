class Food {
	constructor() {
		let emptyCell = Math.floor(Math.random() * board.GetEmptyCells.length);
		this.value = 10;
		this.position = {
			x: board.GetEmptyCells[emptyCell].x,
			y: board.GetEmptyCells[emptyCell].y,
		}
	}

	draw() {
		let cellDivide = board.cellSize / 2;
		ctx.beginPath();
		ctx.arc(this.position.x + cellDivide, this.position.y + cellDivide, cellDivide, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = 'red';
		ctx.fill();
	}
}