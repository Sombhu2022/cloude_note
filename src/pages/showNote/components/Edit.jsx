import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../../App";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState();

  const getNote = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/note/${id}`, {
        headers: { Content_type: "application/json" },
      });
      setNote(data.note.note);
    } catch (err) {
      console.log(err);
      toast.success(err.message)

    }
  };

  useEffect(() => {
    getNote();
  }, [id]);

  const noteHandeler = (e) => {
    setNote(e.target.value);
  };
  const formHandeler = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.patch(
        `${baseUrl}/note/${id}`,
        { note },
        {
          headers: { Content_type: "application/json" },
        }
      );
      
      toast.success(data.message)
      navigate("/");
    } catch (error) {
      console.log("error:=>", error);
    }
  };
  return (
    <div className='main_div addNode_container'>
      <form action="" onSubmit={formHandeler}>
        <textarea
        className='primary_inputbox'
          name="note"
          id=""
          cols="30"
          rows="10"
          placeholder="add note"
          onChange={noteHandeler}
          value={note}
        >
          hii
        </textarea>
        <button className='primary_button' type="submit">Update</button>
      </form>
    </div>
  );
}

export default Edit;
