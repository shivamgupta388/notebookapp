import react, { useState } from "react";
import NoteContext
 from "./NoteContext";

 const NoteState = (props)=>{
    const host = "http://localhost:5000"
   const notesinitial = []

   const [notes, setNotes] = useState(notesinitial)
  // get all notes
  const getNotes =async()=>{

    const response = await fetch(`${host}/api/notes/fetchAllNotes`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        }

        

       
    })

    const json = await  response.json();

    console.log(json)
    setNotes(json);
    

   }


   // Add a note 
   const addNote =async(title, description, tag)=>{

    const response = await fetch(`${host}/api/notes/addNotes`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title, description, tag})
    })

    const json =await  response.json();

   
    setNotes(notes.concat(json));

   }
   // delete A note
   const deleteNote = async(_id)=>{
    const response = await fetch(`${host}/api/notes/deleteNote/${_id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        }
    })

    const json = response.json();
    console.log(json);
     console.log("delete the node", _id);
    const notesAfterDeletion =  notes.filter((note)=>{
        return note._id !== _id;

     })

     setNotes(notesAfterDeletion);
   }
   // edit a note
   const editNote = async(id, title, description, tag)=>{
    console.log(id);
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title, description, tag})
    })

    const json =await  response.json();

    let newnotes = JSON.parse(JSON.stringify(notes));
     for(let index =0;index< newnotes.length;index++){
        const element = newnotes[index];
        if(element._id === id){
            newnotes[index].title = title;
            newnotes[index].description =description;
            newnotes[index].tag= tag;
            break;
        }
     }
     setNotes(newnotes);
     console.log(notes);
   }
    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
 }

 export default NoteState;