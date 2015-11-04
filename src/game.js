import screen from './screen.js';
import input from './input.js';
import Level from './level.js';

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
    },
    tick: function() {
        this.level.tick();
    },
    start: function() {
        this.level = new Level(1);
        loop();
    },
    draw: function() {
        screen.clear();
        this.level.draw();
    }
}

export default game;
