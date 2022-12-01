define("./workbox-7fa6eb91.js", ["exports"], (function(t) {
    "use strict";
    try {
        self["workbox:core:6.1.5"] && _()
    } catch (t) {}
    const e = (t, ...e) => {
        let s = t;
        return e.length > 0 && (s += ` :: ${JSON.stringify(e)}`), s
    };
    class s extends Error {
        constructor(t, s) {
            super(e(t, s)), this.name = t, this.details = s
        }
    }
    try {
        self["workbox:routing:6.1.5"] && _()
    } catch (t) {}
    const n = t => t && "object" == typeof t ? t : {
        handle: t
    };
    class i {
        constructor(t, e, s = "GET") {
            this.handler = n(e), this.match = t, this.method = s
        }
        setCatchHandler(t) {
            this.catchHandler = n(t)
        }
    }
    class r extends i {
        constructor(t, e, s) {
            super((({
                url: e
            }) => {
                const s = t.exec(e.href);
                if (s && (e.origin === location.origin || 0 === s.index)) return s.slice(1)
            }), e, s)
        }
    }
    class o {
        constructor() {
            this.t = new Map, this.i = new Map
        }
        get routes() {
            return this.t
        }
        addFetchListener() {
            self.addEventListener("fetch", (t => {
                const {
                    request: e
                } = t, s = this.handleRequest({
                    request: e,
                    event: t
                });
                s && t.respondWith(s)
            }))
        }
        addCacheListener() {
            self.addEventListener("message", (t => {
                if (t.data && "CACHE_URLS" === t.data.type) {
                    const {
                        payload: e
                    } = t.data, s = Promise.all(e.urlsToCache.map((e => {
                        "string" == typeof e && (e = [e]);
                        const s = new Request(...e);
                        return this.handleRequest({
                            request: s,
                            event: t
                        })
                    })));
                    t.waitUntil(s), t.ports && t.ports[0] && s.then((() => t.ports[0].postMessage(!0)))
                }
            }))
        }
        handleRequest({
            request: t,
            event: e
        }) {
            const s = new URL(t.url, location.href);
            if (!s.protocol.startsWith("http")) return;
            const n = s.origin === location.origin,
                {
                    params: i,
                    route: r
                } = this.findMatchingRoute({
                    event: e,
                    request: t,
                    sameOrigin: n,
                    url: s
                });
            let o = r && r.handler;
            const a = t.method;
            if (!o && this.i.has(a) && (o = this.i.get(a)), !o) return;
            let c;
            try {
                c = o.handle({
                    url: s,
                    request: t,
                    event: e,
                    params: i
                })
            } catch (t) {
                c = Promise.reject(t)
            }
            const h = r && r.catchHandler;
            return c instanceof Promise && (this.o || h) && (c = c.catch((async n => {
                if (h) try {
                    return await h.handle({
                        url: s,
                        request: t,
                        event: e,
                        params: i
                    })
                } catch (t) {
                    n = t
                }
                if (this.o) return this.o.handle({
                    url: s,
                    request: t,
                    event: e
                });
                throw n
            }))), c
        }
        findMatchingRoute({
            url: t,
            sameOrigin: e,
            request: s,
            event: n
        }) {
            const i = this.t.get(s.method) || [];
            for (const r of i) {
                let i;
                const o = r.match({
                    url: t,
                    sameOrigin: e,
                    request: s,
                    event: n
                });
                if (o) return i = o, (Array.isArray(o) && 0 === o.length || o.constructor === Object && 0 === Object.keys(o).length || "boolean" == typeof o) && (i = void 0), {
                    route: r,
                    params: i
                }
            }
            return {}
        }
        setDefaultHandler(t, e = "GET") {
            this.i.set(e, n(t))
        }
        setCatchHandler(t) {
            this.o = n(t)
        }
        registerRoute(t) {
            this.t.has(t.method) || this.t.set(t.method, []), this.t.get(t.method).push(t)
        }
        unregisterRoute(t) {
            if (!this.t.has(t.method)) throw new s("unregister-route-but-not-found-with-method", {
                method: t.method
            });
            const e = this.t.get(t.method).indexOf(t);
            if (!(e > -1)) throw new s("unregister-route-route-not-registered");
            this.t.get(t.method).splice(e, 1)
        }
    }
    let a;
    const c = () => (a || (a = new o, a.addFetchListener(), a.addCacheListener()), a);

    function h(t, e, n) {
        let o;
        if ("string" == typeof t) {
            const s = new URL(t, location.href);
            o = new i((({
                url: t
            }) => t.href === s.href), e, n)
        } else if (t instanceof RegExp) o = new r(t, e, n);
        else if ("function" == typeof t) o = new i(t, e, n);
        else {
            if (!(t instanceof i)) throw new s("unsupported-route-type", {
                moduleName: "workbox-routing",
                funcName: "registerRoute",
                paramName: "capture"
            });
            o = t
        }
        return c().registerRoute(o), o
    }
    try {
        self["workbox:cacheable-response:6.1.5"] && _()
    } catch (t) {}
    class u {
        constructor(t = {}) {
            this.h = t.statuses, this.u = t.headers
        }
        isResponseCacheable(t) {
            let e = !0;
            return this.h && (e = this.h.includes(t.status)), this.u && e && (e = Object.keys(this.u).some((e => t.headers.get(e) === this.u[e]))), e
        }
    }
    const l = {
            googleAnalytics: "googleAnalytics",
            precache: "precache-v2",
            prefix: "workbox",
            runtime: "runtime",
            suffix: "undefined" != typeof registration ? registration.scope : ""
        },
        f = t => [l.prefix, t, l.suffix].filter((t => t && t.length > 0)).join("-"),
        w = t => t || f(l.precache),
        d = t => t || f(l.runtime);

    function p() {
        return (p = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var s = arguments[e];
                for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n])
            }
            return t
        }).apply(this, arguments)
    }

    function y(t, e) {
        const s = new URL(t);
        for (const t of e) s.searchParams.delete(t);
        return s.href
    }
    class g {
        constructor() {
            this.promise = new Promise(((t, e) => {
                this.resolve = t, this.reject = e
            }))
        }
    }
    const R = new Set;
    try {
        self["workbox:strategies:6.1.5"] && _()
    } catch (t) {}

    function m(t) {
        return "string" == typeof t ? new Request(t) : t
    }
    class v {
        constructor(t, e) {
            this.l = {}, Object.assign(this, e), this.event = e.event, this.p = t, this.g = new g, this.R = [], this.m = [...t.plugins], this.v = new Map;
            for (const t of this.m) this.v.set(t, {});
            this.event.waitUntil(this.g.promise)
        }
        async fetch(t) {
            const {
                event: e
            } = this;
            let n = m(t);
            if ("navigate" === n.mode && e instanceof FetchEvent && e.preloadResponse) {
                const t = await e.preloadResponse;
                if (t) return t
            }
            const i = this.hasCallback("fetchDidFail") ? n.clone() : null;
            try {
                for (const t of this.iterateCallbacks("requestWillFetch")) n = await t({
                    request: n.clone(),
                    event: e
                })
            } catch (t) {
                throw new s("plugin-error-request-will-fetch", {
                    thrownError: t
                })
            }
            const r = n.clone();
            try {
                let t;
                t = await fetch(n, "navigate" === n.mode ? void 0 : this.p.fetchOptions);
                for (const s of this.iterateCallbacks("fetchDidSucceed")) t = await s({
                    event: e,
                    request: r,
                    response: t
                });
                return t
            } catch (t) {
                throw i && await this.runCallbacks("fetchDidFail", {
                    error: t,
                    event: e,
                    originalRequest: i.clone(),
                    request: r.clone()
                }), t
            }
        }
        async fetchAndCachePut(t) {
            const e = await this.fetch(t),
                s = e.clone();
            return this.waitUntil(this.cachePut(t, s)), e
        }
        async cacheMatch(t) {
            const e = m(t);
            let s;
            const {
                cacheName: n,
                matchOptions: i
            } = this.p, r = await this.getCacheKey(e, "read"), o = p({}, i, {
                cacheName: n
            });
            s = await caches.match(r, o);
            for (const t of this.iterateCallbacks("cachedResponseWillBeUsed")) s = await t({
                cacheName: n,
                matchOptions: i,
                cachedResponse: s,
                request: r,
                event: this.event
            }) || void 0;
            return s
        }
        async cachePut(t, e) {
            const n = m(t);
            var i;
            await (i = 0, new Promise((t => setTimeout(t, i))));
            const r = await this.getCacheKey(n, "write");
            if (!e) throw new s("cache-put-with-no-response", {
                url: (o = r.url, new URL(String(o), location.href).href.replace(new RegExp(`^${location.origin}`), ""))
            });
            var o;
            const a = await this.q(e);
            if (!a) return !1;
            const {
                cacheName: c,
                matchOptions: h
            } = this.p, u = await self.caches.open(c), l = this.hasCallback("cacheDidUpdate"), f = l ? await async function(t, e, s, n) {
                const i = y(e.url, s);
                if (e.url === i) return t.match(e, n);
                const r = p({}, n, {
                        ignoreSearch: !0
                    }),
                    o = await t.keys(e, r);
                for (const e of o)
                    if (i === y(e.url, s)) return t.match(e, n)
            }(u, r.clone(), ["__WB_REVISION__"], h) : null;
            try {
                await u.put(r, l ? a.clone() : a)
            } catch (t) {
                throw "QuotaExceededError" === t.name && await async function() {
                    for (const t of R) await t()
                }(), t
            }
            for (const t of this.iterateCallbacks("cacheDidUpdate")) await t({
                cacheName: c,
                oldResponse: f,
                newResponse: a.clone(),
                request: r,
                event: this.event
            });
            return !0
        }
        async getCacheKey(t, e) {
            if (!this.l[e]) {
                let s = t;
                for (const t of this.iterateCallbacks("cacheKeyWillBeUsed")) s = m(await t({
                    mode: e,
                    request: s,
                    event: this.event,
                    params: this.params
                }));
                this.l[e] = s
            }
            return this.l[e]
        }
        hasCallback(t) {
            for (const e of this.p.plugins)
                if (t in e) return !0;
            return !1
        }
        async runCallbacks(t, e) {
            for (const s of this.iterateCallbacks(t)) await s(e)
        }* iterateCallbacks(t) {
            for (const e of this.p.plugins)
                if ("function" == typeof e[t]) {
                    const s = this.v.get(e),
                        n = n => {
                            const i = p({}, n, {
                                state: s
                            });
                            return e[t](i)
                        };
                    yield n
                }
        }
        waitUntil(t) {
            return this.R.push(t), t
        }
        async doneWaiting() {
            let t;
            for (; t = this.R.shift();) await t
        }
        destroy() {
            this.g.resolve()
        }
        async q(t) {
            let e = t,
                s = !1;
            for (const t of this.iterateCallbacks("cacheWillUpdate"))
                if (e = await t({
                        request: this.request,
                        response: e,
                        event: this.event
                    }) || void 0, s = !0, !e) break;
            return s || e && 200 !== e.status && (e = void 0), e
        }
    }
    class q {
        constructor(t = {}) {
            this.cacheName = d(t.cacheName), this.plugins = t.plugins || [], this.fetchOptions = t.fetchOptions, this.matchOptions = t.matchOptions
        }
        handle(t) {
            const [e] = this.handleAll(t);
            return e
        }
        handleAll(t) {
            t instanceof FetchEvent && (t = {
                event: t,
                request: t.request
            });
            const e = t.event,
                s = "string" == typeof t.request ? new Request(t.request) : t.request,
                n = "params" in t ? t.params : void 0,
                i = new v(this, {
                    event: e,
                    request: s,
                    params: n
                }),
                r = this.U(i, s, e);
            return [r, this.L(r, i, s, e)]
        }
        async U(t, e, n) {
            let i;
            await t.runCallbacks("handlerWillStart", {
                event: n,
                request: e
            });
            try {
                if (i = await this._(e, t), !i || "error" === i.type) throw new s("no-response", {
                    url: e.url
                })
            } catch (s) {
                for (const r of t.iterateCallbacks("handlerDidError"))
                    if (i = await r({
                            error: s,
                            event: n,
                            request: e
                        }), i) break;
                if (!i) throw s
            }
            for (const s of t.iterateCallbacks("handlerWillRespond")) i = await s({
                event: n,
                request: e,
                response: i
            });
            return i
        }
        async L(t, e, s, n) {
            let i, r;
            try {
                i = await t
            } catch (r) {}
            try {
                await e.runCallbacks("handlerDidRespond", {
                    event: n,
                    request: s,
                    response: i
                }), await e.doneWaiting()
            } catch (t) {
                r = t
            }
            if (await e.runCallbacks("handlerDidComplete", {
                    event: n,
                    request: s,
                    response: i,
                    error: r
                }), e.destroy(), r) throw r
        }
    }

    function U(t, e) {
        const s = e();
        return t.waitUntil(s), s
    }
    try {
        self["workbox:precaching:6.1.5"] && _()
    } catch (t) {}

    function L(t) {
        if (!t) throw new s("add-to-cache-list-unexpected-type", {
            entry: t
        });
        if ("string" == typeof t) {
            const e = new URL(t, location.href);
            return {
                cacheKey: e.href,
                url: e.href
            }
        }
        const {
            revision: e,
            url: n
        } = t;
        if (!n) throw new s("add-to-cache-list-unexpected-type", {
            entry: t
        });
        if (!e) {
            const t = new URL(n, location.href);
            return {
                cacheKey: t.href,
                url: t.href
            }
        }
        const i = new URL(n, location.href),
            r = new URL(n, location.href);
        return i.searchParams.set("__WB_REVISION__", e), {
            cacheKey: i.href,
            url: r.href
        }
    }
    class b {
        constructor() {
            this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({
                request: t,
                state: e
            }) => {
                e && (e.originalRequest = t)
            }, this.cachedResponseWillBeUsed = async ({
                event: t,
                state: e,
                cachedResponse: s
            }) => {
                if ("install" === t.type) {
                    const t = e.originalRequest.url;
                    s ? this.notUpdatedURLs.push(t) : this.updatedURLs.push(t)
                }
                return s
            }
        }
    }
    class C {
        constructor({
            precacheController: t
        }) {
            this.cacheKeyWillBeUsed = async ({
                request: t,
                params: e
            }) => {
                const s = e && e.cacheKey || this.C.getCacheKeyForURL(t.url);
                return s ? new Request(s) : t
            }, this.C = t
        }
    }
    let x, N;
    async function E(t, e) {
        let n = null;
        if (t.url) {
            n = new URL(t.url).origin
        }
        if (n !== self.location.origin) throw new s("cross-origin-copy-response", {
            origin: n
        });
        const i = t.clone(),
            r = {
                headers: new Headers(i.headers),
                status: i.status,
                statusText: i.statusText
            },
            o = e ? e(r) : r,
            a = function() {
                if (void 0 === x) {
                    const t = new Response("");
                    if ("body" in t) try {
                        new Response(t.body), x = !0
                    } catch (t) {
                        x = !1
                    }
                    x = !1
                }
                return x
            }() ? i.body : await i.blob();
        return new Response(a, o)
    }
    class O extends q {
        constructor(t = {}) {
            t.cacheName = w(t.cacheName), super(t), this.N = !1 !== t.fallbackToNetwork, this.plugins.push(O.copyRedirectedCacheableResponsesPlugin)
        }
        async _(t, e) {
            const s = await e.cacheMatch(t);
            return s || (e.event && "install" === e.event.type ? await this.O(t, e) : await this.k(t, e))
        }
        async k(t, e) {
            let n;
            if (!this.N) throw new s("missing-precache-entry", {
                cacheName: this.cacheName,
                url: t.url
            });
            return n = await e.fetch(t), n
        }
        async O(t, e) {
            this.T();
            const n = await e.fetch(t);
            if (!await e.cachePut(t, n.clone())) throw new s("bad-precaching-response", {
                url: t.url,
                status: n.status
            });
            return n
        }
        T() {
            let t = null,
                e = 0;
            for (const [s, n] of this.plugins.entries()) n !== O.copyRedirectedCacheableResponsesPlugin && (n === O.defaultPrecacheCacheabilityPlugin && (t = s), n.cacheWillUpdate && e++);
            0 === e ? this.plugins.push(O.defaultPrecacheCacheabilityPlugin) : e > 1 && null !== t && this.plugins.splice(t, 1)
        }
    }
    O.defaultPrecacheCacheabilityPlugin = {
        cacheWillUpdate: async ({
            response: t
        }) => !t || t.status >= 400 ? null : t
    }, O.copyRedirectedCacheableResponsesPlugin = {
        cacheWillUpdate: async ({
            response: t
        }) => t.redirected ? await E(t) : t
    };
    class k {
        constructor({
            cacheName: t,
            plugins: e = [],
            fallbackToNetwork: s = !0
        } = {}) {
            this.W = new Map, this.K = new Map, this.P = new Map, this.p = new O({
                cacheName: w(t),
                plugins: [...e, new C({
                    precacheController: this
                })],
                fallbackToNetwork: s
            }), this.install = this.install.bind(this), this.activate = this.activate.bind(this)
        }
        get strategy() {
            return this.p
        }
        precache(t) {
            this.addToCacheList(t), this.S || (self.addEventListener("install", this.install), self.addEventListener("activate", this.activate), this.S = !0)
        }
        addToCacheList(t) {
            const e = [];
            for (const n of t) {
                "string" == typeof n ? e.push(n) : n && void 0 === n.revision && e.push(n.url);
                const {
                    cacheKey: t,
                    url: i
                } = L(n), r = "string" != typeof n && n.revision ? "reload" : "default";
                if (this.W.has(i) && this.W.get(i) !== t) throw new s("add-to-cache-list-conflicting-entries", {
                    firstEntry: this.W.get(i),
                    secondEntry: t
                });
                if ("string" != typeof n && n.integrity) {
                    if (this.P.has(t) && this.P.get(t) !== n.integrity) throw new s("add-to-cache-list-conflicting-integrities", {
                        url: i
                    });
                    this.P.set(t, n.integrity)
                }
                if (this.W.set(i, t), this.K.set(i, r), e.length > 0) {
                    const t = `Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
                    console.warn(t)
                }
            }
        }
        install(t) {
            return U(t, (async () => {
                const e = new b;
                this.strategy.plugins.push(e);
                for (const [e, s] of this.W) {
                    const n = this.P.get(s),
                        i = this.K.get(e),
                        r = new Request(e, {
                            integrity: n,
                            cache: i,
                            credentials: "same-origin"
                        });
                    await Promise.all(this.strategy.handleAll({
                        params: {
                            cacheKey: s
                        },
                        request: r,
                        event: t
                    }))
                }
                const {
                    updatedURLs: s,
                    notUpdatedURLs: n
                } = e;
                return {
                    updatedURLs: s,
                    notUpdatedURLs: n
                }
            }))
        }
        activate(t) {
            return U(t, (async () => {
                const t = await self.caches.open(this.strategy.cacheName),
                    e = await t.keys(),
                    s = new Set(this.W.values()),
                    n = [];
                for (const i of e) s.has(i.url) || (await t.delete(i), n.push(i.url));
                return {
                    deletedURLs: n
                }
            }))
        }
        getURLsToCacheKeys() {
            return this.W
        }
        getCachedURLs() {
            return [...this.W.keys()]
        }
        getCacheKeyForURL(t) {
            const e = new URL(t, location.href);
            return this.W.get(e.href)
        }
        async matchPrecache(t) {
            const e = t instanceof Request ? t.url : t,
                s = this.getCacheKeyForURL(e);
            if (s) {
                return (await self.caches.open(this.strategy.cacheName)).match(s)
            }
        }
        createHandlerBoundToURL(t) {
            const e = this.getCacheKeyForURL(t);
            if (!e) throw new s("non-precached-url", {
                url: t
            });
            return s => (s.request = new Request(t), s.params = p({
                cacheKey: e
            }, s.params), this.strategy.handle(s))
        }
    }
    const T = () => (N || (N = new k), N);
    class W extends i {
        constructor(t, e) {
            super((({
                request: s
            }) => {
                const n = t.getURLsToCacheKeys();
                for (const t of function*(t, {
                        ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/],
                        directoryIndex: s = "index.html",
                        cleanURLs: n = !0,
                        urlManipulation: i
                    } = {}) {
                        const r = new URL(t, location.href);
                        r.hash = "", yield r.href;
                        const o = function(t, e = []) {
                            for (const s of [...t.searchParams.keys()]) e.some((t => t.test(s))) && t.searchParams.delete(s);
                            return t
                        }(r, e);
                        if (yield o.href, s && o.pathname.endsWith("/")) {
                            const t = new URL(o.href);
                            t.pathname += s, yield t.href
                        }
                        if (n) {
                            const t = new URL(o.href);
                            t.pathname += ".html", yield t.href
                        }
                        if (i) {
                            const t = i({
                                url: r
                            });
                            for (const e of t) yield e.href
                        }
                    }(s.url, e)) {
                    const e = n.get(t);
                    if (e) return {
                        cacheKey: e
                    }
                }
            }), t.strategy)
        }
    }
    t.CacheFirst = class extends q {
        async _(t, e) {
            let n, i = await e.cacheMatch(t);
            if (!i) try {
                i = await e.fetchAndCachePut(t)
            } catch (t) {
                n = t
            }
            if (!i) throw new s("no-response", {
                url: t.url,
                error: n
            });
            return i
        }
    }, t.CacheableResponsePlugin = class {
        constructor(t) {
            this.cacheWillUpdate = async ({
                response: t
            }) => this.D.isResponseCacheable(t) ? t : null, this.D = new u(t)
        }
    }, t.clientsClaim = function() {
        self.addEventListener("activate", (() => self.clients.claim()))
    }, t.precacheAndRoute = function(t, e) {
        ! function(t) {
            T().precache(t)
        }(t),
        function(t) {
            const e = T();
            h(new W(e, t))
        }(e)
    }, t.registerRoute = h
}));
//# sourceMappingURL=workbox-7fa6eb91.js.map