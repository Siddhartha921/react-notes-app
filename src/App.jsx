import { useEffect, useState } from "react";

import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [searchText, setSearchText] = useState("");

  const [editingNote, setEditingNote] = useState(null);

  function handleAddNote(newNote) {
    const noteWithId = {
      id: Date.now(),
      ...newNote,
    };

    setNotes([...notes, noteWithId]);
  }

  function handleDeleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function handleEditNote(note) {
    setEditingNote(note);
  }

  function handleUpdateNote(updatedNote) {
    setNotes(
      notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );

    setEditingNote(null);
  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = notes.filter((note) => {
    const search = searchText.toLowerCase();

    return (
      note.title.toLowerCase().includes(search) ||
      note.content.toLowerCase().includes(search)
    );
  });

  return (
    <div className="app-container">
      <h1>My Notes</h1>

      <NoteForm
        onAddNote={handleAddNote}
        editingNote={editingNote}
        onUpdateNote={handleUpdateNote}
      />

      <input
        className="search-input"
        type="text"
        placeholder="Search notes..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <NoteList
        notes={filteredNotes}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
      />
    </div>
  );
}

export default App;