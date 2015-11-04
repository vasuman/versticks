import screen from './screen.js';
import input from './input.js';
import Level from './level.js';

let level = null;

function loop() {
    // clear screen
    screen.clear();
    game.tick();
    game.draw();
    window.requestAnimationFrame(loop);
}


let game = {
    init: function() {
        this._x = 3;
    },
    tick: function() {
        level.update();
    },
    start: function() {
        level = new Level(1);
        screen.init();
        input.init(screen.can);
        loop();
    },
    draw: function() {
        screen.clear();
        level.draw();
    }
}

export default game;
