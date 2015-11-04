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
        screen.init();
        input.init(screen.can);
    },
    tick: function() {
        level.update();
    },
    start: function() {
        level = new Level(1);
        loop();
    },
    draw: function() {
        screen.clear();
        level.draw();
    }
}

export default game;
