import screen from './screen.js';
import Grid from './util/grid.js';

export default class Level {
    constructor(number) {
        this.number = number;
        let src = require('json!../levels/' + number + '.json');
        Object.assign(this, src);
    }

    update() {
    }

    getAt(i, j) {
        return this.grid[this.size * j + i];
    }

    forEach(cb) {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let x = this.getAt(i, j);
                cb(x, i, j);
            }
        }
    }

    draw() {
        this.forEach(screen.drawTile.bind(screen));
    }

}
