let input = {
    init: function(elem) {
        this._listeners = [];
        this.elem = elem;
        this.elem.addEventListener('click', this._click.bind(this));
    },
    listen: function(box, trigger) {
        this._listeners.push({ box, trigger });
    },
    _click: function(ev) {
        for (let listener of this._listeners) {
            if (listener.box.traps(ev)) {
                listener.trigger();
            }
        }
    }
}

export default input;
