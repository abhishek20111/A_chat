import React, { useEffect, useRef, useState } from 'react'
import userLogo from '../../assets/alex.jpg'
import { useSelector } from 'react-redux'
import { getMessages, newMessages } from '../../service/api';
import { formatDistanceToNow } from 'date-fns';

export default function Message({ socket, converstation, friend }) {

  const [message, setMessage] = useState('');
  const photo = useSelector((state) => state.userData.image)
  const userId = useSelector((state) => state.userData.id);
  const [oldMessage, setOldMessage] = useState([])
  const scroller = useRef()
  const [singleSocketMessage, setSocketMessage] = useState('')
  // console.log(friend);
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    let MessageData = {
      senderId: userId,
      receiverId: friend._id,
      conversationId: converstation._id,
      text: message
    }

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId: friend._id,
      text: message,
    });

    // console.log(MessageData);
    const backData = await newMessages(MessageData)
    setOldMessage([...oldMessage, backData.data])
    setMessage('');
  };


  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      onHandleSubmit(event)
    }
  };
  useEffect(() => {
    socket.current.on('getMessage', data => {
      try {
        console.log("data", data);
        setSocketMessage({
          ...data,
          createdAt: Date.now()
        })
      } catch (error) {
        console.error("Error handling getMessage:", error);
      }
    });
  }, []);



  const getAllMessage = async (c) => {
    // console.log(c._id);
    await getMessages(c._id)
      .then((data) => {
        console.log(data);
        setOldMessage(data)
      })
  }
  useEffect(() => {
    converstation && getAllMessage(converstation);
  }, [converstation])

  useEffect(() => {
    singleSocketMessage && converstation?.members?.includes(singleSocketMessage.senderId) &&
      setOldMessage((prev) => [...prev, singleSocketMessage]);
  }, [singleSocketMessage, converstation]);

  useEffect(() => {
    console.log(oldMessage);
    scroller.current?.scrollIntoView({ behavior: 'smooth' });
  }, [oldMessage]);


  return (

    <>
      <div className='sm:h-[75vh] w-full hover:overflow-auto flex flex-col overflow-hidden'>

        {oldMessage && oldMessage.map(mes => (
          <div key={mes._id} ref={scroller} className={`flex w-full my-3 ${mes.senderId[0] === userId ? 'ml-auto' : 'mr-auto'}`}>
            {!mes.senderId.includes(userId) && (
              <img
                src={`${mes.senderId[0] === userId ? '' : friend.photo}`}
                className={`${mes.senderId[0] === userId ? 'ml-auto' : ''} h-[40px] w-[40px] object-fill rounded-full`}
                alt={userLogo}
              />
            )}
            <div className={`${mes.senderId[0] === userId ? 'bg-purple-300' : 'bg-gray-200'} m-1 max-w-[60%] px-2 text-start p-1 rounded-lg ${mes.senderId[0] === userId ? 'ml-auto' : 'mr-auto'}`}>
              <p className='text-gray-800 font-medium text-xl'>{mes.text}</p>
              <p className='text-sm flex justify-end'>{formatDistanceToNow(new Date(mes.createdAt), { addSuffix: true })}</p>
            </div>
          </div>
        ))}


        {
          oldMessage && oldMessage.length === 0 ? (
            <div className='flex justify-center '>
              <div className="relative my-auto flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 rounded-xl bg-clip-border">
                  <img src={friend ? friend.photo : userLogo} className='h-full w-full object-fill' alt="profile-picture" />
                </div>
                <div className="p-6 text-center">
                  <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {friend ? friend.name : 'Alex'}
                  </h4>
                  <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
                    Lets start chat with {friend ? friend.name : 'Alex'}

                  </p>
                </div>
              </div>
            </div>
          ) : null
        }


        {/* <div className={`flex w-[60%] my-3 ${owner1 ? 'ml-auto' : ''}`}>
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
        </div> */}
      </div>

      <div className='flex'>
        <textarea
          className='mt-3 placeholder:p-3 w-[85%] text-black border-gray-300 border-2 rounded font-medium p-2'
          placeholder='Type here..'
          name='message'
          cols='90'
          rows='2'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
