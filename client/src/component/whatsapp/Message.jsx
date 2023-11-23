import React, { useState } from 'react'
import userLogo from '../../assets/alex.jpg'
import { useSelector } from 'react-redux'

export default function Message({ props }) {

  const [message, setMessage] = useState('');
  const onHandleSubmit = (e) => {
    e.preventDefault();
    console.log('Message submitted:', message);
  };


  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      onHandleSubmit(event)
    }
  };

  const photo = useSelector((state) => state.userData.image)
  const owner = true
  const owner1 = false
  return (

    <>
      <div className='sm:h-[75vh] hover:overflow-auto overflow-hidden'>

        <div className={`flex w-[60%] my-3 ${owner ? 'ml-auto' : ''}`}>
          {owner ? null : <img src={userLogo} className={`${owner ? '' : 'ml-auto'} h-[40px] w-[40px] object-fill rounded-full`} alt={userLogo} />}
          <div className={`${owner ? 'bg-purple-300' : 'bg-gray-200'} m-1 px-2 text-start p-1 rounded-lg`}>
            <p className='text-gray-800 font-medium text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem neque a tempora iusto!</p>
          </div>
        </div>

        <div className={`flex w-[60%] my-3 ${owner1 ? 'ml-auto' : ''}`}>
          {/* <img src={owner1 ? userLogo : photo} className={`${owner ? '' : 'ml-auto'} h-[40px] w-[40px] object-fill rounded-full`} alt={userLogo} /> */}
          {owner1 ? null : <img src={userLogo} className={`${owner ? '' : 'ml-auto'} h-[40px] w-[40px] object-fill rounded-full`} alt={userLogo} />}
          <div className={`${owner1 ? 'bg-purple-300' : 'bg-gray-200'} m-1 px-2 text-start p-1 rounded-lg`}>
            <p className='text-gray-800 font-medium text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem neque a tempora iusto!</p>
          </div>
        </div>



        <div className={`${owner ? 'bg-purple-300 ml-auto' : 'bg-gray-200'} my-3 w-[60%] px-2 text-start p-1 rounded-lg`}>
          <p className='text-gray-800 font-medium text-lg '>Lorem ipsum dolor sit amet consectetur adipisicing elit. className=voluptatem neque a tempora iusto!</p>
        </div>

        <div className='flex w-[60%] my-3'>
          <img src={owner ? userLogo : photo} className='`${owner?}`  h-[40px] w-[40px] object-fill rounded-full' alt={userLogo} srcSet="" />
          <div className={`${owner1 ? 'bg-purple-300 ml-auto' : 'bg-gray-200'} m-1  px-2 text-start p-1 rounded-lg`}>
            <p className='text-gray-800 font-medium text-lg '>Lorem ipsum dolor sit amet consectetur adipisicing elit. className=voluptatem neque a tempora iusto!</p>
          </div>
        </div>
        <div className='flex w-[60%] my-3'>
          <img src={owner ? userLogo : photo} className='`${owner?}`  h-[40px] w-[40px] object-fill rounded-full' alt={userLogo} srcSet="" />
          <div className={`${owner1 ? 'bg-purple-300 ml-auto' : 'bg-gray-200'} m-1  px-2 text-start p-1 rounded-lg`}>
            <p className='text-gray-800 font-medium text-lg '>Lorem ipsum dolor sit amet custo!</p>
          </div>
        </div>

        <div className={`${owner ? 'bg-purple-300 ml-auto' : 'bg-gray-200'} my-3 w-[60%] px-2 text-start p-1 rounded-lg`}>
          <p className='text-gray-800 font-medium text-lg '>Lorem ipsum dolor sit amet consectetur adipisicing elit. className=voluptatem neque a tempora iusto!</p>
        </div>
        <div className={`${owner ? 'bg-purple-300 ml-auto' : 'bg-gray-200'} my-3 w-[60%] px-2 text-start p-1 rounded-lg`}>
          <p className='text-gray-800 font-medium text-lg '>Lorem ipsum dolor sit amet consectetur adipisicing elit. className=voluptatem neque a tempora iusto!</p>
        </div>
      </div>

      <div className='flex'>
        <textarea
          className='mt-3 placeholder:p-3 w-[85%] text-black border-gray-300 border-2 rounded font-medium p-2'
          placeholder='Type here..'
          name='message'
          cols='90'
          rows='2'
          onChange={(e)=>setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        ></textarea>
        <button
        onClick={onHandleSubmit}
          type='submit'
          className='ml-2 h-12 mt-5 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
        >
          Send
        </button>
          </div>
    </>

  )
}
