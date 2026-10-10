import NoteItem from "./NoteItem";

function NoteList({
  notes,
  onDeleteNote,
  onEditNote,
}) {
  return (
    <div className="note-list">
      <h2>Notes</h2>

      {notes.length === 0 ? (
        <p className="empty-state">
          No notes found.
        </p>
      ) : (
        notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDeleteNote={onDeleteNote}
            onEditNote={onEditNote}
          />
        ))
      )}
    </div>
  );
}

export default NoteList;