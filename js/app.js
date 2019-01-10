const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = new Game();
let board = new Board();
let snake = new Snake();
let food = new Food();