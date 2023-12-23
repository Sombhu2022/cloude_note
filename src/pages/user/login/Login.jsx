import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../../App";
import { Link, useNavigate } from "react-router-dom";
import './login.scss'

function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate()
  const dataHandaler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandaler = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password)
      return toast.error("fill all requirment fill");

    try {
      const data = await axios.post(`${baseUrl}/user/login`, user, {
        headers: { Content_type: "application/json" },
        withCredentials: true,
      });
      // console.log(data);
      toast.success(data.message);
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }
  };

  return (
    <div className="login_container">
      <form action="">
        <input
          type="text"
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
        <button
          type="submit"
          className="primary_button"
          onClick={submitHandaler}
        >
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
