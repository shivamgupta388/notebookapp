import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;
    
  return (
    
    <div className="card mx-3 my-3" style={{ width: "18rem" }}>
   
    <div className="card-body">
      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">
       { note.description}
      </p>
      <i className="far fa-trash-alt mx-2" onClick={()=>{
        deleteNote(note._id)
      }}></i>
      <i className="far fa-edit" mx-2 onClick={()=>updateNote(note)}></i>
    </div>
  </div>
  
  
  )
}

export default NoteItem
