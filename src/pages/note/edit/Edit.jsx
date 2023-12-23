import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../../App";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({});

  const getNote = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/note/${id}`, {
        headers: { Content_type: "application/json" },
        withCredentials:true,
      });
      setNote(data.note); 
    } catch (err) {
      console.log(err);
      toast.success(err.message);
    }
  };

 console.log(note)

  useEffect(() => {
    getNote();
  }, [id]);

  const noteHandeler = (e) => {
    setNote({...note , [e.target.name]:e.target.value});
  };

  const formHandeler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${baseUrl}/note/${id}`,
         note ,
        {
          headers: { Content_type: "application/json" },
          withCredentials:true,
        },
      );
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      // console.log("error:=>", error);
    }
  };
  
  return (
    <div className="main_div addNode_container">
      <form action="" onSubmit={formHandeler}>
        <input
          type="text"
          name="subject"
          id=""
          onChange={noteHandeler}
          placeholder="Subject..."
         value={note.subject}
        />
        <textarea
          className="primary_inputbox"
          name="note"
          id=""
          cols="30"
          rows="10"
          placeholder="add note"
          onChange={noteHandeler}
          value={note.note}
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
