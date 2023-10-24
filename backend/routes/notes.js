const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require("express-validator"); 

// -----------FetchAllNotes------------

router.get('/fetchAllNotes', fetchUser,async(req,res)=>{
    try {
        const notes = await Notes.find({User:req.User.id});
        res.json(notes);
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    

})

// -------------add Notes------------- 

router.post('/addNotes', fetchUser,
    body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 5 })
, async (req,res)=>{
    

    try {

        const {title, description,tag} = req.body;
       
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    

    const note = new Notes({
        title, description , tag, User:req.User.id
    })
    console.log(title, description, tag);
    const savedNote = await note.save();

    res.json(savedNote);

        
    } catch (error) {
        
        res.send(error);
    }
    
 

})

// ---------update note------------
router.put('/updatenote/:id', fetchUser, async(req,res)=>{
    const {title, description, tag} = req.body;

    try {
          // create a newNote object
    const newNote = {};
    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tag){
        newNote.tag = tag;
    }

    // find the note to be update 
    const note =await  Notes.findById(req.params.id)

    if(!note){
       return res.status(404).send("Not Found");
    }

    if(note.User.toString() !== req.User.id){
        return res.status(401).send("Not Allowed");
    }

   const  updatedNotes = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true});
   res.json({updatedNotes});
        
    } catch (error) {
        res.send(error);
    }
  
})

//------------deleteNote---------------
router.delete('/deleteNote/:id', fetchUser, async(req,res)=>{
    const {title, description, tag} = req.body;

   try {
    // find the note to be update 
    const note =await  Notes.findById(req.params.id)

    if(!note){
       return res.status(404).send("Not Found");
    }

    if(note.User.toString() !== req.User.id){
        return res.status(401).send("Not Allowed");
    }

    const deletedNote = await Notes.findByIdAndDelete(req.params.id)

    res.json({"success": "Note has been deleted", Note: deletedNote});
   } catch (error) {

    res.send(error);
    
   }

    

 
})

module.exports = router;