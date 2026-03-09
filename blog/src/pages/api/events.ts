import type { APIRoute } from 'astro'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL

const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados.')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const allowedEvents = ['post_view', 'post_like', 'comment_created']

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()

    const eventType = body?.event_type
    const postSlug = body?.post_slug || null
    const visitorId = body?.visitor_id || null
    const metadata = body?.metadata || {}

    if (!allowedEvents.includes(eventType)) {
      return new Response(JSON.stringify({ error: 'Evento inválido.' }), {
        status: 400,
      })
    }

    const { error } = await supabase.from('analytics_events').insert([
      {
        event_type: eventType,
        post_slug: postSlug,
        visitor_id: visitorId,
        metadata,
      },
    ])

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message || 'Erro interno.' }),
      {
        status: 500,
      }
    )
  }
}