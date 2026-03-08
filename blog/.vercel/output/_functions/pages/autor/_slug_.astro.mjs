/* empty css                                     */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_Bw4UisD-.mjs';
import 'piccolore';
import { g as getAuthorBySlug, a as getPosts, b as getAuthors, $ as $$BaseLayout } from '../../chunks/api_hy86F_8o.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    params: { slug: author.slug }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const author = await getAuthorBySlug(slug);
  if (!author) {
    throw new Error("Autor n\xE3o encontrado");
  }
  const posts = await getPosts();
  const filteredPosts = posts.filter((post) => {
    if (!post.author) return false;
    if (typeof post.author === "object") {
      return post.author.slug === slug;
    }
    return false;
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-3xl font-bold mb-2">Autor: ${author.name}</h1> <p class="mb-6">${author.bio}</p> ${filteredPosts.length === 0 ? renderTemplate`<p>Nenhum post encontrado deste autor.</p>` : renderTemplate`<ul> ${filteredPosts.map((post) => renderTemplate`<li class="mb-2"> <a${addAttribute(`/post/${post.slug}`, "href")}>${post.title}</a> </li>`)} </ul>`}` })}`;
}, "E:/projeto-blog/blog/src/pages/autor/[slug].astro", void 0);

const $$file = "E:/projeto-blog/blog/src/pages/autor/[slug].astro";
const $$url = "/autor/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
