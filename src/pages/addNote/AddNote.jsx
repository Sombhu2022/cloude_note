import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './addNode.scss'
import { baseUrl } from '../../App'


function AddNote() {
  const navigate =useNavigate()
  const [note , setNote] = useState()
  const noteHandeler=(e)=>{
     setNote(e.target.value)
  }
  const formHandeler=async (e)=>{
        e.preventDefault();
    try {
      const{ data }= await axios.post(`${baseUrl}/note` , {note} , {
        headers:{ Content_type: "application/json" },
      })
      toast.success(data.message);
      navigate('/')
    } catch (error) {
      console.log('error:=>',error)
      toast.error(error.message);
        }
    
  }

  return (
    <div className='main_div addNode_container'>
      <form action="" onSubmit={formHandeler}>
         <textarea className='primary_inputbox' name="note" id="" cols="30" rows="10" placeholder='add note' onChange={noteHandeler}></textarea>
        <button type='submit' className='primary_button'>Submit</button>

      </form>
      
    </div>
  )
}

export default AddNote