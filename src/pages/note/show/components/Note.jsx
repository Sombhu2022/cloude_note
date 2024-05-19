
import React from "react";
import { Link } from "react-router-dom";
import './note.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

// import ReactTimeAgo from 'react-time-ago'
import moment from 'moment';
import TimeAgo from 'timeago-react';
// import TimeAgo from 'javascript-time-ago'


function Note({title ,  id,subject ,image ,  date, onDelete , remindingDate }) {
//   console.log(image);
//  const dateFormate = new Date(date)
//   const year = dateFormate.getFullYear()
//   const day = dateFormate.getDay()
//   const month = dateFormate.getMonth()
//   const min = dateFormate.getMinutes()
//   const sec= dateFormate.getSeconds()
//   const h = dateFormate.getHours()
//   console.log(year , month , day , min , sec , h);
// console.log(date);
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
// console.log(formattedDate); 


const da = Date(date)
console.log(da);


  return (
    
    <div className="main_div note_container" >
      {
        image? (
          <div className="img_container">
          <img className="img" src={image?.url} alt="" />
          </div>
        ):""
      }

   
      <h3>{title}
      </h3>
      <p>{remindingDate}</p>
      <p>{subject}</p>
      <div className="option_container">

      <div className="time_container">
      {/* <ReactTimeAgo date={date} locale="en-US"/> */}
      <TimeAgo
      datetime={formattedDate}
      />
      {/* {date} */}
      
      </div>

      <div className="options">

      <button className="button delete_button" onClick={onDelete}>
      <FontAwesomeIcon icon={faTrash} className="icon" />
      </button>
      <Link to={`/edit/${id}`}>
        <button className="button edit_button">
        <FontAwesomeIcon icon={faPen} className="icon" />
        </button>
      </Link>
      </div>
      </div>
    </div>
  );
}

export default Note;
