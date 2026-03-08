import { e as createComponent, l as renderHead, n as renderSlot, r as renderTemplate } from './astro/server_Bw4UisD-.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="pt-br"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Meu Blog</title>${renderHead()}</head> <body class="bg-gray-100 text-gray-900"> <header class="bg-white shadow p-4"> <div class="max-w-4xl mx-auto"> <h1 class="text-2xl font-bold">Meu Blog</h1> </div> </header> <main class="max-w-4xl mx-auto p-6"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-white border-t p-4 text-center text-sm text-gray-500">
© 2026 Meu Blog
</footer> </body></html>`;
}, "E:/projeto-blog/blog/src/layouts/BaseLayout.astro", void 0);

const CMS_URL = 'http://localhost:3000/api';

async function getPosts() {
  const res = await fetch(`${CMS_URL}/posts?depth=2&limit=100`);

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
  }

  const data = await res.json();
  return data.docs || []
}

async function getPostBySlug(slug) {
  const res = await fetch(
    `${CMS_URL}/posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch post by slug: ${res.status} ${res.statusText}`)
  }

  const data = await res.json();
  return data.docs?.[0] || null
}

async function getCategories() {
  const res = await fetch(`${CMS_URL}/categories?limit=100`);

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`)
  }

  const data = await res.json();
  return data.docs || []
}

async function getCategoryBySlug(slug) {
  const res = await fetch(
    `${CMS_URL}/categories?where[slug][equals]=${encodeURIComponent(slug)}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch category by slug: ${res.status} ${res.statusText}`)
  }

  const data = await res.json();
  return data.docs?.[0] || null
}

async function getAuthors() {
  const res = await fetch(`${CMS_URL}/authors?limit=100`);

  if (!res.ok) {
    throw new Error(`Failed to fetch authors: ${res.status} ${res.statusText}`)
  }

  const data = await res.json();
  return data.docs || []
}

async function getAuthorBySlug(slug) {
  const res = await fetch(
    `${CMS_URL}/authors?where[slug][equals]=${encodeURIComponent(slug)}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch author by slug: ${res.status} ${res.statusText}`)
  }

  const data = await res.json();
  return data.docs?.[0] || null
}

async function getTags() {
  const res = await fetch(`${CMS_URL}/tags?limit=100`);

  if (!res.ok) {
    throw new Error(`Failed to fetch tags: ${res.status} ${res.statusText}`)
  }

  const data = await res.json();
  return data.docs || []
}

async function getTagBySlug(slug) {
  const res = await fetch(
    `${CMS_URL}/tags?where[slug][equals]=${encodeURIComponent(slug)}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch tag by slug: ${res.status} ${res.statusText}`)
  }

  const data = await res.json();
  return data.docs?.[0] || null
}

export { $$BaseLayout as $, getPosts as a, getAuthors as b, getCategoryBySlug as c, getCategories as d, getPostBySlug as e, getTagBySlug as f, getAuthorBySlug as g, getTags as h };
