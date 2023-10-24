import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  let navigate = useNavigate();
  const handleLogOut = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      Navbar
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
       
      </ul>{
        !localStorage.getItem('token')?
        (<form className='d-flex '>
      <Link className='btn btn-primary mx-3' to ="/login" role='button'>Login</Link>
      <Link className='btn btn-primary mx-3' to ="/SignUp" role='button'>Sign Up</Link>

      </form>) :<button className="btn btn-primary" onClick={handleLogOut}> Logout</button>

      }
     
    
    </div>
  </div>
</nav>

 
  )
}

export default NavBar
