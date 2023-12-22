
import React from "react";
import { Link } from "react-router-dom";
import './note.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function Note({ note, id,subject , date, onDelete }) {
  return (
    <div className="main_div note_container" >
      <p>{subject}
      {/* <i>{date}</i> */}
      </p>
      <div className="options">

      <button className="delete " onClick={onDelete}>
      <FontAwesomeIcon icon={faTrash} className="icon" />
      </button>
      <Link to={`/edit/${id}`}>
        <button className="edit">
        <FontAwesomeIcon icon={faPen} className="icon" />
        </button>
      </Link>
      </div>
    </div>
  );
}

export default Note;
