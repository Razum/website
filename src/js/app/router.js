/**
 * Created by roman on 27.09.2015.
 */
console.log("ROUTER");
export default class Router {
    constructor({root, mode = this._getDefaultMode(), } = {}) {
        console.info("constructor");
        this.root = root ? '/' + this._clearSlashes(root) + '/' : '/';

        console.log(111, ...arguments, arguments, 222, mode);
    }
    _getFragment () {
        var fragment = '';
    }

    _getDefaultMode () {
        return !!(history.pushState) ? 'history' : 'hash'
    }

    _clearSlashes (path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    //const routes = [];
}