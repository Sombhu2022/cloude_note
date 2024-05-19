import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../App";
import API from "../../utils/axiosSetup";

export const createUser = createAsyncThunk("user/createUser" , async(data)=>{
       console.log(data);
        const user = await API.post(`${baseUrl}/user/reg` , data ,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
         console.log(user);
         
        return user.data;
} )

export const logInUser = createAsyncThunk("user/logInUser" , async(data)=>{

  try {
    
    const user = await API.post(`${baseUrl}/user/login` , data ,{
				headers:{
					"Content-Type":"application/json"
				},
				withCredentials:true
			})
      console.log(user);
      return user.data        
  } catch (error) {
     console.log(error);
  }
})


export const authUser = createAsyncThunk("user/authUser" , async()=>{
    const { data } = await API.get(`${baseUrl}/user/`, {
        headers: { Content_type: "application/json" },
        withCredentials: true,
      });
    return data        
})


export const logoutUser = createAsyncThunk("user/logoutUser" , async()=>{
    const { data } = await API.get(`${baseUrl}/user/logout`, {
        headers: {
          Content_type: "application/json",
        },
        withCredentials: true,
      });
    return data        
})