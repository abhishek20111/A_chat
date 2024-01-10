import React, { useEffect, useRef, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Message from './Message';
import { getConversation, getProfile } from '../../service/api';
import logo from '../../assets/alex.jpg'
import { useSelector } from 'react-redux';
import Background from './Background';
import background from '../../assets/background.jpeg'
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
import './Loader.css'

export default function WhatsapLogin() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useState();
  const navigate = useNavigate()
  const socket = useRef();
  const email = useSelector((state) => state.userData.email)
  const [showMessage, setShoeMessage] = useState(false)
  const userId = useSelector((state) => state.userData.id);
  const [converstation, setConverstation] = useState({})


  const fetchData = async () => {
    try {
      const getAllUser = await getProfile(userId);
      // console.log(getAllUser);
      setUserData(getAllUser);
    } catch (error) {
      console.log('Error while calling getUsers API ', error);
    }
  };

  const getConverstation = async (e, id) => {
    e.preventDefault()
    const data = {
      senderId: userId,
      receiverId: id
    }
    await getConversation(data)
      .then((data) => {
        console.log(data);
        setShoeMessage(true);
        setConverstation(data)
      })
  }

  useEffect(() => {
    socket.current = io('ws://localhost:8080'); // for connection purpose 
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (userData) {
      socket.current.emit("addUser", userData);
      
    }
  }, [userData]);

  if (isLoading) {
    return <div><div class="loader"></div></div>;
  }


  return (<>

    <div className='bg-purple-300 w-[100vw] h-[100vh] flex'>
      <div className='bg-white sm:w-[79%] mx-auto my-8 flex gap-4 rounded-2xl p-3 '>
        <div className='w-[30%] '>
          <div className='border-gray-600 h-[98%] rounded-md hover:overflow-auto overflow-hidden flex flex-col border-2 p-3'>
            <div className='flex border-b-2  border-b-gray-300'>
              <span className="material-symbols-outlined mt-1">search</span>
              <input type="text" className='w-full p-1' placeholder='Search..' />
            </div>

            {userData && userData.friend && userData.friend.length > 0 && userData.friend.map((data) => {
              if (email !== data.email) {
                return (
                  <div key={data._id} className='flex gap-4 pt-3 ' onClick={(e) => { setShoeMessage(true) }}>

                    <img className='h-[40px] w-[40px] object-fill rounded-full' src={data.photo} alt={logo} />
                    <p onClick={(e) => getConverstation(e, data._id)} className='my-auto w-[100%] cursor-pointer'>{data.name}</p>
                    <span onClick={() => navigate('/profile', { state: { friendsId: data._id } })}
                      className="material-symbols-outlined ml-auto cursor-pointer hover:text-black">more_vert</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        <div className='w-[67%]'>
          {/* <Message /> */}
          <div className='w-full h-full'>
            <div className='ml-5 gap-y-3'>
              {
                showMessage ?
                  <Message socket={socket} converstation={converstation.conversation} friend={converstation.friendData} />
                  :
                  <img src={background} className='rounded-lg opacity-60 sm:h-[86vh] object-cover '></img>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
