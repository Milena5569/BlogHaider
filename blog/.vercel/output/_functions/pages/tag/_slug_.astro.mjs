/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_Bw4UisD-.mjs';
import 'piccolore';
import { f as getTagBySlug, a as getPosts, $ as $$BaseLayout, h as getTags } from '../../chunks/api_hy86F_8o.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const tags = await getTags();
  return tags.map((tag) => ({
    params: { slug: tag.slug }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const tag = await getTagBySlug(slug);
  if (!tag) {
    throw new Error("Tag n\xE3o encontrada");
  }
  const posts = await getPosts();
  const filteredPosts = posts.filter((post) => {
    if (!Array.isArray(post.tags)) return false;
    return post.tags.some((item) => {
      if (typeof item === "object") {
        return item.slug === slug;
      }
      return false;
    });
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-3xl font-bold mb-6">Tag: ${tag.name}</h1> ${filteredPosts.length === 0 ? renderTemplate`<p>Nenhum post encontrado com esta tag.</p>` : renderTemplate`<ul> ${filteredPosts.map((post) => renderTemplate`<li class="mb-2"> <a${addAttribute(`/post/${post.slug}`, "href")}>${post.title}</a> </li>`)} </ul>`}` })}`;
}, "E:/projeto-blog/blog/src/pages/tag/[slug].astro", void 0);

const $$file = "E:/projeto-blog/blog/src/pages/tag/[slug].astro";
const $$url = "/tag/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
