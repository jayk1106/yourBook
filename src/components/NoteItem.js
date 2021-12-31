import React,{useContext} from "react";
import noteContext from "../context/notes/notesContext";

export default function NoteItem(props) {
  const { title, description, tag , _id , time} = props.note;

  const t = new Date(time);
  const {deleteNote } = useContext(noteContext);
  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-header">{tag}</div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div  className="btn btn-primary" onClick={()=> props.updateNoteModal(props.note)}>
          <i className="fas fa-user-edit"></i>
          </div>
          <div className="btn btn-danger mx-2" onClick={()=>deleteNote(_id)}>
          <i className="fas fa-trash-alt"></i>
          </div>
        </div>
        <div className="card-footer text-muted">
    {`${t.getDate()}/${t.getMonth()}/${t.getFullYear()}`}
  </div>
      </div>
      </div>
  );
}
