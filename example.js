const Koa = require('koa')
const Router = require('.')

const app = new Koa()
const router = new Router()

router.get('*', ctx => ctx.body = 'hello world')
app.use(router.routes)
app.listen(3000)
