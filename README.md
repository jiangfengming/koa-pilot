# koa-pilot
Just another Koa router. Extends [url-router](https://github.com/jiangfengming/url-router)

## Usage
```js
const Koa = require('koa')
const Router = require('koa-pilot')

const app = new Koa()
const router = new Router()

router.get('/user/:username', ctx => ctx.body = `hello ${ctx.params.string('username')}. code: ${ctx.queries.int('code')}`)
router.get('*', ctx => ctx.body = 'hello world')
app.use(router.routes)
app.listen(3000)
```

## Constructor
```js
new Router([
  [method?, path, middleware],
  ...
])
```

### method
`String.` Optional. HTTP method, case-sensitive. `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`, `TRACE`.

### path
`String` | `RegExp`

#### params
You could define route params in `path`, params are stored in `ctx.params` as a [StringCaster](https://github.com/jiangfengming/cast-string#stringcaster) object.
For example:

```js
router.get('/people/:username/articles/:articleId', ctx => {
  ctx.body = `username: ${ctx.params.string('username')}. articleId: ${ctx.params.int('articleId')}`
})
```

#### wildcard
`*` can match any characters. e.g., `/foo*bar` can match `/foowwsdfbar`.

#### RegExp
If you need more power, use RegExp. Capture groups will be set as route params, keys are `$1, $2, ...`.

```js
router.get(/^\/article\/(\d+)$/, ctx => console.log(ctx.params.int('$1')))
```

You can use [named capture groups](http://2ality.com/2017/05/regexp-named-capture-groups.html) introduced in ES2018:
```js
router.get(/^\/article\/(?<id>\d+)$/, ctx => console.log(ctx.params.int('id')))
```

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

## router.routes
`Function`. The router middleware.

```js
app.use(router.routes)
```

## ctx.queries
Wraps `ctx.query` as a [StringCaster](https://github.com/jiangfengming/cast-string#stringcaster) object.

## License
(MIT)[LICENSE]
