function getVisitorId() {
  const key = 'blog_visitor_id'
  let visitorId = localStorage.getItem(key)

  if (!visitorId) {
    visitorId = crypto.randomUUID()
    localStorage.setItem(key, visitorId)
  }

  return visitorId
}

export async function trackEvent(eventType, postSlug, metadata = {}) {
  try {
    const visitorId = getVisitorId()

    await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: eventType,
        post_slug: postSlug,
        visitor_id: visitorId,
        metadata,
      }),
    })
  } catch (error) {
    console.error('Erro ao registrar evento:', error)
  }
}

export function getOrCreateVisitorId() {
  return getVisitorId()
}