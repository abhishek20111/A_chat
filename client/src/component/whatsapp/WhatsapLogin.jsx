import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Message from './Message';

export default function WhatsapLogin() {

    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    return (<>
        {/* isAuthenticated && (
            <div>
              {console.log(user)}
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ) */}

          <div className='bg-purple-300 w-[100vw] h-[100vh] flex'>
            <div className='bg-white sm:w-[90%] mx-auto my-8 flex gap-4 rounded-2xl p-3 '>
              <div className='w-[30%] '>
                <div className='border-gray-600 h-[98%] rounded-md hover:overflow-auto overflow-hidden flex flex-col border-2 p-3'>
                  <input type="text" className='w-full border-b-2 p-1 border-b-gray-300' placeholder='Search..' />

                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                  <div className='flex gap-4 pt-3'>
                    <img className='h-[40px] rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" alt="" />
                    <p className='my-auto'>Abhishek Dimpy</p>
                  </div>
                </div>
              </div>

              <div className='w-[65%]'>
                <Message/>
              </div>
            </div>
          </div>
    </>
    )
}
