import { useState } from "react";

export default function CommentSection() {

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  function addComment() {
    if (!text) return;

    setComments([...comments, text]);
    setText("");
  }

  return (
    <div className="mt-8">

      <h3 className="text-lg font-bold mb-2">
        Comentários
      </h3>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 flex-1"
        />

        <button
          onClick={addComment}
          className="bg-black text-white px-3"
        >
          Enviar
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {comments.map((c, i) => (
          <li key={i} className="border p-2">{c}</li>
        ))}
      </ul>

    </div>
  );
}