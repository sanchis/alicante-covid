if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const o=e=>n(e,i),r={module:{uri:i},exports:t,require:o};s[i]=Promise.all(a.map((e=>r[e]||o(e)))).then((e=>(c(...e),t)))}}define(["./workbox-5f5b08d6"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/135-e9869333d8ed8d5d.js",revision:"e9869333d8ed8d5d"},{url:"/_next/static/chunks/74-1c89ba5b1bd5ac3b.js",revision:"1c89ba5b1bd5ac3b"},{url:"/_next/static/chunks/framework-4556c45dd113b893.js",revision:"4556c45dd113b893"},{url:"/_next/static/chunks/main-1b8097a3d05e58a1.js",revision:"1b8097a3d05e58a1"},{url:"/_next/static/chunks/pages/_app-ff5f5183fb783940.js",revision:"ff5f5183fb783940"},{url:"/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js",revision:"a4ba2246ff8fb532"},{url:"/_next/static/chunks/pages/index-061912997f900f23.js",revision:"061912997f900f23"},{url:"/_next/static/chunks/pages/zone/%5Bid%5D-f469b5db1db210f3.js",revision:"f469b5db1db210f3"},{url:"/_next/static/chunks/polyfills-0d1b80a048d4787e.js",revision:"40ccea369337cec877151c906f22814d"},{url:"/_next/static/chunks/webpack-cb7634a8b6194820.js",revision:"cb7634a8b6194820"},{url:"/_next/static/css/9cd6ede3ee7542c9.css",revision:"9cd6ede3ee7542c9"},{url:"/_next/static/css/ffa2f6a5ab482336.css",revision:"ffa2f6a5ab482336"},{url:"/_next/static/ytfIHmCvAw0XVHsZBa9a3/_buildManifest.js",revision:"0d6cca5d5646723c422423738df91267"},{url:"/_next/static/ytfIHmCvAw0XVHsZBa9a3/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/apple-touch-icon.png",revision:"d9dd573a609d9c506540114116eb5c5c"},{url:"/favicon.ico",revision:"543c5c4f40f5d359f5576555658caca3"},{url:"/icon-144x144.png",revision:"6d0d52effedfefbfa68c8ce4f47d8e34"},{url:"/icon-16x16.png",revision:"3c347e6f2a58f4e3d5321fb34c1ad6a9"},{url:"/icon-192x192.png",revision:"c72def84ab2e60a6837836e061311b6d"},{url:"/icon-256x256.png",revision:"cc657b093feb9fd1cdaec0d3d9ae7bef"},{url:"/icon-32x32.png",revision:"e7094a4448874e76cf8396d6e1af3d8c"},{url:"/icon-36x36.png",revision:"0792a9bccedbfd3e92d62afdfbc75446"},{url:"/icon-384x384.png",revision:"cfad70cfe28773f364cb5f1ab8d92d84"},{url:"/icon-48x48.png",revision:"668575166a49371a2ed1f619cca26289"},{url:"/icon-512x512.png",revision:"81fb13b5b78766823c3e72728c05c1a0"},{url:"/icon-72x72.png",revision:"b95db5b516ab5f7ee90d4d75547143b5"},{url:"/icon-96x96.png",revision:"ac0315ae4bddf36e41c87caaeafd7fdc"},{url:"/logo.png",revision:"d32ab3b98a6df8a288a12c4092e33e97"},{url:"/logo.svg",revision:"b0aae983e73a6d3b2298e7c2c7f2df2d"},{url:"/manifest.json",revision:"b925aedabebb45030ab3179e125dc82e"},{url:"/oglogo.png",revision:"9015b7b4efcac98f75d59f7a1dd6d910"},{url:"/robots.txt",revision:"2d0e1c330f2b5c4ec2200894b11d0529"},{url:"/sitemap-0.xml",revision:"ef3d2b1013ea8cc7c458aaf1c53dcb15"},{url:"/sitemap.xml",revision:"d69f37efcddacadfe04bfaac1551098d"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
