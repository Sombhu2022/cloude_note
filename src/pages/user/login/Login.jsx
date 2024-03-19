
import React, { useState } from "react";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import './login.scss'

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logInUser } from "../../../redux/user/userController";

import Loader from 'react-js-loader'


function Login() {
  const [email , setEmail]= useState()
  const [password , setPassword]=useState()

  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const state= useSelector((state)=>state.user)

  const submitHandaler = async (e) => {
    e.preventDefault();

    if (!email || !password)
      return toast.error("fill all requirment fill");

    try {
      console.log(email , password);
      dispatch(logInUser({email , password}))
      // console.log(data);
      // toast.success(data.message);
      // navigate('/')
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }
  };

  if(state.status === "loginSuccess"){
    navigate('/')
  }

  return (
    <div className="login_container">
      <form action="">
        <input
          type="text"
          name="email"
          placeholder="enter email"
          onChange={(e)=> setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="enter password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="primary_button"
          onClick={submitHandaler}
        >
           {
            state.status === "pending" ? (<Loader type={"spinner-circle"} color={"black"} size={40}/>):""
          }
          
          Log in
        </button>
        <br />
        <br />
       

        if you not register, then click 
        <Link to={'/sign up'}> registration</Link>
        
      </form>

    </div>
  );
}

export default Login;
