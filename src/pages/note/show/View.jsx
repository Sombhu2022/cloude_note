import axios from "axios";
import React, { useEffect, useState } from "react";
import Note from "./components/Note";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./view.scss";
import { baseUrl } from "../../../App";
import { useNote, useUser } from "../../../context/context";

function View() {
  // const [usercookie , setUserCookie]=useState('')
  const [totalUser, setTotalUser] = useState();
  const [user, setUser] = useState({});
  const [authenticate, setAuthenticate] = useState(false);
  const [note, setNote] = useState([]);
  const navigete = useNavigate();


  const postNavigate = () => {
    if (!authenticate) {
      toast.info("first log in ");
      navigete("/log in");
    } else {
      navigete("/post");
    }
  };

  const allNote = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/note`, {
        headers: { Content_type: "application/json" },
        withCredentials: true,
      });
      setNote(data.note);
      // console.log(data);
      setUser(data.user);
      setAuthenticate(true);
    } catch (error) {
      // console.log(error);
      if (error.response.data.success === false) {

      }
      toast.info("Add your importent node..");

    }
  };

  const deleteNote = async (id) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/note/${id}`, {
        headers: { Content_type: "application/json" },

        withCredentials: true,
      });
      toast.success(data.message);
      allNote();
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const userData = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/user/alluser`, {
        headers: {
          Content_type: "application/json",
        },
        withCredentials: true,
      });
      // console.log(data.user.length);
      setTotalUser(data.user.length);
    } catch (error) {
      toast.error("log in first");
    }
  };

  useEffect(() => {
   
    allNote();
    userData();
    // const token = Cookies.get('usercookie');
  }, []);

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
      toast.error(error.message || error.response.data.message);

      // console.log(error);
    }

    navigete("/log in");
  };

  const profileHandle = () => {
    if (authenticate) {
      navigete(`/profile/${user.id}`);
    } else {
      toast.info("first log in , then manage your profile");
    }
  };

  return (
    <div className="main_div View_container">
      <div className="data_container">
        <div className="navbar">
          <div className="left_container">
            <h3>
              Wellcome ,<br />
              {authenticate ? user.name : " "}
            </h3>
          </div>
          <div className="right_container">
            <FontAwesomeIcon icon={faGear} onClick={profileHandle} />
          </div>
        </div>

        <div className="primary_option">
          <div className="left_button">
            <button onClick={postNavigate} className="primary_button ">
              <FontAwesomeIcon icon={faPlus} className="" /> Add
            </button>
          </div>
          <div className="right_button">
            {!authenticate ? (
              <button onClick={logInNavigate} className="primary_button ">
                log in
              </button>
            ) : (
              <button onClick={logoutNavigate} className="primary_button ">
                log out
              </button>
            )}
          </div>
        </div>

        {note?.map((ele, index) => {
          return (
            <div key={index}>
              <Note
                subject={ele.subject}
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
      <div className="user_countainer">
        <div className="user">
          <p>Users</p>
          {authenticate ? <p>{totalUser}</p> : ""}
        </div>
      </div>
    </div>
  );
}
export default View;
