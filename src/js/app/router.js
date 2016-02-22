/**
 * Created by roman on 27.09.2015.
 */

export default class Router {
    constructor({root, mode = this._getDefaultMode(), } = {}) {
        this.root = root ? '/' + this._clearSlashes(root) + '/' : '/';
        this.mode = mode;
        this.routes = [];
    }
    _getFragment () {
        var fragment = '';
        if (this.mode == 'history') {
            fragment = this._clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this._clearSlashes(fragment);
    }

    add (re, handler) {
        if(typeof re == 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler});
        return this;
    }
    remove (param) {
        for(let i = 0, r; i<this.routes.length, r = this.routes[i]; i++) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    }

    flush () {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    }
    check (f) {
        var fragment = f || this._getFragment();
        for(let i = 0; i < this.routes.length; i++) {
            let match = fragment.match(this.routes[i].re);
            if(match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
        return this;
    }
    listen () {
        var self = this;
        var current = self._getFragment();
        var fn = function() {
            if(current !== self._getFragment()) {
                current = self._getFragment();
                self.check(current);
            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    }
    navigate (path = '') {
        if(this.mode === 'history') {
            history.pushState(null, null, this.root + this._clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }

    _getDefaultMode () {
        return !!(history.pushState) ? 'history' : 'hash'
    }

    _clearSlashes (path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }
}