/*
 * Handles drawing of things on the screen.
 */

const tileSpace = 15;
const levelPad = 35;

const kindColor = {
    0: 'red',
    1: 'black'
}

let screen = {
    init: function() {
        this.width = 800;
        this.height = 600;
        this.can = document.createElement('canvas');
        this.ctx = this.can.getContext('2d');
        this.can.width = this.width;
        this.can.height = this.height;

        document.body.appendChild(this.can);
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
        this._tileDim = this._levelDim / numTiles;
    },
    drawLevelOutline: function() {
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeSize = 3;
        let boxSize = this._levelDim + tileSpace;
        this.ctx.strokeRect(this._levelX, this._levelY, boxSize, boxSize);
    },
    drawTile: function(kind, i, j) {
        this.ctx.fillSytle = kindColor[kind];
        let x = i * this._tileDim + this._levelX + tileSpace,
            y = j * this._tileDim + this._levelY + tileSpace;
        this.ctx.fillRect(x, y, this._tileDim - tileSpace, this._tileDim - tileSpace);
    }
}

export default screen;
