import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../../App";
import API from "../../../utils/axiosSetup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editNote, selectNote } from "../../../redux/note/noteController";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
 
 
  console.log(id);
  const {note , noteSelect , status} = useSelector(state=> state.note)
  console.log(note);
  const dispatch = useDispatch()


  const [title , setTitle] = useState(noteSelect?.title)
  const [subject , setSubject]=useState(noteSelect?.subject)
  //  console.log( noteSelect , title , subject);

  

  const formHandeler = async (e) => {
    e.preventDefault();
    try {
      if(!title || !subject) return toast.info("all filled are required")
     dispatch(editNote(id ,{ title , subject}))
      // toast.success(data.message);
      navigate("/");
    } catch (error) {
      // console.log("error:=>", error);
      toast.error(error.message || error.response.data.message);

    }
  };

  useEffect(()=>{
    dispatch(selectNote(id))
  },[id])
  
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
        <button className="primary_button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default Edit;
