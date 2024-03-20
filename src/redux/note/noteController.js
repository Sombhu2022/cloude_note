import { createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../utils/axiosSetup";
import { baseUrl } from "../../App";

export const createNote =createAsyncThunk("note/createNote" , async(myData)=>{
     
    const { data } = await API.post(
        `${baseUrl}/note`,
        myData,
        {
          headers: { Content_type: "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(data);
      return data
})

export const allNote =createAsyncThunk("note/allNote" , async()=>{
     
    const { data } = await API.get(`${baseUrl}/note`, {
        headers: { Content_type: "application/json" },
        withCredentials: true,
      });

      return data
})
export const deleteNote =createAsyncThunk("note/deleteNote" , async(id)=>{
     
  const { data } = await API.delete(`${baseUrl}/note/${id}`, {
    headers: { Content_type: "application/json" },

    withCredentials: true,
  });
      return data
})


export const selectNote =createAsyncThunk("note/selectNote" , async(id)=>{
     
  const { data } = await API.get(
    `${baseUrl}/note/${id}`,
    {
      headers: { Content_type: "application/json" },
      withCredentials:true,
    },
  );
      return data
})

export const editNote =createAsyncThunk("note/editNote" , async(id ,note)=>{
     
  const { data } = await API.patch(
    `${baseUrl}/note/${id}`,
     note ,
    {
      headers: { Content_type: "application/json" },
      withCredentials:true,
    },
  );
      return data
})
