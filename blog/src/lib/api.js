const CMS_URL = 'http://localhost:3000/api'

export async function getPosts() {
  const res = await fetch(`${CMS_URL}/posts?depth=2&limit=100`)

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return data.docs || []
}

export async function getPostBySlug(slug) {
  const res = await fetch(
    `${CMS_URL}/posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2`
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch post by slug: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return data.docs?.[0] || null
}

export async function getCategories() {
  const res = await fetch(`${CMS_URL}/categories?limit=100`)

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return data.docs || []
}

export async function getCategoryBySlug(slug) {
  const res = await fetch(
    `${CMS_URL}/categories?where[slug][equals]=${encodeURIComponent(slug)}`
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch category by slug: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return data.docs?.[0] || null
}

export async function getAuthors() {
  const res = await fetch(`${CMS_URL}/authors?limit=100`)

  if (!res.ok) {
    throw new Error(`Failed to fetch authors: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return data.docs || []
}

export async function getAuthorBySlug(slug) {
  const res = await fetch(
    `${CMS_URL}/authors?where[slug][equals]=${encodeURIComponent(slug)}`
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch author by slug: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return data.docs?.[0] || null
}

export async function getTags() {
  const res = await fetch(`${CMS_URL}/tags?limit=100`)

  if (!res.ok) {
    throw new Error(`Failed to fetch tags: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return data.docs || []
}

export async function getTagBySlug(slug) {
  const res = await fetch(
    `${CMS_URL}/tags?where[slug][equals]=${encodeURIComponent(slug)}`
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch tag by slug: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return data.docs?.[0] || null
}