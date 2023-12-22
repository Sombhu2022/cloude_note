import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../../App";
import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({});
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
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div>
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

        <Link to={'/sign up'}>registration</Link>
      </form>

    </div>
  );
}

export default Login;
