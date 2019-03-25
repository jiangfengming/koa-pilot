const URLRouter = require('url-router')
const compose = require('koa-compose')

module.exports = class Router {
  constructor() {
    this._urlRouter = new URLRouter()
  }

  get(path, ...middleware) {
    this._urlRouter.get(path, compose(middleware))
    return this
  }

  post(path, ...middleware) {
    this._urlRouter.post(path, compose(middleware))
    return this
  }

  put(path, ...middleware) {
    this._urlRouter.put(path, compose(middleware))
    return this
  }

  delete(path, ...middleware) {
    this._urlRouter.delete(path, compose(middleware))
    return this
  }

  patch(path, ...middleware) {
    this._urlRouter.patch(path, compose(middleware))
    return this
  }

  head(path, ...middleware) {
    this._urlRouter.head(path, compose(middleware))
    return this
  }

  options(path, ...middleware) {
    this._urlRouter.options(path, compose(middleware))
    return this
  }

  trace(path, ...middleware) {
    this._urlRouter.trace(path, compose(middleware))
    return this
  }

  routes() {
    return (ctx, next) => {
      const route = this._urlRouter.find(ctx.method, ctx.path)

      if (!route) {
        ctx.params = {}
        return next()
      } else {
        ctx.params = route.params
        return route.handler(ctx, next)
      }
    }
  }
}
