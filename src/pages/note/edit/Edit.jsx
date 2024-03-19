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
  const [data, setData] = useState({});
  console.log(id);
  const {note , noteSelect , status} = useSelector(state=> state.note)
  console.log(note);
  const dispatch = useDispatch()
  const getUser=()=>{
    dispatch(selectNote(id))
    setData(noteSelect)
  }
 
   console.log(data);

  const noteHandeler = (e) => {
    setData({...data , [e.target.name]:e.target.value});
  };

  const formHandeler = async (e) => {
    e.preventDefault();
    try {
      if(!data.note || !data.subject) return toast.info("all filled are required")
     dispatch(editNote(id , data))
      // toast.success(data.message);
      navigate("/");
    } catch (error) {
      // console.log("error:=>", error);
      toast.error(error.message || error.response.data.message);

    }
  };

  useEffect(()=>{
    getUser()
  },[])
  
  return (
    <div className="main_div addNode_container">
      <form action="" onSubmit={formHandeler}>
        <input
          type="text"
          name="subject"
          id=""
          onChange={noteHandeler}
          placeholder="Subject..."
         value={data.title}
        />
        <textarea
          className="primary_inputbox"
          name="note"
          id=""
          cols="30"
          rows="10"
          placeholder="add note"
          onChange={noteHandeler}
          defaultValue={data.subject}
          value={data.subject}
        >
          Text... 
        </textarea>
        <button className="primary_button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default Edit;
