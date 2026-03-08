import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { trackEvent } from "../lib/analytics"

export default function CommentSection({ slug }) {
  const [comments, setComments] = useState([])
  const [authorName, setAuthorName] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadComments() {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_slug", slug)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Erro ao carregar comentários:", error)
        return
      }

      setComments(data || [])
    }

    loadComments()
  }, [slug])

  async function handleSubmit(e) {
    e.preventDefault()

    if (!authorName.trim() || !content.trim()) {
      alert("Preencha nome e comentário.")
      return
    }

    setLoading(true)

    const payload = {
      post_slug: slug,
      author_name: authorName.trim(),
      content: content.trim(),
    }

    const { data, error } = await supabase
      .from("comments")
      .insert(payload)
      .select()

    if (error) {
      console.error("Erro ao salvar comentário:", error)
      alert("Erro ao salvar comentário.")
      setLoading(false)
      return
    }

    if (data?.length) {
      setComments((prev) => [data[0], ...prev])
    }
    await trackEvent("comment_created", slug, {
  author_name: authorName.trim(),})

    setAuthorName("")
    setContent("")
    setLoading(false)
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Comentários</h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Seu nome"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full border border-gray-600 bg-transparent px-4 py-3 rounded"
          />
        </div>

        <div>
          <textarea
            placeholder="Escreva seu comentário"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full border border-gray-600 bg-transparent px-4 py-3 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded bg-blue-600 text-white disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar comentário"}
        </button>
      </form>

      {comments.length === 0 ? (
        <p>Nenhum comentário ainda.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border border-gray-700 rounded p-4">
              <div className="font-semibold">{comment.author_name}</div>
              <div className="text-sm text-gray-400 mb-2">
                {new Date(comment.created_at).toLocaleString("pt-BR")}
              </div>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}