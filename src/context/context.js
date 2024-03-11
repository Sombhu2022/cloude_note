import { createContext, useContext} from "react";

export const UserAPI = createContext(null)

export const NoteAPI=createContext(null)

export const  useUser =()=>{
    return useContext(UserAPI)
}

export const useNote = ()=>{
    return useNote(NoteAPI)
}



