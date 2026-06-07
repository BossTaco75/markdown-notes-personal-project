import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function App() {
  // State for the notes list
  const [notes, setNotes] = useState([]);

  // State for the new note form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');

  // Fetch notes when the page loads
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios.get('http://localhost:5000/api/notes')
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the notes!", error);
      });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing when you click submit

    // Convert comma-separated tags into a clean array
    const tagsArray = newTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    const newNote = {
      title: newTitle,
      content: newContent,
      tags: tagsArray
    };


    // Send the new note to your backend
    axios.post('http://localhost:5000/api/notes/add', newNote)
      .then(response => {
        console.log("Success:", response.data);
        fetchNotes(); // Instantly refresh the list to show the new note

        // Clear the form inputs
        setNewTitle('');
        setNewContent('');
        setNewTags('');
      })
      .catch(error => console.error("Error adding note!", error));
  };

  //handles deleteing 
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      axios.delete(`http://localhost:5000/api/notes/${id}`)
        .then(response => {
          console.log(response.data);
          fetchNotes(); // Refresh the list instantly
        })
        .catch(error => console.error("Error deleting note!", error));
    }
  };
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>My Markdown Notes</h1>

      {/* --- CREATE NOTE FORM --- */}
      <div style={{ backgroundColor: '#f4f4f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0 }}>Create a New Note</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Note Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <textarea
            placeholder="Write your markdown here... (e.g., # Heading, **bold text**)"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            required
            rows="5"
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'monospace' }}
          />
          <input
            type="text"
            placeholder="Tags (comma separated, e.g., react, backend, ideas)"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '1rem', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Save Note
          </button>
        </form>
      </div>
      {/* ------------------------ */}

      {notes.length === 0 ? (
        <p>No notes found. Create your first one above!</p>
      ) : (
        notes.map(note => (
          <div key={note._id} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '15px', borderRadius: '8px', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginTop: 0 }}>{note.title}</h2>

            <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px', border: '1px solid #eee' }}>
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>

            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: 0, marginTop: '15px' }}>
              <strong>Tags:</strong> {note.tags.length > 0 ? note.tags.join(', ') : 'None'}
            </p>
            <button
              onClick={() => handleDelete(note._id)}
              style={{ marginTop: '15px', padding: '5px 10px', backgroundColor: '#DC3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Delete Note
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;