/*
 * Handles drawing of things on the screen and input events.
 */

import input from './input.js';

const stickWidth = 10,
      levelPad = 100;

const dotRatio = 0.2,
      spaceRatio = 0.8;

const kindColor = {
    0: 'red',
    1: 'black'
};

const stateColor = {
    0: '#aaa',
    1: '#333'
};

let screen = {

    init: function() {
        this.width = 1000;
        this.height = 800;
        this.can = document.createElement('canvas');
        this.ctx = this.can.getContext('2d');
        this.can.width = this.width;
        this.can.height = this.height;
        document.body.appendChild(this.can);
        input.init(this.can);
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.can.width, this.can.height);
    },

    black: function() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.can.width, this.can.height);
    },

    setLevelSize: function(numTiles) {
        let minDim = ~~Math.min(this.width, this.height);
        this._levelDim = minDim - levelPad;
        this._levelX = ~~(this.width / 2 - this._levelDim / 2);
        this._levelY = ~~(this.height / 2 - this._levelDim / 2);
        this._tileDim = ~~(this._levelDim / numTiles);
        this._vertexRad = ~~(this._tileDim * dotRatio);
        this._tileSpace = ~~(this._vertexRad * spaceRatio);
        // input conversion
        this._vr2 = this._vertexRad * this._vertexRad;
        this._mod = this._tileDim;
    },

    drawLevelOutline: function() {
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeSize = 3;
        let boxSize = this._levelDim + this._tileSpace / 2;
        //this.ctx.strokeRect(this._levelX, this._levelY, boxSize, boxSize);
    },

    drawTile: function(kind, i, j) {
        this.ctx.fillStyle = kindColor[kind];
        let x = i * this._tileDim + this._levelX + this._tileSpace / 2,
            y = j * this._tileDim + this._levelY + this._tileSpace / 2,
            size = this._tileDim - this._tileSpace;
        this.ctx.fillRect(x, y, size, size);
    },

    drawVertex: function(state, i, j) {
        this.ctx.fillStyle = stateColor[state];
        this.ctx.globalAlpha = 0.7;
        let x = i * this._tileDim + this._levelX,
            y = j * this._tileDim + this._levelY;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this._vertexRad, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
    },

    drawStick: function(stick) {
        let x1 = stick.i1 * this._tileDim + this._levelX,
            y1 = stick.j1 * this._tileDim + this._levelY,
            x2 = stick.i2 * this._tileDim + this._levelX,
            y2 = stick.j2 * this._tileDim + this._levelY;
        this.ctx.strokeSize = stickWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    },

    processInput: function(level) {
        input.forClick((ev) => {
            let x = ev.offsetX - this._levelX,
                y = ev.offsetY - this._levelY;
            // try to trap to vertex
            let i = Math.round(x / this._mod),
                j = Math.round(y / this._mod),
                mX = x - i * this._mod,
                mY = y - j * this._mod;
            console.log(i, j, mX, mY);
            if (mX * mX + mY * mY < this._vr2) {
                level.touchVertex(i, j);
            }
            // trap to tile
            // level.touchTile();
        });
    }
}

export default screen;
