const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let board = new Board();
let snake = new Snake();
let food = new Food();
const game = new Game();