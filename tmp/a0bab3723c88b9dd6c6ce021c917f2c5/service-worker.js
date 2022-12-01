import {
    registerRoute as workbox_routing_registerRoute
} from '/home/runner/work/qrcodescan.in/qrcodescan.in/node_modules/workbox-routing/registerRoute.mjs';
import {
    CacheableResponsePlugin as workbox_cacheable_response_CacheableResponsePlugin
} from '/home/runner/work/qrcodescan.in/qrcodescan.in/node_modules/workbox-cacheable-response/CacheableResponsePlugin.mjs';
import {
    CacheFirst as workbox_strategies_CacheFirst
} from '/home/runner/work/qrcodescan.in/qrcodescan.in/node_modules/workbox-strategies/CacheFirst.mjs';
import {
    clientsClaim as workbox_core_clientsClaim
} from '/home/runner/work/qrcodescan.in/qrcodescan.in/node_modules/workbox-core/clientsClaim.mjs';
import {
    precacheAndRoute as workbox_precaching_precacheAndRoute
} from '/home/runner/work/qrcodescan.in/qrcodescan.in/node_modules/workbox-precaching/precacheAndRoute.mjs';
/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */








self.skipWaiting();

workbox_core_clientsClaim();


/**
 * The precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
workbox_precaching_precacheAndRoute([{
        "url": "bundle.css",
        "revision": "f1aadc1172896d1fd2c50d8ee8337a61"
    },
    {
        "url": "bundle.js",
        "revision": "bb15b2a8465e0a7808c6192a6cb695ee"
    },
    {
        "url": "index.html",
        "revision": "c8d0fcaf42baeb2d792137e63c62662f"
    }
], {});




workbox_routing_registerRoute(/https:\/\/qrcodescan.in\//, new workbox_strategies_CacheFirst({
    "cacheName": "pages",
    plugins: [new workbox_cacheable_response_CacheableResponsePlugin({
        statuses: [200]
    })]
}), 'GET');