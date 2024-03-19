import axios from "axios";
import React, { useEffect, useState } from "react";
import Note from "./components/Note";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./view.scss";
import { baseUrl } from "../../../App";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { allNote } from "../../../redux/note/noteController";
import { logoutUser } from "../../../redux/user/userController";

import { deleteNote } from "../../../redux/note/noteController";

function View() {
  // const [usercookie , setUserCookie]=useState('')
  const [totalUser, setTotalUser] = useState();
  const [selectUser, setSelectUser] = useState({});
  const [authenticate, setAuthenticate] = useState(false);
  // const [note, setNote] = useState([]);
  const navigete = useNavigate();

  const dispatch = useDispatch()
  const noteState = useSelector((state)=>state.note)
  const {user , isAuthenticate , status , error} = useSelector((state)=>state.user)
  const {note} = useSelector((state)=> state.note)
  
console.log(user , note);
  const postNavigate = () => {
    if (!isAuthenticate) {
      toast.info("first log in ");
      navigete("/log in");
    } else {
      navigete("/post");
    }
  };

  const allNotes = async () => {
    try {
      dispatch(allNote())
      // setNote(data.note);
      // console.log(data);
      // setUser(data.user);
      // setAuthenticate(true);
    } catch (error) {
      // console.log(error);
      if (error.response.data.success === false) {

      }
    }
  };

  const deleteNoteHandle = async (id) => {
    try {
      dispatch(deleteNote(id))
      // toast.success(data.message);
      allNotes();
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

 
  const logInNavigate = () => {
    navigete("/log in");
  };

  const logoutNavigate = async () => {
    try {
      dispatch(logoutUser())
      // toast.success(data.message);
    } catch (error) {
      toast.error(error.message || error.response.data.message);

      // console.log(error);
    }

    // navigete("/log in");
  };

  const profileHandle = () => {
    if (isAuthenticate) {
      navigete(`/profile/${user.id}`);
    } else {
      toast.info("first log in , then manage your profile");
    }
  };

  useEffect(() => {
    dispatch(allNote())
  }, [user , isAuthenticate]);

  return (
    <div className="main_div View_container">
      <div className="data_container">
        <div className="navbar">
          <div className="left_container">
          {/* <img src={user.dp?.url} /> */}
            <h3>
              Wellcome ,<br />
              {isAuthenticate ? user.name : " "}
            </h3>
          </div>
          <div className="right_container">
            {/* <FontAwesomeIcon icon={faGear} onClick={profileHandle} /> */}
            <img src={user.dp?.url} />
          </div>
        </div>

        <div className="primary_option">
          <div className="left_button">
            <button onClick={postNavigate} className="primary_button ">
              <FontAwesomeIcon icon={faPlus} className="" /> Add
            </button>
          </div>
          <div className="right_button">
            {!isAuthenticate ? (
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
                title={ele.title}
                subject={ele.subject}
                id={ele._id}
                image={ele.image}
                date={ele.postAt}
                onDelete={() => deleteNoteHandle(ele._id)}
              />
              {/* <Edit onEdit={editNote}/> */}
            </div>
          );
        })}
      </div>
      <div className="user_countainer">
        <div className="user">
          <p>Users</p>
          {isAuthenticate ? <p>{totalUser}</p> : ""}
        </div>
      </div>
    </div>
  );
}
export default View;
