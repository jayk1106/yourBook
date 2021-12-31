import React, { useContext , useState } from 'react'
import noteContext from '../context/notes/notesContext'

export default function AddNotes() {

    const {addNote} = useContext(noteContext);

    const [note , setNote] = useState({title : "" , description : "" , tag :"Default"});

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({title : "" , description : "" , tag :"Default"});
    }

    const onChange = (e) => {
        setNote({...note , [e.target.name] : e.target.value});
    }

    return (
        <div>
            <div className="container my-3">
        <h1>Add New Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
            Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              name="title"
              onChange={onChange}
              value={note.title}
              minLength={5}
              required
            />

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              onChange={onChange}
              name="description"
              value={note.description}
              minLength={5}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              onChange={onChange}
              name="tag"
              value={note.tag}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length<5 || note.description.length<5}>
            ADD NOTE
          </button>
        </form>
      </div>
        </div>
    )
}
