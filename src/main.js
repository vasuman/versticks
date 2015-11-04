import game from './game.js';

console.clear();

game.init();

window.onload = game.start.bind(game);
