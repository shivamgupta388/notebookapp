import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(NoteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({id:"", title:"", description:"", tag:""})
  useEffect(() => {
    if(localStorage.getItem('token')){
        getNotes();

    }
    else{
   navigate('/login');
    }
    
  }, []);

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id, title:currentnote.title, description:currentnote.description, tag:currentnote.tag});
  };
  const ref = useRef(null);
  const refclose = useRef(null);

  const handleClick = (e)=>{
    console.log("updating the note", note);
    editNote(note.id, note.title, note.description, note.tag);
    refclose.current.click();
   
  
  }
  const onchange =(e)=>{
       setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <AddNote></AddNote>
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
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    minLength={5} required
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
                    name="description"
                    value={note.description}
                    onChange={onchange}
                    minLength={5} required
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
                    name="tag"
                    value={note.tag}
                    onChange={onchange}
                    minLength={5} required
                  />
                </div>
               
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refclose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}
              disabled={note.title.length<5 || note.description.length < 5}
              >
                update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>YOUR NOTES</h2>
        {notes.length ===0 && 'No notes To display'}
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
