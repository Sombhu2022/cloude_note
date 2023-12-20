import axios from "axios";
import React, { useEffect, useState } from "react";
import Note from "./components/Note";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import './view.scss'
import { baseUrl } from "../../App";

function View() {
  const [note, setNote] = useState([]);
  const navigete = useNavigate();
  const postNavigate = () => {
    navigete("/post");
  };

  const allNote = async () => {
    try{

      const { data } = await axios.get(`${baseUrl}/note/`, {
        headers: { Content_type: "application/json" },
      });
      setNote(data.note);
      console.log(data.note);
    }catch(error){
      console.log(error)
    }
  };

  const deleteNote = async (id) => {
    try {
      
      const  {data}  = await axios.delete(`${baseUrl}/note/${id}`, {
        headers: { Content_type: "application/json" },
        withCredentials: true
      });
      toast.success(data.message)
      allNote();
    } catch (error) {
      console.log(error);
      toast.success(error.message)

    }
  };
  useEffect(() => {
    allNote();
  }, []);
  return (
    <div className="main_div View_container">
      <button onClick={postNavigate} className="primary_button">add note</button>

      {note?.map((ele, index) => {
        console.log(ele._id);
        return (
          <div key={index}>
            <Note
              note={ele.note}
              id={ele._id}
              date={ele.postAt}
              onDelete={() => deleteNote(ele._id)}
            />
            {/* <EdiitNode onEdit={editNote}/> */}
          </div>
        );
      })}
    </div>
  );
}
export default View;
