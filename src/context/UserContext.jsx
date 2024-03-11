import React, { useState } from 'react'
import { toast } from "react-toastify";
import { baseUrl } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { createContext, useContext} from "react";

export const UserAPI = createContext({})

export const  useUser =()=>{
  return useContext(UserAPI)
}

function UserContext(props) {
    const [user , setUser]= useState({
   
    }) 
   
    // const navigate = useNavigate();
    
    const AddUser=async()=>{
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
           toast.success(data.data.message) 
          //  navigate('/')
          setUser({name:"som" , "id":2030})
        } catch (error) {
           toast.error(error.response.data.message || error.message) 
          //  console.log(error)
       }
    
    }


  return (
    <UserAPI.Provider value={{user , setUser , AddUser}}>
     {props.children}
   </UserAPI.Provider>
  )
}

export default UserContext