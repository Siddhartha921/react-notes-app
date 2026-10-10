import { useEffect, useState } from "react";

function NoteForm({
  onAddNote,
  editingNote,
  onUpdateNote,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    if (editingNote) {
      onUpdateNote({
        id: editingNote.id,
        title: title.trim(),
        content: content.trim(),
      });
    } else {
      onAddNote({
        title: title.trim(),
        content: content.trim(),
      });
    }

    setTitle("");
    setContent("");
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{editingNote ? "Edit Note" : "Add Note"}</h2>

      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">
        {editingNote ? "Update Note" : "Add Note"}
      </button>

      {editingNote && (
        <button
          type="button"
          className="cancel-button"
          onClick={() => {
            onUpdateNote(editingNote);
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default NoteForm;