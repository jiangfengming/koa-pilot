import URLRouter from 'url-router';
import { StringCaster } from 'cast-string';
import { Middleware } from 'koa';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'PURGE';
type Route = [method: Method, pattern: string, middleware: Middleware] | [pattern: string, middleware: Middleware];

const methods: Method[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE', 'PURGE'];

export default class Router {
  private routes: { [method in Method]?: URLRouter<Middleware> } = {};

  constructor(routes?: Route[]) {
    this.middleware = this.middleware.bind(this);
    methods.forEach(method => this.routes[method] = new URLRouter());

    if (routes) {
      routes.forEach(route => {
        if (route.length === 2) {
          this.add('GET', ...route);
        } else {
          this.add(...route);
        }
      });
    }
  }

  add(method: Method, pattern: string, handler: Middleware): this {
    this.routes[method]?.add(pattern, handler);
    return this;
  }

  get(pattern: string, handler: Middleware): this {
    return this.add('GET', pattern, handler);
  }

  post(pattern: string, handler: Middleware): this {
    return this.add('POST', pattern, handler);
  }

  put(pattern: string, handler: Middleware): this {
    return this.add('PUT', pattern, handler);
  }

  delete(pattern: string, handler: Middleware): this {
    return this.add('DELETE', pattern, handler);
  }

  head(pattern: string, handler: Middleware): this {
    return this.add('HEAD', pattern, handler);
  }

  patch(pattern: string, handler: Middleware): this {
    return this.add('PATCH', pattern, handler);
  }

  options(pattern: string, handler: Middleware): this {
    return this.add('OPTIONS', pattern, handler);
  }

  trace(pattern: string, handler: Middleware): this {
    return this.add('TRACE', pattern, handler);
  }

  purge(pattern: string, handler: Middleware): this {
    return this.add('PURGE', pattern, handler);
  }

  find(method: Method, path: string): { handler: Middleware, params: Record<string, string> } | null {
    return this.routes[method]?.find(path) || null;
  }

  middleware: Middleware = (ctx, next) => {
    const route = this.find(ctx.method as Method, ctx.path);

    if (route) {
      ctx.params = new StringCaster(route.params);
      ctx.queries = new StringCaster(() => ctx.query as Record<string, string | string[]>);
      return route.handler(ctx, next);
    } else {
      return next();
    }
  }
}
