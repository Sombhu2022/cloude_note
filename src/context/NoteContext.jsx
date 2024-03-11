import React, { useState } from 'react'
import {  useUser } from './context'
import { baseUrl } from '../App';
import axios from 'axios';

import { createContext, useContext} from "react";
import UserContext, { UserAPI } from './UserContext';
export const NoteAPI=createContext(null)
export const useNote = ()=>{
    return useContext(NoteAPI)
}


function NoteContext({children}) {
    const [note , setNote]=useState([]);
    const [authenticate, setAuthenticate] = useState(false);

    // const {user , setUser} = useUser() ; 

     const allNote = async () => {
        try {
          const { data } = await axios.get(`${baseUrl}/note`, {
            headers: { Content_type: "application/json" },
            withCredentials: true,
          });
          setNote(data.note);
          console.log(data);
        //   ssetUser(data.user);
          setAuthenticate(true);
        } catch (error) {
          console.log(error);
          if (error.response.data.success === false) {
            
          }
        }
      };
    


  return (
    <NoteAPI.Provider value={{note , setNote , allNote , authenticate , setAuthenticate} } >
       {children}
    </NoteAPI.Provider>
  )
}

export default NoteContext