let input = {
    init: function(elem) {
        this.elem = elem;
        this.elem.addEventListener('click', this._click.bind(this));
        this._clicks = []
    },
    forClick: function(cb) {
        this._clicks.forEach(cb);
        this._clicks = [];
    },
    _click: function(ev) {
        this._clicks.push(ev);
    }
}

export default input;
