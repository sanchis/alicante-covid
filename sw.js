if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const o=e=>i(e,t),r={module:{uri:t},exports:c,require:o};s[t]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(a(...e),c)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/268-caeca126dc00e7f7.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/chunks/721-4cf6228487d12c6e.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/chunks/main-677f24a59d1b7ffe.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/chunks/pages/_app-622956e3059c7b71.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/chunks/pages/index-e9bdd048962177a9.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/chunks/pages/municipios/%5Bid%5D-38b7751745912132.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/chunks/webpack-cb7634a8b6194820.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/css/3a900f179461bf66.css",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/css/c3318f5a222b6aaa.css",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/m61Ui6SKGkJ1A8bK6UtKs/_buildManifest.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/m61Ui6SKGkJ1A8bK6UtKs/_middlewareManifest.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/_next/static/m61Ui6SKGkJ1A8bK6UtKs/_ssgManifest.js",revision:"m61Ui6SKGkJ1A8bK6UtKs"},{url:"/apple-touch-icon.png",revision:"d9dd573a609d9c506540114116eb5c5c"},{url:"/favicon.ico",revision:"543c5c4f40f5d359f5576555658caca3"},{url:"/icon-144x144.png",revision:"6d0d52effedfefbfa68c8ce4f47d8e34"},{url:"/icon-16x16.png",revision:"3c347e6f2a58f4e3d5321fb34c1ad6a9"},{url:"/icon-192x192.png",revision:"c72def84ab2e60a6837836e061311b6d"},{url:"/icon-256x256.png",revision:"cc657b093feb9fd1cdaec0d3d9ae7bef"},{url:"/icon-32x32.png",revision:"e7094a4448874e76cf8396d6e1af3d8c"},{url:"/icon-36x36.png",revision:"0792a9bccedbfd3e92d62afdfbc75446"},{url:"/icon-384x384.png",revision:"cfad70cfe28773f364cb5f1ab8d92d84"},{url:"/icon-48x48.png",revision:"668575166a49371a2ed1f619cca26289"},{url:"/icon-512x512.png",revision:"81fb13b5b78766823c3e72728c05c1a0"},{url:"/icon-72x72.png",revision:"b95db5b516ab5f7ee90d4d75547143b5"},{url:"/icon-96x96.png",revision:"ac0315ae4bddf36e41c87caaeafd7fdc"},{url:"/logo.png",revision:"d32ab3b98a6df8a288a12c4092e33e97"},{url:"/logo.svg",revision:"b0aae983e73a6d3b2298e7c2c7f2df2d"},{url:"/manifest.json",revision:"b925aedabebb45030ab3179e125dc82e"},{url:"/oglogo.png",revision:"9015b7b4efcac98f75d59f7a1dd6d910"},{url:"/robots.txt",revision:"fc1decd534fa1af78ebfbcecf9afd258"},{url:"/sitemap-0.xml",revision:"48704ea9257e879c62b4bf5463f65a7d"},{url:"/sitemap.xml",revision:"7ac49048111a55846ac49f03ca708412"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
