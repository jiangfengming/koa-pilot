import { Middleware } from 'koa';
declare type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'PURGE';
declare type Route = [method: Method, pattern: string, middleware: Middleware] | [pattern: string, middleware: Middleware];
export default class Router {
    private routes;
    constructor(routes?: Route[]);
    add(method: Method, pattern: string, handler: Middleware): this;
    get(pattern: string, handler: Middleware): this;
    post(pattern: string, handler: Middleware): this;
    put(pattern: string, handler: Middleware): this;
    delete(pattern: string, handler: Middleware): this;
    head(pattern: string, handler: Middleware): this;
    patch(pattern: string, handler: Middleware): this;
    options(pattern: string, handler: Middleware): this;
    trace(pattern: string, handler: Middleware): this;
    purge(pattern: string, handler: Middleware): this;
    find(method: Method, path: string): {
        handler: Middleware;
        params: Record<string, string>;
    } | null;
    middleware: Middleware;
}
export {};
