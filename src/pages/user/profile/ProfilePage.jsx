import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../App';
import './profile.scss'

function ProfilePage() {

  const [user , setUser] = useState({})
  const {id} = useParams('');
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/user/${id}`, {
        headers: { Content_type: "application/json" },
        withCredentials: true,
      });
      // console.log(data.user);
      setUser(data.user);
      toast.info("manage your profile")
    } catch (error) {
      // console.log(error);
      toast.success("somthing error...")
       
    }
  };


  useEffect(()=>{
       getUser();
  },[])

  const deleteUser = async () => {
    try {
      const { data } = await axios.delete(`${baseUrl}/user/${user._id}`, {
        headers: { Content_type: "application/json" },

        withCredentials: true,
      });
      toast.success(data.message);
      navigate('/')
    } catch (error) {
      // console.log(error);
      toast.error(error.message || error.response.data.message);


    }
  };

  


  return (
    <div className='main_div profile_container'>
      <div className='data_container'>
        
         <h2>{user.name}</h2>
         <hr/>
        {/* <p>{user.postAt}</p> */}
        <p>{user.email}</p>
        <button onClick={deleteUser} className='primary_button'>delete</button> 
      </div>
    </div>
  )
}

export default ProfilePage