import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../../App";
import { useNavigate } from "react-router-dom";

import img from './dp.png'
import imgPlaceHolder from './img.svg'

import './register.scss'

import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../redux/user/userController";
import { UseSelector } from "react-redux";

import Loader from 'react-js-loader'


function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();

  const [dp, setDp] = useState(img);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state)=>state.user)
 console.log(state.status);
  const fileHandle = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // if (reader.readyState === 2) {
      setDp(reader.result);
      // }
    };
    reader.readAsDataURL(file);
  };

  if(state.status === "regSuccess"){
       navigate('/')
  }
 

  const submitHandaler =async (e) => {
    e.preventDefault();
    if (!email || !password || !cPassword)
      return toast.error("fill all requirment fill");
    if (password.length < 8)
      return toast.error("password must be 8 digit or more");
    if (password !== cPassword)
      return toast.error("password and confirm password are not matched");

     try {
      
       const data = new FormData();
       data.append("dp", dp);
       data.set("name", name);
       data.set("email", email);
       data.set("password", password);
   
      dispatch(createUser(data));
     } catch (error) {
       console.log(error);
     }finally{
       
      //  navigate('/')
     }
  };


  return (
    <div className="main_div reg_container">
      <form action="">
      <b  style={{ fontSize: "25px" , color:"purple" }}>Registration form </b>
        <label className="primary_input label" htmlFor="file">
           <div className="img-container">
            <img src={dp} alt="" />
           </div>
           <div className="img-input">
            <img src={imgPlaceHolder} alt="" />
           <b style={{color:"#CB3CFF"}}>Click to upload image</b> svg, jpg , jpeg or gif file .
           </div>
        </label>

        <input style={{display:"none"}} type="file" name="" id="file" accept="image/*"
        onChange={fileHandle} />
        
        <input
          className="primary_input"
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e)=>setCPassword(e.target.value)}
        />
        <button
          className="primary_button"
          type="submit"
          onClick={submitHandaler}
        >
          {
            state.status === "pending" ? (<Loader type={"spinner-circle"} color={"black"} size={40}/>):""
          }
          
          sign up
        </button>
      </form>
    </div>
  );
}

export default Register;
