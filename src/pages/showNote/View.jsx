import axios from "axios";
import React, { useEffect, useState } from "react";
import Note from "./components/Note";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./view.scss";
import { baseUrl } from "../../App";

function View() {
  const [note, setNote] = useState([]);
  const navigete = useNavigate();
  const postNavigate = () => {
    navigete("/post");
  };

  const allNote = async () => {

    try{

      const { data } = await axios.get(`${baseUrl}/note`, {

        headers: { Content_type: "application/json" },
      });
      setNote(data.note);
      console.log(data.note);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/note/${id}`, {
        headers: { Content_type: "application/json" },
        withCredentials: true
      });
      toast.success(data.message);
      allNote();
    } catch (error) {
      console.log(error);
      toast.success(error.message);
    }
  };

  const userData = async () => {
    const { data } = await axios.get(`${baseUrl}/user/alluser`, {
      headers: { 
        Content_type: "application/json"
       },
      withCredentials: true,
    });
    console.log(data);
  };
  useEffect(() => {
    allNote();
    userData();
  }, []);

  const signUpNavigate = () => {
    navigete("/sign up");
  };
  const logInNavigate = () => {
    navigete("/log in");
  };
  const logoutNavigate = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/user/logout`, {
        headers: {
          Content_type: "application/json",
        },
        withCredentials: true,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }

    navigete("/log in");
  };
  return (
    <div className="main_div View_container">
      <button onClick={postNavigate} className="primary_button">
        add note
      </button>
      <button onClick={signUpNavigate} className="primary_button">
        sign up
      </button>
      <button onClick={logInNavigate} className="primary_button">
        Log in
      </button>
      <button onClick={logoutNavigate} className="primary_button">
        Log out
      </button>

      {note?.map((ele, index) => {
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
