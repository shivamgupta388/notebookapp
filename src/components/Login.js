import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = () => {
   const [credentials, setCredentials] = useState({email:'', password:''})
   const navigate = useNavigate()

    const handleSubmit =async(e)=>{
     e.preventDefault();
     const response = await fetch(`http://localhost:5000/api/auth/authUser`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            
        },
        body:JSON.stringify({email:credentials.email, password:credentials.password
        })
        
        
    })
   
    const json = await response.json();
    console.log(json);
    if(json.success){
        // redirect
        localStorage.setItem('token',json.authToken)
        navigate('/home')
    }else{
        alert("Invalid credentials")
    }

    }
    const onchange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value
        })
       }
  return (
    <div className='container mx-3 my-3'>
    <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="email"
      name='email'
      aria-describedby="emailHelp"
      value={credentials.email}
      onChange={onchange}
    />
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">
      Password
    </label>
    <input
      type="password"
      name='password'
      className="form-control"
      id="password"
      value={credentials.password}
      onChange={onchange}
    />
  </div>
  
  <button type="submit" className="btn btn-primary"
 >
    Submit
  </button>
</form>
</div>

  )
}

export default Login
