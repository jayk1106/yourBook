import NoteContext from "./notesContext";
import { useState , useContext } from "react";
import alertContext from "../alerts/alertContext";

const NoteState = (props) => {
  const host = "http://localhost:4000";
  
  const {showAlert} = useContext(alertContext);

  const [notes, setNotes] = useState([]);

  // Fetch All Notes
  const fetchAllNotes = async () => {
    // API CALL
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const allNotes = await response.json();
    setNotes(allNotes);
  };

  // Add Note
  const addNote = async ({ title, description, tag }) => {
    // API CALL
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    if (note.title) {
      setNotes(notes.concat(note));
      showAlert('Node Added Successfully' , 'success');
    }else{
      showAlert('Somthing Wrong, Try Again' , 'warning');
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
    });
    const note = await response.json();
    if(note.success){
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
      showAlert('Node Deleted Successfully' , 'success');
    }else{
      showAlert('Somthing Wrong, Try Again' , 'warning');
    }
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const updatedNote = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    if (updatedNote.title) {
      for(let i=0 ; i<newNotes.length ; i++){
        if (newNotes[i]._id === id) {
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      showAlert('Node Edited Successfully' , 'success');
    }else{
      showAlert('Somthing Wrong, Try Again' , 'warning');
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote , fetchAllNotes , setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
