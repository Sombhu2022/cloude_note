import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./addNode.scss";
import { baseUrl } from "../../../App";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

function AddNote() {
  const navigate = useNavigate();
  const [note, setNote] = useState();
  const [subject, setSubject] = useState();
  const [voiceParmition, setVoiceParmition] = useState(true);

  const noteHandeler = (e) => {
    setNote(e.target.value);
  };

  const subjectHandeler = (e) => {
    setSubject(e.target.value);
  };
  // console.log(note, subject);

  const formHandeler = async (e) => {
    e.preventDefault();
    try {
        if(!note || !subject)  return toast.info("all filled are required");
     
      const { data } = await axios.post(
        `${baseUrl}/note`,
        { subject, note },
        {
          headers: { Content_type: "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      // console.log('error:=>',error)
      toast.error(error.message || error.response.data.message);
    }
  };

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    setNote(transcript);
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
        <input
          type="text"
          name="subject"
          placeholder="subject"
          onChange={subjectHandeler}
        />

        <textarea
          className="primary_inputbox textbox"
          name="note"
          id="note"
          value={note || transcript}
          cols="30"
          rows="10"
          placeholder="text..."
          onChange={noteHandeler}
          onClick={textControle}
        >
          ok
        </textarea>
        <button type="submit" className="primary_button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNote;
