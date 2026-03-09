import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getOrCreateVisitorId, trackEvent } from "../lib/analytics";

export default function LikeButton({ slug }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadLikes() {
      if (!slug) return;

      const visitorId = getOrCreateVisitorId();

      const { count, error: countError } = await supabase
        .from("post_likes")
        .select("*", { count: "exact", head: true })
        .eq("post_slug", slug);

      if (countError) {
        console.error("Erro ao carregar total de likes:", countError.message);
      } else {
        setLikesCount(count || 0);
      }

      const { data, error: likedError } = await supabase
        .from("post_likes")
        .select("id")
        .eq("post_slug", slug)
        .eq("visitor_id", visitorId)
        .maybeSingle();

      if (likedError) {
        console.error("Erro ao verificar like:", likedError.message);
      } else {
        setLiked(!!data);
      }
    }

    loadLikes();
  }, [slug]);

  async function handleLike() {
    if (!slug || liked || loading) return;

    setLoading(true);

    try {
      const visitorId = getOrCreateVisitorId();

      const { error } = await supabase.from("post_likes").insert([
        {
          post_slug: slug,
          visitor_id: visitorId,
        },
      ]);

      if (error) {
        console.error("Erro ao curtir:", error.message);
        return;
      }

      setLiked(true);
      setLikesCount((prev) => prev + 1);

      trackEvent("post_like", slug);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleLike} disabled={liked || loading}>
      {liked ? `Curtido ❤️ (${likesCount})` : `Curtir ❤️ (${likesCount})`}
    </button>
  );
}