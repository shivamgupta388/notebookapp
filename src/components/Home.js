import React, { useContext } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Notes from './Notes'




const Home = () => {
  
   
  return (
   <div>
    <div className="container my-3">
    <h2>Add A note</h2>
      
 <Notes></Notes>
 </div>

    </div>
  )
}

export default Home
