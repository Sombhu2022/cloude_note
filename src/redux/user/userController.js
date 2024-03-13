import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../App";

export const createUser = createAsyncThunk("user/createUser" , async(data)=>{
    
        const user = await axios.post(`${baseUrl}/user/reg` , data ,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
         console.log(user);
         
        return user.data;
} )

export const logInUser = createAsyncThunk("user/loginUser" , async({email , password})=>{
    const user = await axios.post(`${baseUrl}/user/login` , {email , password},{
				headers:{
					"Content-Type":"application/json"
				},
				withCredentials:true
			})
    return user.data        
})