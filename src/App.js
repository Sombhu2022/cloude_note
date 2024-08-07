import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import './global.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/user/registration/Register";
import Login from "./pages/user/login/Login";
import View from "./pages/note/show/View";
import AddNote from "./pages/note/post/AddNote";
import Edit from "./pages/note/edit/Edit";
import ProfilePage from "./pages/user/profile/ProfilePage";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authUser } from "./redux/user/userController";
import { allNote } from "./redux/note/noteController";

function App() {

  const dispatch = useDispatch()
 

   useEffect(()=>{
      dispatch(authUser())
   } , [])


  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Router>
        <Routes>
          <Route path="/" element={<View/>}></Route>
          <Route path="/post" element={<AddNote/>}></Route>
          <Route path="/sign up" element={<Register />}></Route>
          <Route path="/edit/:id" element={<Edit/>}></Route>
          <Route path="/log in" element={<Login />}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//  export const baseUrl = "https://note-api-cbkb.onrender.com" 

// export const baseUrl = "http://localhost:8080"
export const baseUrl = "https://notebook-api.vercel.app"






