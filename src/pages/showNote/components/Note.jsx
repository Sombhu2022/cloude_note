
import React from "react";
import { Link } from "react-router-dom";
import './note.scss'

function Note({ note, id, date, onDelete }) {
  return (
    <div className="main_div note_container" >
      <p>{note}
      {/* <i>{date}</i> */}
      </p>
      <div className="options">

      <button className="primary_button " onClick={onDelete}>delete</button>
      <Link to={`/edit/${id}`}>
        <button className="primary_button">edit</button>
      </Link>
      </div>
    </div>
  );
}

export default Note;
