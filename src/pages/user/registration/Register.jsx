import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../../App";
import { useNavigate } from "react-router-dom";

import './register.scss'

function Register() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dataHandaler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandaler =async (e) => {
    e.preventDefault();
    if (!user) return toast.error("fill the sign up form");
    if (!user.email || !user.password || !user.confirmPassword)
      return toast.error("fill all requirment fill");
    if (user.password.length < 8)
      return toast.error("password must be 8 digit or more");
    if (user.password !== user.confirmPassword)
      return toast.error("password and confirm password are not matched");
   try {
       const data =await axios.post(`${baseUrl}/user/reg` , user ,{
        headers: { Content_type: "application/json" },
        withCredentials: true,
       })
       console.log(data)
       toast.success(data.message) 
       navigate('/')
    } catch (error) {
       toast.error(error.response.data.message || error.message) 
      //  console.log(error)
   }


    
  };

  return (
    <div className="main_div reg_container">
      <form action="">
        
        <input
          className="primary_input"
          type="text"
          name="name"
          placeholder="enter name"
          onChange={dataHandaler}
        />
        <input
          type="email"
          name="email"
          placeholder="enter email"
          onChange={dataHandaler}
        />
        <input
          type="password"
          name="password"
          placeholder="enter password"
          onChange={dataHandaler}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="enter confirm password"
          onChange={dataHandaler}
        />
        <button
          className="primary_button"
          type="submit"
          onClick={submitHandaler}
        >
          sign up
        </button>
      </form>
    </div>
  );
}

export default Register;
