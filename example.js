const Koa = require('koa')
const Router = require('.')

const app = new Koa()
const router = new Router()

router.get(
  '/user/:username',
  ctx => ctx.body = `hello ${ctx.params.string('username')}. code: ${ctx.queries.int('code')}`
)

router.get('(.*)', ctx => ctx.body = 'hello world')

app.use(router.middleware)
app.listen(3000)
