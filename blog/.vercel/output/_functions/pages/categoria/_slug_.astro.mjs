/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_Bw4UisD-.mjs';
import 'piccolore';
import { c as getCategoryBySlug, a as getPosts, $ as $$BaseLayout, d as getCategories } from '../../chunks/api_hy86F_8o.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const categories = await getCategories();
  return categories.map((category) => ({
    params: { slug: category.slug }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    throw new Error("Categoria n\xE3o encontrada");
  }
  const posts = await getPosts();
  const filteredPosts = posts.filter((post) => {
    if (!post.category) return false;
    if (typeof post.category === "object") {
      return post.category.slug === slug;
    }
    return false;
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-3xl font-bold mb-6">Categoria: ${category.name}</h1> ${filteredPosts.length === 0 ? renderTemplate`<p>Nenhum post encontrado nesta categoria.</p>` : renderTemplate`<ul> ${filteredPosts.map((post) => renderTemplate`<li class="mb-2"> <a${addAttribute(`/post/${post.slug}`, "href")}>${post.title}</a> </li>`)} </ul>`}` })}`;
}, "E:/projeto-blog/blog/src/pages/categoria/[slug].astro", void 0);

const $$file = "E:/projeto-blog/blog/src/pages/categoria/[slug].astro";
const $$url = "/categoria/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
