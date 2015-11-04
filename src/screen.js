/*
 * Handles drawing of things on the screen.
 */
let screen = {
    init: function() {
        this.width = 800;
        this.height = 600;
        this.can = document.createElement('canvas');
        this.ctx = this.can.getContext('2d');
        this.can.width = this.width;
        this.can.height = this.height;

        this._levelPad = 25;

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
        this._levelDim = minDim - this._levelPad;
        this._levelX = ~~(this.width / 2 - this._levelDim / 2);
        this._levelY = ~~(this.height / 2 - this._levelDim / 2);
        this._tileDim = this._levelDim / numTiles;
    },
    drawTile: function(kind, i, j) {
        ctx.strokeStyle = 'white';
        ctx.storkeSize = 10;
        if (kind === 0) {
            ctx.fillStyle = 'red';
        }
        let x = i * this._tileDim + this._levelX,
            y = j * this._tileDim + this._levelY;
        this.ctx.fillRect(x, y, this._tileDim, this._tileDim);
    }
}

export default screen;
