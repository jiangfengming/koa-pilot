# koa-pilot
Just another Koa router

## Usage
```js
const Koa = require('koa')
const Router = require('koa-pilot')

const app = new Koa()
const router = new Router()

router.get('/', ctx => ctx.body = 'hello world')
app.use(router.routes())
```

## APIs

### Constructor
```js
const router = new Router()
```

### Define routes
```js
router.get(path, ...middleware)
router.post(path, ...middleware)
router.put(path, ...middleware)
router.delete(path, ...middleware)
router.patch(path, ...middleware)
router.head(path, ...middleware)
router.options(path, ...middleware)
router.trace(path, ...middleware)
```

#### path

##### params
You could define route params in `path`, params are stored in `ctx.params`. for example:

```js
router.get('/people/:username/articles/:articleId', ctx => console.log(ctx.params))
// { username: ..., articleId: ... }
```

##### wildcard
`*` can match any characters. e.g., `/foo*bar` can match `/foowwsdfbar`.

##### Regexp
If you need more power, use Regexp. Capture groups will be set as route params, keys are `$1, $2, ...`.

```js
router.get(/^\/article\/(\d+)$/, ctx => console.log(ctx.params))
// { $1: ... }
```

You can use [named capture groups](http://2ality.com/2017/05/regexp-named-capture-groups.html) introduced in ES2018:
```js
router.get(/^\/article\/(?<id>\d+)$/, ctx => console.log(ctx.params))
// { id: ... }
```

#### middleware
One or more middleware to handle the request.

### router.routes()
Returns the router middleware.

```js
app.use(router.routes())
```

## License
(MIT)[LICENSE]
