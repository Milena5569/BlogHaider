import { supabase } from './supabase'

export async function trackEvent(eventType, postSlug = null, metadata = {}) {
  const { error } = await supabase.from('events').insert({
    event_type: eventType,
    post_slug: postSlug,
    metadata,
  })

  if (error) {
    console.error(`Erro ao registrar evento ${eventType}:`, error)
  }
}