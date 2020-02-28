const Router = require('url-router')
const { StringCaster } = require('cast-string')

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE']

module.exports = class {
  constructor(routes) {
    this.middleware = this.middleware.bind(this)
    this._routes = {}
    methods.forEach(method => this._routes[method] = new Router())

    if (routes) {
      routes.forEach(route => this.add(...route))
    }
  }

  add() {
    if (arguments.length === 2) {
      this._routes.GET.add(arguments[0], arguments[1])
    } else {
      this._routes[arguments[0]].add(arguments[1], arguments[2])
    }

    return this
  }

  get(pattern, middleware) {
    return this.add('GET', pattern, middleware)
  }

  post(pattern, middleware) {
    return this.add('POST', pattern, middleware)
  }

  put(pattern, middleware) {
    return this.add('PUT', pattern, middleware)
  }

  delete(pattern, middleware) {
    return this.add('DELETE', pattern, middleware)
  }

  head(pattern, middleware) {
    return this.add('HEAD', pattern, middleware)
  }

  patch(pattern, middleware) {
    return this.add('PATCH', pattern, middleware)
  }

  options(pattern, middleware) {
    return this.add('OPTIONS', pattern, middleware)
  }

  trace(pattern, middleware) {
    return this.add('TRACE', pattern, middleware)
  }

  find(method, path) {
    return this._routes[method].find(path)
  }

  middleware(ctx, next) {
    const route = this.find(ctx.method, ctx.path)

    if (route) {
      ctx.params = new StringCaster(route.params)
      ctx.queries = new StringCaster(() => ctx.query)
      return route.handler(ctx, next)
    } else {
      return next()
    }
  }
}
