class Food {
	constructor() {
		let emptyCell = Math.floor(Math.random() * game.emptyCells.length);
		this.value = 10;
		this.position = {
			x: game.emptyCells[emptyCell].x,
			y: game.emptyCells[emptyCell].y,
		}
	}

	draw() {
		let cellDivide = game.cellSize / 2;
		ctx.beginPath();
		ctx.arc(this.position.x + cellDivide, this.position.y + cellDivide, cellDivide, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = 'red';
		ctx.fill();
	}
}