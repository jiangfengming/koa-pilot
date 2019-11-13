# koa-pilot
Just another Koa router.

## Usage
```js
const Koa = require('koa')
const Router = require('koa-pilot')

const app = new Koa()
const router = new Router()

router.get(
  '/user/:username',
  ctx => ctx.body = `hello ${ctx.params.string('username')}. code: ${ctx.queries.int('code')}`
)

router.get('(.*)', ctx => ctx.body = 'hello world')

app.use(router.middleware)
app.listen(3000)
```

## Constructor
```js
new Router(
  [method?, pattern, middleware],
  ...
)
```

### method
`String.` Optional. HTTP method, case-sensitive. `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`, `TRACE`.

### pattern
See [url-router#pattern](https://github.com/jiangfengming/url-router#pattern).

params defined in `pattern` are stored in `ctx.params` as a [StringCaster](https://github.com/jiangfengming/cast-string#stringcaster) object.

### middleware
`Function`. The middleware to handle the request. If you want to use multiple middleware, you can use
[koa-compose](https://github.com/koajs/compose):

```js
const compose = require('koa-compose')
router.get('/foo', compose([middleware1, middleware2, ...]))
```

## Define routes
```js
router.add([method = 'GET'], path, middleware)
router.get(path, middleware)
router.post(path, middleware)
router.put(path, middleware)
router.delete(path, middleware)
router.patch(path, middleware)
router.head(path, middleware)
router.options(path, middleware)
router.trace(path, middleware)
```

## router.middleware
`Function`. The router middleware.

```js
app.use(router.middleware)
```

## ctx.queries
Wraps `ctx.query` as a [StringCaster](https://github.com/jiangfengming/cast-string#stringcaster) object.

## License
(MIT)[LICENSE]
