const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let game = new Game();
let snake = new Snake();
let food = new Food();

game.start();