const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = new Game();
const board = new Board();
let snake = new Snake();
let food = new Food();