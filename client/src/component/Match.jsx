import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addFriend, getUsers } from '../service/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Match() {
  const [userData, setUserData] = useState([]);
  const email = useSelector((state)=>state.userData.email)
  const navigate = useNavigate()

  const getData = async()=>{
    await getUsers().then((data)=>setUserData(data))
  }

  const handleClick = async(e, id)=>{
    e.preventDefault();
    await addFriend(email, id).then((data)=>navigate('/whatsapp'))
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2>User Data</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Chat</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            user.email !== email && (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <img src={user.photo} alt={user.name} style={{ width: '50px', height: '50px' }} />
                </td>
                <button onClick={(e) => handleClick(e, user._id)} className='border-2 border-black m-3 p-2'>Chat </button>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}
