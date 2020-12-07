const Koa = require('koa');
const Router = require('.');

const app = new Koa();

const router = new Router([
  ['GET', '/', ctx => ctx.body = 'hello world'],
  ['/user/:username', ctx => ctx.body = `hello ${ctx.params.string('username')}. code: ${ctx.queries.int('code')}`]
]);

router.get('(.*)', ctx => ctx.body = '404');

app.use(router.middleware);
app.listen(3000);
