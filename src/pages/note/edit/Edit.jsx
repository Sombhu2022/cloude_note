import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import img from "../post/place.jpeg";
import imgPlaceHolder from "../../user/registration/img.svg";

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

import {
  createNote,
  editNote,
  selectNote,
} from "../../../redux/note/noteController";
import Loader from "react-js-loader";
import API from "../../../utils/axiosSetup";
import { baseUrl } from "../../../App";

function EditAll() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [voiceParmition, setVoiceParmition] = useState(true);
  const [image, setImage] = useState(null);
  const [dateTime, setDateTime] = useState();
  const [newImage , setNewImage] = useState()

  // const date = dateTime.split(/[-T:]/)
  // console.log(dateTime , date);
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const dispatch = useDispatch();

  const { id } = useParams();

  const { note, noteSelect, status } = useSelector((state) => state.note);

  useEffect(() => {
    dispatch(selectNote(id));
    // console.log( noteSelect , title , subject);
  }, []);

  useEffect(() => {
    console.log(noteSelect);

    if (noteSelect) {
      setTitle(noteSelect.title);
      setSubject(noteSelect.subject);
      setImage(noteSelect?.image?.url || null);
      setDateTime(noteSelect?.emailSendAt);
    }
  }, [noteSelect]);
  if (status === "editSuccess") {
    navigate("/");
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
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
    // setCPSize((compressedFile.size / 1024 / 1024).toFixed(3))
    const reader = new FileReader();
    reader.onload = () => {
      // if (reader.readyState === 2) {
      setNewImage(reader.result);
      setImage(reader.result)
      // }
    };
    reader.readAsDataURL(compressedFile);
  };

  const handleChangeImage = async(e)=>{
     e.preventDefault()
     {
        if(newImage){
          try {
             const data = await API.patch(`${baseUrl}/note/image/${id}` , { newImage})
             console.log(data);
             if(data.status === 200){
                navigate('/')
             }

          } catch (error) {
            console.log(error);
            
          }
        }else{
            alert("please change image")
            
        }
     }

  }

  const formHandeler = async (e) => {
    e.preventDefault();
    try {
      if (!subject || !title || !dateTime || !id)
        return toast.info("all filled are required");

      dispatch(editNote({ id, title, subject, dateTime }));
      // toast.success(data.message);
      // navigate("/");
    } catch (error) {
      console.log("error:=>", error);
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
    <div className="main_div addNode_container editall-container">
        
      <form action="" onSubmit={handleChangeImage}>
        <label className="primary_input label" htmlFor="file">
          <div className="img-container">
            <img src={image !== null ? image : img} alt="important document" />
          </div>
          <div className="img-input">
            <img src={imgPlaceHolder} alt="" />
            <b style={{ color: "#CB3CFF" }}>Click to upload image</b> svg, jpg ,
            jpeg or gif file .
          </div>
        </label>

        <input
          style={{ display: "none" }}
          type="file"
          name=""
          id="file"
          accept="image/*"
          onChange={fileHandle}
        />

        <button type="submit" className="primary_button">
          {status === "pending" ? (
            <Loader type={"spinner-circle"} color={"black"} size={40} />
          ) : (
            ""
          )}
          Update
        </button>
      </form>

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
        <p>Enter Reminding Date and Time</p>
        <input
          value={dateTime}
          type="datetime-local"
          onChange={(e) => setDateTime(e.target.value)}
        />

        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <textarea
          className="primary_inputbox textbox"
          name="subject"
          id="subject"
          value={subject || transcript}
          cols="30"
          rows="10"
          placeholder="text..."
          onChange={(e) => setSubject( e.target.value)}
          onClick={textControle}
        >
          ok
        </textarea>
        <button type="submit" className="primary_button">
          {status === "pending" ? (
            <Loader type={"spinner-circle"} color={"black"} size={40} />
          ) : (
            ""
          )}
          Update
        </button>
      </form>
    </div>
  );
}

export default EditAll;
