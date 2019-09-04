const Router = require('url-router')
const { StringCaster } = require('cast-string')

module.exports = class extends Router {
  constructor(routes) {
    super(routes)
    this.routes = this.routes.bind(this)
  }

  routes(ctx, next) {
    const route = this.find(ctx.method, ctx.path)

    if (!route) {
      return next()
    } else {
      ctx.params = route.params
      ctx.queries = new StringCaster(() => ctx.query)
      return route.handler(ctx, next)
    }
  }
}
