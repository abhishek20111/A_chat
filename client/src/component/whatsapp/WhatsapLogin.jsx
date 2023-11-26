import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Message from './Message';
import { getUsers } from '../../service/api';
import logo from '../../assets/alex.jpg'
import { useSelector } from 'react-redux';
import Background from './Background';
import background from '../../assets/background.jpeg'
import { useNavigate } from 'react-router-dom';

export default function WhatsapLogin() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useState();
  const navigate = useNavigate()
  const email = useSelector((state) => state.userData.email)
  const [showMessage, setShoeMessage] = useState(false)

  const fetchData = async () => {
    try {
      const getAllUser = await getUsers();
      console.log(getAllUser);
      setUserData(getAllUser);
    } catch (error) {
      console.log('Error while calling getUsers API ', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
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

            {userData && userData.map((data) => {
              if (email !== data.email) {
                return (
                  <div key={data._id} className='flex gap-4 pt-3 ' onClick={(e)=>{setShoeMessage(true)}}>
                    <img className='h-[40px] w-[40px] object-fill rounded-full' src={data.photo} alt={logo} />
                    <p className='my-auto cursor-pointer'>{data.name}</p>
                    <span onClick={()=>navigate('/profile', { state: { friendsId: data._id } })}
                    className="material-symbols-outlined ml-auto cursor-pointer hover:text-black">more_vert</span>
                  </div>
                );
              }
              return null;
            })}

            <div className='flex gap-4 pt-3'>
              <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
              <p className='my-auto'>Abhishek Dimpy</p>
            </div>
          </div>

        </div>

        <div className='w-[67%]'>
          {/* <Message /> */}
          <div className='w-full h-full'>
            <div className='ml-5 gap-y-3'>
              {
                showMessage ?
                  <Message />
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
