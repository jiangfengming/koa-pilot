const Router = require('url-router')

module.exports = class extends Router {
  constructor(routes) {
    super(routes)
    this.routes = this.routes.bind(this)
  }

  routes(ctx, next) {
    const route = this.find(ctx.method, ctx.path, ctx)

    if (!route) {
      ctx.params = {}
      return next()
    } else {
      ctx.params = route.params
      return route.handler(ctx, next)
    }
  }
}
