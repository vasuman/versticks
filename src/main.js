import game from './game.js';

console.clear();

window.onload = function() {
    game.init();
    game.start();
    //debug
    require('expose?game!./game.js');
}
