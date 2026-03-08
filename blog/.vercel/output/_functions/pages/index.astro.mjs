/* empty css                                  */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_Bw4UisD-.mjs';
import 'piccolore';
import { a as getPosts, $ as $$BaseLayout } from '../chunks/api_hy86F_8o.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getPosts();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h2 class="text-3xl font-bold mb-4">Bem-vindo ao blog</h2> <p class="mb-8">Aqui aparecerão os posts mais recentes.</p> ${posts.length === 0 ? renderTemplate`<p>Nenhum post encontrado.</p>` : renderTemplate`<ul> ${posts.map((post) => renderTemplate`<li> <a${addAttribute(`/post/${post.slug}`, "href")}>${post.title}</a> </li>`)} </ul>`}` })}`;
}, "E:/projeto-blog/blog/src/pages/index.astro", void 0);

const $$file = "E:/projeto-blog/blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
