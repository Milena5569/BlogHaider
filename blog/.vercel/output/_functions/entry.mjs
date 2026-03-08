import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_oY2kbUqV.mjs';
import { manifest } from './manifest_CRVewnPi.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/autor/_slug_.astro.mjs');
const _page2 = () => import('./pages/categoria/_slug_.astro.mjs');
const _page3 = () => import('./pages/post/postcard.astro.mjs');
const _page4 = () => import('./pages/post/postcontent.astro.mjs');
const _page5 = () => import('./pages/post/postmeta.astro.mjs');
const _page6 = () => import('./pages/post/_slug_.astro.mjs');
const _page7 = () => import('./pages/search.astro.mjs');
const _page8 = () => import('./pages/tag/_slug_.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/autor/[slug].astro", _page1],
    ["src/pages/categoria/[slug].astro", _page2],
    ["src/pages/post/PostCard.astro", _page3],
    ["src/pages/post/PostContent.astro", _page4],
    ["src/pages/post/PostMeta.astro", _page5],
    ["src/pages/post/[slug].astro", _page6],
    ["src/pages/search.astro", _page7],
    ["src/pages/tag/[slug].astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "fb8f2560-bbe6-4ad4-9166-beee1ce120fd",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
