/* empty css                                     */
import { e as createComponent, m as maybeRenderHead, r as renderTemplate, h as createAstro, g as addAttribute, k as renderComponent } from '../../chunks/astro/server_Bw4UisD-.mjs';
import 'piccolore';
import { e as getPostBySlug, $ as $$BaseLayout, a as getPosts } from '../../chunks/api_hy86F_8o.mjs';
import 'clsx';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const $$Astro$2 = createAstro();
const $$AuthorCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AuthorCard;
  const { name, bio } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-4 items-center border p-4 rounded bg-gray-50"> <div class="w-12 h-12 bg-gray-300 rounded-full"></div> <div> <p class="font-semibold">${name}</p> <p class="text-sm text-gray-600">${bio}</p> </div> </div>`;
}, "E:/projeto-blog/blog/src/components/AuthorCard.astro", void 0);

const $$Astro$1 = createAstro();
const $$TagList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TagList;
  const { tags = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-wrap gap-2 mt-4"> ${tags.map((tag) => renderTemplate`<a${addAttribute(`/tag/${tag}`, "href")} class="text-sm bg-gray-200 px-2 py-1 rounded">
#${tag} </a>`)} </div>`;
}, "E:/projeto-blog/blog/src/components/TagList.astro", void 0);

const supabaseUrl = "https://aempbdtwuibmaxokukpf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlbXBiZHR3dWlibWF4b2t1a3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzA2MjgsImV4cCI6MjA4ODU0NjYyOH0.msDhJO_uf4YbU-bd3sFd5IPr9-dw6awQXxoS-x-sPsk";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function trackEvent(eventType, postSlug = null, metadata = {}) {
  const { error } = await supabase.from('events').insert({
    event_type: eventType,
    post_slug: postSlug,
    metadata,
  });

  if (error) {
    console.error(`Erro ao registrar evento ${eventType}:`, error);
  }
}

function LikeButton({ slug }) {
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadLikes() {
      const { count, error } = await supabase.from("likes").select("*", { count: "exact", head: true }).eq("post_slug", slug);
      if (error) {
        console.error("Erro ao carregar likes:", error);
        return;
      }
      setLikes(count || 0);
    }
    loadLikes();
  }, [slug]);
  async function handleLike() {
    setLoading(true);
    const { error } = await supabase.from("likes").insert({
      post_slug: slug
    });
    if (error) {
      console.error(error);
      alert("Erro ao salvar like");
      setLoading(false);
      return;
    }
    setLikes((prev) => prev + 1);
    setLoading(false);
  }
  return /* @__PURE__ */ jsxs("button", { onClick: handleLike, disabled: loading, children: [
    "❤️ ",
    likes
  ] });
}

function CommentSection({ slug }) {
  const [comments, setComments] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadComments() {
      const { data, error } = await supabase.from("comments").select("*").eq("post_slug", slug).order("created_at", { ascending: false });
      if (error) {
        console.error("Erro ao carregar comentários:", error);
        return;
      }
      setComments(data || []);
    }
    loadComments();
  }, [slug]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) {
      alert("Preencha nome e comentário.");
      return;
    }
    setLoading(true);
    const payload = {
      post_slug: slug,
      author_name: authorName.trim(),
      content: content.trim()
    };
    const { data, error } = await supabase.from("comments").insert(payload).select();
    if (error) {
      console.error("Erro ao salvar comentário:", error);
      alert("Erro ao salvar comentário.");
      setLoading(false);
      return;
    }
    if (data?.length) {
      setComments((prev) => [data[0], ...prev]);
    }
    await trackEvent("comment_created", slug, {
      author_name: authorName.trim()
    });
    setAuthorName("");
    setContent("");
    setLoading(false);
  }
  return /* @__PURE__ */ jsxs("section", { className: "mt-10", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Comentários" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mb-8 space-y-4", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Seu nome",
          value: authorName,
          onChange: (e) => setAuthorName(e.target.value),
          className: "w-full border border-gray-600 bg-transparent px-4 py-3 rounded"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "textarea",
        {
          placeholder: "Escreva seu comentário",
          value: content,
          onChange: (e) => setContent(e.target.value),
          rows: 4,
          className: "w-full border border-gray-600 bg-transparent px-4 py-3 rounded"
        }
      ) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "px-5 py-3 rounded bg-blue-600 text-white disabled:opacity-60",
          children: loading ? "Enviando..." : "Enviar comentário"
        }
      )
    ] }),
    comments.length === 0 ? /* @__PURE__ */ jsx("p", { children: "Nenhum comentário ainda." }) : /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: comments.map((comment) => /* @__PURE__ */ jsxs("li", { className: "border border-gray-700 rounded p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "font-semibold", children: comment.author_name }),
      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mb-2", children: new Date(comment.created_at).toLocaleString("pt-BR") }),
      /* @__PURE__ */ jsx("p", { children: comment.content })
    ] }, comment.id)) })
  ] });
}

function PostViewTracker({ slug }) {
  useEffect(() => {
    trackEvent("post_view", slug);
  }, [slug]);
  return null;
}

const $$Astro = createAstro();
async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({
    params: { slug: post.slug }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const post = await getPostBySlug(slug);
  if (!post) {
    throw new Error("Post n\xE3o encontrado");
  }
  const authorName = typeof post.author === "object" && post.author?.name ? post.author.name : "Autor";
  const authorBio = typeof post.author === "object" && post.author?.bio ? post.author.bio : "";
  const tagNames = Array.isArray(post.tags) ? post.tags.map(
    (tag) => typeof tag === "object" && tag?.name ? tag.name : String(tag)
  ) : [];
  const content = post?.content?.root?.children?.map(
    (block) => block?.children?.map((child) => child?.text || "").join("") || ""
  ).join("\n\n") || "";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article> <h1 class="text-3xl font-bold mb-6">${post.title}</h1> <p class="mb-6">${content}</p> ${renderComponent($$result2, "TagList", $$TagList, { "tags": tagNames })} <div class="mt-6"> ${renderComponent($$result2, "AuthorCard", $$AuthorCard, { "name": authorName, "bio": authorBio })} </div> ${renderComponent($$result2, "LikeButton", LikeButton, { "slug": post.slug, "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/projeto-blog/blog/src/components/LikeButton.jsx", "client:component-export": "default" })} ${renderComponent($$result2, "CommentSection", CommentSection, { "slug": post.slug, "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/projeto-blog/blog/src/components/CommentSection.jsx", "client:component-export": "default" })} ${renderComponent($$result2, "PostViewTracker", PostViewTracker, { "slug": post.slug, "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/projeto-blog/blog/src/components/PostViewTracker.jsx", "client:component-export": "default" })} </article> ` })}`;
}, "E:/projeto-blog/blog/src/pages/post/[slug].astro", void 0);

const $$file = "E:/projeto-blog/blog/src/pages/post/[slug].astro";
const $$url = "/post/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
