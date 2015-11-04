import screen from './screen.js';
import Grid from './util/grid.js';

class Stick {
    constructor(i1, j1, i2, j2) {
        this.i1 = i1;
        this.j1 = j1;
        this.i2 = i2;
        this.j2 = j2;
    }
}

const connectors = {
    0: function(vs, scb) {
        for (let i = 0; i < 4; i++) {
            if (vs[i] && vs[(i + 1) % 4]) {
                scb(i);
            }
        }
    },
    1: function() {
    }
}

const top = 0,
      right = 1,
      bottom = 2,
      left = 3;

export default class Level {
    constructor(number) {
        this.number = number;
        let src = require('json!../levels/' + number + '.json');
        Object.assign(this, src);
        screen.setLevelSize(this.size);
        this._vs = this.size + 1;
        this.vertices = new Array(this._vs * this._vs);
        this.vertices.fill(0);
        this.sticks = [];
    }

    _update() {
        this.sticks = [];
        let vs = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                vs[top] = this.vertexAt(i, j);
                vs[right] = this.vertexAt(i, j + 1);
                vs[bottom] = this.vertexAt(i + 1, j + 1);
                vs[left] = this.vertexAt(i + 1, j);
                let conn = connectors[this.tileAt(i, j)];
                conn(vs, (side) => {
                    let stick = null;
                    switch (side) {
                        case top:
                            stick = new Stick(i, j, i, j + 1);
                            break;
                        case bottom:
                            stick = new Stick(i + 1, j, i + 1, j + 1);
                            break;
                        case right:
                            stick = new Stick(i, j + 1, i + 1, j + 1);
                            break;
                        case left:
                            stick = new Stick(i, j, i + 1, j);
                            break;
                    }
                    this.sticks.push(stick);
                });
            }
        }
    }

    tick() {
        screen.processInput(this);
    }

    tileAt(i, j) {
        return this.grid[this.size * j + i];
    }

    vertexAt(i, j) {
        return this.vertices[this._vs * j + i];
    }

    stickAt(i, j, side) {
        return this.sticks[(this.size * j + i) * 4 + side];
    }

    draw() {
        screen.drawLevelOutline();
        // draw tiles
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let x = this.tileAt(i, j);
                screen.drawTile(x, i, j);
            }
        }
        // draw vertices
        for (let i = 0; i <= this.size; i++) {
            for (let j = 0; j <= this.size; j++) {
                let x = this.vertexAt(i, j);
                screen.drawVertex(x, i, j);
            }
        }
        // draw sticks
        for (let stick of this.sticks) {
            screen.drawStick(stick);
        }
    }

    touchVertex(i, j) {
        let curState = this.vertexAt(i, j);
        this.vertices[j * this._vs + i] = 1 ^ curState;
        this._update();
    }

    touchTile(i, j) {
        let curState = this.tileAt(i, j);
        this.grid[j * this.size + i] = 1 ^ curState;
        this._update();
    }
}
