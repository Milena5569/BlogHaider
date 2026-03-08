import 'piccolore';
import { o as decodeKey } from './chunks/astro/server_Bw4UisD-.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CtZJcpUP.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///E:/projeto-blog/blog/","cacheDir":"file:///E:/projeto-blog/blog/node_modules/.astro/","outDir":"file:///E:/projeto-blog/blog/dist/","srcDir":"file:///E:/projeto-blog/blog/src/","publicDir":"file:///E:/projeto-blog/blog/public/","buildClientDir":"file:///E:/projeto-blog/blog/dist/client/","buildServerDir":"file:///E:/projeto-blog/blog/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.D-gxWs2D.css"}],"routeData":{"route":"/autor/[slug]","isIndex":false,"type":"page","pattern":"^\\/autor\\/([^/]+?)\\/?$","segments":[[{"content":"autor","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/autor/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.D-gxWs2D.css"}],"routeData":{"route":"/categoria/[slug]","isIndex":false,"type":"page","pattern":"^\\/categoria\\/([^/]+?)\\/?$","segments":[[{"content":"categoria","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/categoria/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.D-gxWs2D.css"}],"routeData":{"route":"/post/postcard","isIndex":false,"type":"page","pattern":"^\\/post\\/PostCard\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"PostCard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/PostCard.astro","pathname":"/post/PostCard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.D-gxWs2D.css"}],"routeData":{"route":"/post/postcontent","isIndex":false,"type":"page","pattern":"^\\/post\\/PostContent\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"PostContent","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/PostContent.astro","pathname":"/post/PostContent","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.D-gxWs2D.css"}],"routeData":{"route":"/post/postmeta","isIndex":false,"type":"page","pattern":"^\\/post\\/PostMeta\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"PostMeta","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/post/PostMeta.astro","pathname":"/post/PostMeta","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.D-gxWs2D.css"}],"routeData":{"route":"/post/[slug]","isIndex":false,"type":"page","pattern":"^\\/post\\/([^/]+?)\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/post/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.D-gxWs2D.css"}],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.D-gxWs2D.css"}],"routeData":{"route":"/tag/[slug]","isIndex":false,"type":"page","pattern":"^\\/tag\\/([^/]+?)\\/?$","segments":[[{"content":"tag","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/tag/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.D-gxWs2D.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["E:/projeto-blog/blog/src/pages/autor/[slug].astro",{"propagation":"none","containsHead":true}],["E:/projeto-blog/blog/src/pages/categoria/[slug].astro",{"propagation":"none","containsHead":true}],["E:/projeto-blog/blog/src/pages/index.astro",{"propagation":"none","containsHead":true}],["E:/projeto-blog/blog/src/pages/post/[slug].astro",{"propagation":"none","containsHead":true}],["E:/projeto-blog/blog/src/pages/tag/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/autor/[slug]@_@astro":"pages/autor/_slug_.astro.mjs","\u0000@astro-page:src/pages/categoria/[slug]@_@astro":"pages/categoria/_slug_.astro.mjs","\u0000@astro-page:src/pages/post/PostCard@_@astro":"pages/post/postcard.astro.mjs","\u0000@astro-page:src/pages/post/PostContent@_@astro":"pages/post/postcontent.astro.mjs","\u0000@astro-page:src/pages/post/PostMeta@_@astro":"pages/post/postmeta.astro.mjs","\u0000@astro-page:src/pages/post/[slug]@_@astro":"pages/post/_slug_.astro.mjs","\u0000@astro-page:src/pages/search@_@astro":"pages/search.astro.mjs","\u0000@astro-page:src/pages/tag/[slug]@_@astro":"pages/tag/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CRVewnPi.mjs","E:/projeto-blog/blog/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CNcParQc.mjs","E:/projeto-blog/blog/src/components/LikeButton.jsx":"_astro/LikeButton.Bt7p9EJr.js","E:/projeto-blog/blog/src/components/CommentSection.jsx":"_astro/CommentSection.CuBBgVt1.js","E:/projeto-blog/blog/src/components/PostViewTracker.jsx":"_astro/PostViewTracker.C3iyhUwR.js","@astrojs/react/client.js":"_astro/client.Dc9Vh3na.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.D-gxWs2D.css","/favicon.svg","/images/logo.png","/images/placeholder.png","/tdahblog/colors.css","/tdahblog/spacing.css","/tdahblog/typography.css","/_astro/analytics.knf5wh4O.js","/_astro/client.Dc9Vh3na.js","/_astro/CommentSection.CuBBgVt1.js","/_astro/index.DiEladB3.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/LikeButton.Bt7p9EJr.js","/_astro/PostViewTracker.C3iyhUwR.js","/_astro/supabase.D_CsuZYY.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"JE0Y57LWG9h5hNuz7f8MeAT1h3WThXtgDYSs8k75sCI="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
