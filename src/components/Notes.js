import React, { useContext, useRef , useState , useEffect} from "react";
import NoteContext from "../context/notes/notesContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";


export default function Notes() {
  const { notes , editNote , fetchAllNotes} = useContext(NoteContext);
  
  let navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchAllNotes();
    }else{
      navigate('/login');
    } 
    // eslint-disable-next-line
  }, []);

  
  const ref = useRef(null);

  const [currentNote , setCurrentNote] = useState({ _id :"" ,title : "" , description : "" , tag :"default"});

  const updateNoteModal = (currentNote) => {
    setCurrentNote(currentNote);
     ref.current.click();
  };

  const handleClick = (e) => {
    editNote( currentNote._id , currentNote.title , currentNote.description  , currentNote.tag);
    ref.current.click();
  };

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNotes />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                    value={currentNote.title}
                    onChange={onChange}
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
                    value={currentNote.description}
                    onChange={onChange}
                    name="description"
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
                    value={currentNote.tag}
                    onChange={onChange}
                    name="tag"
                  />
                </div>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick} disabled={currentNote.title.length<5 || currentNote.description.length<5}>
                UPDATE NOTE
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 && <div className="container" >No Notes Found!</div>}
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNoteModal={updateNoteModal}
            />
          );
        })}
      </div>
    </>
  );
}
