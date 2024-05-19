import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./addNode.scss";

import img from "./place.jpeg"
import imgPlaceHolder from '../../user/registration/img.svg'

import imageCompression from "browser-image-compression";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";


import { useDispatch, useSelector } from "react-redux";

import { createNote } from "../../../redux/note/noteController";
import Loader from 'react-js-loader'


function Addsubject() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState();
  const [title, setTitle] = useState();
  const [voiceParmition, setVoiceParmition] = useState(true);
  const [image , setImage]= useState(null)
  const [dateTime , setDateTime] = useState()
  // const date = dateTime.split(/[-T:]/)
  // console.log(dateTime , date);
  const { transcript, listening, browserSupportsSpeechRecognition } =
  useSpeechRecognition();

  const dispatch = useDispatch()
  const {status} = useSelector(state=>state.note)

  if(status === "createSuccess"){
       navigate('/')
  }


  const fileHandle = async (e) => {
    const file = e.target.files[0];
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
    let originalSize = file.size / 1024 / 1024;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

      const compressedFile = await imageCompression(file, options);
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      );
      // setCPSize((compressedFile.size / 1024 / 1024).toFixed(3))
    const reader = new FileReader();
    reader.onload = () => {
      // if (reader.readyState === 2) {
      setImage(reader.result);
      // }
    };
    reader.readAsDataURL(compressedFile);
  };
 

  const formHandeler = async (e) => {
    e.preventDefault();
    try {
        if(!subject || !title || !dateTime)  return toast.info("all filled are required");
       


      const myData = new FormData()
      
      myData.append("image" , image)
      myData.set("title" , title)
      myData.set("subject" , subject)
      myData.set("noticeTime" , dateTime  )
      
      dispatch(createNote(myData))
      // toast.success(data.message);
      // navigate("/");
    } catch (error) {
      console.log('error:=>',error)
      toast.error(error.message || error.response.data.message);
    }
  };


  

  useEffect(() => {
    setSubject(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const textControle = () => {
    SpeechRecognition.stopListening();
    setVoiceParmition(false);
  };

  return (
    <div className="main_div addNode_container">
      {voiceParmition ? (
        <div className="voice_container">
          <button
            onClick={() =>
              SpeechRecognition.startListening({
                continuous: true,
                language: "en-IN",
              })
            }
          >
            <FontAwesomeIcon icon={faMicrophone} className="voice_icon" />
          </button>
          {listening ? (
            <FontAwesomeIcon icon={faVolumeHigh} className="voice_icon" />
          ) : (
            <FontAwesomeIcon icon={faVolumeXmark} className="voice_icon" />
          )}
        </div>
      ) : (
        ""
      )}

      <form action="" onSubmit={formHandeler}>
       
      <label className="primary_input label" htmlFor="file">
        
           <div className="img-container">
            <img src={image !==null ? image:img} alt="important document" />
           </div>
           <div className="img-input">
            <img src={imgPlaceHolder} alt="" />
           <b style={{color:"#CB3CFF"}}>Click to upload image</b> svg, jpg , jpeg or gif file .
           </div>
        </label>

        <input style={{display:"none"}} type="file" name="" id="file" accept="image/*"
        onChange={fileHandle} />
         <p>Enter Reminding Date and Time</p>
        <input type="datetime-local" onChange={(e)=>setDateTime(e.target.value)} />

        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={(e)=> setTitle(e.target.value)}
        />

        <textarea
          className="primary_inputbox textbox"
          name="subject"
          id="subject"
          value={subject || transcript}
          cols="30"
          rows="10"
          placeholder="text..."
          onChange={(e)=>setSubject(e.target.value)}
          onClick={textControle}
        >
          ok
        </textarea>
        <button
          type="submit"
          className="primary_button"
        >
           {
            status === "pending" ? (<Loader type={"spinner-circle"} color={"black"} size={40}/>):""
          }
          
          Add 
        </button>
      </form>
    </div>
  );
}

export default Addsubject;
