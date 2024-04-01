import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../App';
import './profile.scss'
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../../redux/user/userController';

function ProfilePage() {

  const {user} = useSelector((state)=>state.user)
  // const [user , setUser] = useState({})
  console.log("user profile" ,user);
  const navigate = useNavigate();

  const deleteUser = async () => {
    // try {
    //   const { data } = await axios.delete(`${baseUrl}/user/${user._id}`, {
    //     headers: { Content_type: "application/json" },

    //     withCredentials: true,
    //   });
    //   toast.success(data.message);
    //   navigate('/')
    // } catch (error) {
    //   // console.log(error);
    //   toast.error(error.message || error.response.data.message);


    // }
  };

  console.log(user);


  return (
    <div className='main_div profile_container'>
      <div className='data_container'>
         <img src={`${user.dp.url}`}  />
         <h2>{user.name}</h2>
         <hr/>
        {/* <p>{user.postAt}</p> */}
        <p>{user.email}</p>
        {/* <button onClick={deleteUser} className='primary_button'>delete</button>  */}
      </div>
    </div>
  )
}

export default ProfilePage