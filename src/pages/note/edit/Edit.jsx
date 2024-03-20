import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../../App";
import API from "../../../utils/axiosSetup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editNote, selectNote } from "../../../redux/note/noteController";

import Loader from 'react-js-loader'

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
 
 
  // console.log(id);
  const {note , noteSelect , status} = useSelector(state=> state.note)
  // console.log(note);
  const dispatch = useDispatch()
  const [title , setTitle] = useState("")
  const [subject , setSubject]=useState("")

  useEffect(()=>{
    dispatch(selectNote(id))
    // console.log( noteSelect , title , subject);
    
  },[])

  
  useEffect(() => {
    if (noteSelect) {
      setTitle(noteSelect.title);
      setSubject(noteSelect.subject);
    }
  }, [noteSelect]);
  
  console.log(title , subject);

  

  

  const formHandeler = async (e) => {
    e.preventDefault();
    try {
      if(!title || !subject) return toast.info("all filled are required")
     dispatch(editNote({id , title , subject}))
      // toast.success(data.message);
    
    } catch (error) {
      // console.log("error:=>", error);
      toast.error(error.message || error.response.data.message);

    }
  };

  useEffect(() => {
    if (status === "editSuccess") {
      navigate('/');
    }
  }, [status, navigate]);


  
  return (
    <div className="main_div addNode_container">
      <form action="" onSubmit={formHandeler}>
        <input
          type="text"
          name="subject"
          id=""
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Subject..."
          // defaultValue={noteSelect.title}
          value={title}
        />
        <textarea
          className="primary_inputbox"
          name="note"
          id=""
          cols="30"
          rows="10"
          placeholder="add note"
          onChange={(e)=>setSubject(e.target.value)}
          // defaultValue={noteSelect?.subject}
          value={subject}
        >
          
        </textarea>
        <button
          type="submit"
          className="primary_button"
        >
           {
            status === "pending" ? (<Loader type={"spinner-circle"} color={"black"} size={40}/>):""
          }
         Update
        </button>
      </form>
    </div>
  );
}

export default Edit;
