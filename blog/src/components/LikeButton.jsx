import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
    >
      ❤️ {likes}
    </button>
  );
}