
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';


const router = createBrowserRouter([
  {
    path :'/',
    element :<Layout/>,
    children:[
      {
        path:"/",
        element:<></>
      },
      {
        path:"/home",
        element:<Home/>
      },
      {
        path:"about",
        element:<About />
      },{
        path :"login",
        element:<Login/>
      },
      {
        path:"SignUp",
        element:<SignUp/>
      }
    ]
  }
])


function App() {
  return (
    <NoteState>
   <RouterProvider router = {router}/>
   </NoteState>
  );
}

export default App;
