# koa-pilot
Just another Koa router. Extends [url-router](https://github.com/jiangfengming/url-router)

## Usage
```js
const Koa = require('koa')
const Router = require('koa-pilot')

const app = new Koa()
const router = new Router()

router.get('*', ctx => ctx.body = 'hello world')
app.use(router.routes)
app.listen(3000)
```


## Constructor
```js
new Router([
  [method?, path, handler, test?],
  ...
])
```

### method
`String.` Optional. HTTP method, case-sensitive. `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`, `TRACE`.

### path
`String` | `RegExp`

#### params
You could define route params in `path`, params are stored in `ctx.params`. for example:

```js
router.get('/people/:username/articles/:articleId', ctx => console.log(ctx.params))
// { username: ..., articleId: ... }
```

#### wildcard
`*` can match any characters. e.g., `/foo*bar` can match `/foowwsdfbar`.

#### RegExp
If you need more power, use RegExp. Capture groups will be set as route params, keys are `$1, $2, ...`.

```js
router.get(/^\/article\/(\d+)$/, ctx => console.log(ctx.params))
// { $1: ... }
```

You can use [named capture groups](http://2ality.com/2017/05/regexp-named-capture-groups.html) introduced in ES2018:
```js
router.get(/^\/article\/(?<id>\d+)$/, ctx => console.log(ctx.params))
// { id: ... }
```

### middleware
`Function`. The middleware to handle the request. If you want to use multiple middleware, you can use
[koa-compose](https://github.com/koajs/compose):

```js
const compose = require('koa-compose')
router.get('/foo', compose([middleware1, middleware2, ...]))
```

### test
`Function.` Optional. Your custom test function to test against the request.
If test function is defined, the route will be matched only if:
1. The request path is matched with route's path
2. The test function is passed (returns `true`)

```js
function test(matchedRoute, ctx) {
  // should return true or false
}
```

`matchedRoute`: `Object`.

```js
{
  method,
  path,
  handler,
  params
}
```

`ctx`: koa request context.

## Define routes
```js
router.add([method = 'GET'], path, middleware, [test])
router.get(path, middleware, [test])
router.post(path, middleware, [test])
router.put(path, middleware, [test])
router.delete(path, middleware, [test])
router.patch(path, middleware, [test])
router.head(path, middleware, [test])
router.options(path, middleware, [test])
router.trace(path, middleware, [test])
```

## router.routes
`Function`. The router middleware.

```js
app.use(router.routes)
```

## License
(MIT)[LICENSE]
