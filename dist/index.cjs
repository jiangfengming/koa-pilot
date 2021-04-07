'use strict';

var URLRouter = require('url-router');
var castString = require('cast-string');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var URLRouter__default = /*#__PURE__*/_interopDefaultLegacy(URLRouter);

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE', 'PURGE'];
class Router {
    constructor(routes) {
        this.routes = {};
        this.middleware = (ctx, next) => {
            const route = this.find(ctx.method, ctx.path);
            if (route) {
                ctx.params = new castString.StringCaster(route.params);
                ctx.queries = new castString.StringCaster(() => ctx.query);
                return route.handler(ctx, next);
            }
            else {
                return next();
            }
        };
        this.middleware = this.middleware.bind(this);
        methods.forEach(method => this.routes[method] = new URLRouter__default['default']());
        if (routes) {
            routes.forEach(route => {
                if (route.length === 2) {
                    this.add('GET', ...route);
                }
                else {
                    this.add(...route);
                }
            });
        }
    }
    add(method, pattern, handler) {
        this.routes[method]?.add(pattern, handler);
        return this;
    }
    get(pattern, handler) {
        return this.add('GET', pattern, handler);
    }
    post(pattern, handler) {
        return this.add('POST', pattern, handler);
    }
    put(pattern, handler) {
        return this.add('PUT', pattern, handler);
    }
    delete(pattern, handler) {
        return this.add('DELETE', pattern, handler);
    }
    head(pattern, handler) {
        return this.add('HEAD', pattern, handler);
    }
    patch(pattern, handler) {
        return this.add('PATCH', pattern, handler);
    }
    options(pattern, handler) {
        return this.add('OPTIONS', pattern, handler);
    }
    trace(pattern, handler) {
        return this.add('TRACE', pattern, handler);
    }
    purge(pattern, handler) {
        return this.add('PURGE', pattern, handler);
    }
    find(method, path) {
        return this.routes[method]?.find(path) || null;
    }
}

module.exports = Router;
