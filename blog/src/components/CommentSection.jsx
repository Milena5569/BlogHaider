import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { trackEvent } from "../lib/analytics";

export default function CommentSection({ slug }) {
  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadComments() {
      if (!slug) return;

      const { data, error } = await supabase
        .from("post_comments")
        .select("*")
        .eq("post_slug", slug)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar comentários:", error.message);
        return;
      }

      setComments(data || []);
    }

    loadComments();
  }, [slug]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!slug || !commentText.trim() || loading) return;

    setLoading(true);

    try {
      const payload = {
        post_slug: slug,
        author_name: authorName.trim() || "Anônimo",
        content: commentText.trim(),
      };

      const { data, error } = await supabase
        .from("post_comments")
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error("Erro ao enviar comentário:", error.message);
        return;
      }

      setComments((prev) => [data, ...prev]);
      setCommentText("");
      setAuthorName("");

      trackEvent("comment_created", slug, {
        comment_length: payload.content.length,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comentários</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Seu nome"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          placeholder="Escreva seu comentário"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full border rounded px-3 py-2 min-h-[120px]"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border rounded"
        >
          {loading ? "Enviando..." : "Enviar comentário"}
        </button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p>Nenhum comentário ainda.</p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="border rounded p-4">
              <strong>{comment.author_name || "Anônimo"}</strong>
              <p className="mt-2">{comment.content}</p>
              <small className="block mt-2 text-gray-500">
                {new Date(comment.created_at).toLocaleDateString("pt-BR")}{" "}
                {new Date(comment.created_at).toLocaleTimeString("pt-BR")}
              </small>
            </article>
          ))
        )}
      </div>
    </section>
  );
}