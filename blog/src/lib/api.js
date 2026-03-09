const CMS_BASE_URL = (import.meta.env.PUBLIC_PAYLOAD_URL || 'http://localhost:3000').replace(/\/$/, '')
const CMS_URL = `${CMS_BASE_URL}/api`

async function fetchCMS(path) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const res = await fetch(`${CMS_URL}${path}`, {
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) {
      console.error(`CMS request failed: ${res.status} ${res.statusText} - ${path}`)
      return null
    }

    return await res.json()
  } catch (error) {
    console.error(`CMS fetch error for ${path}:`, error)
    return null
  }
}

export async function getPosts() {
  const data = await fetchCMS('/posts?depth=2&limit=100&sort=-publishedDate')
  return data?.docs || []
}

export async function getPostBySlug(slug) {
  const data = await fetchCMS(
    `/posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2`
  )
  return data?.docs?.[0] || null
}

export async function getCategories() {
  const data = await fetchCMS('/categories?limit=100&sort=name')
  return data?.docs || []
}

export async function getCategoryBySlug(slug) {
  const data = await fetchCMS(
    `/categories?where[slug][equals]=${encodeURIComponent(slug)}`
  )
  return data?.docs?.[0] || null
}

export async function getAuthors() {
  const data = await fetchCMS('/authors?limit=100&sort=name')
  return data?.docs || []
}

export async function getAuthorBySlug(slug) {
  const data = await fetchCMS(
    `/authors?where[slug][equals]=${encodeURIComponent(slug)}`
  )
  return data?.docs?.[0] || null
}

export async function getTags() {
  const data = await fetchCMS('/tags?limit=100&sort=name')
  return data?.docs || []
}

export async function getTagBySlug(slug) {
  const data = await fetchCMS(
    `/tags?where[slug][equals]=${encodeURIComponent(slug)}`
  )
  return data?.docs?.[0] || null
}