import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { trackEvent } from "../lib/analytics"

export default function LikeButton({ slug }) {
  const [likes, setLikes] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadLikes() {
      const { count, error } = await supabase
        .from("likes")
        .select("*", { count: "exact", head: true })
        .eq("post_slug", slug)

      if (error) {
        console.error("Erro ao carregar likes:", error)
        return
      }

      setLikes(count || 0)
    }

    loadLikes()
  }, [slug])

   async function handleLike() {
    setLoading(true)

    const { error } = await supabase
      .from("likes")
      .insert({
        post_slug: slug,
      })

    if (error) {
      console.error(error)
      alert("Erro ao salvar like")
      setLoading(false)
      return
    }

    setLikes((prev) => prev + 1)
    setLoading(false)
  }

  return (
    <button onClick={handleLike} disabled={loading}>
      ❤️ {likes}
    </button>
  )
}