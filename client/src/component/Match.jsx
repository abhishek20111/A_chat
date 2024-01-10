import React, { useEffect, useState } from 'react';
import { addFriend, getUsers, setConversation } from '../service/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './whatsapp/Loader.css';

export default function Match() {
  const [userData, setUserData] = useState([]);
  const email = useSelector((state) => state.userData.email);
  const userId = useSelector((state) => state.userData.id);
  const navigate = useNavigate();
  const notify1 = (info) => toast.success(info);
  const notify4 = (msg) => toast.error(msg);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    await getUsers().then((data) => setUserData(data));
    setIsLoading(false);
  };

  const handleClick = async (e, id) => {
    e.preventDefault();
    const data = { senderId: userId, receiverId: id };
    setIsLoading(true);
    await addFriend(email, id).then((data) => {
      console.log(data.message);
      notify1(data.message);
    }).catch((err)=>navigate('/whatsapp'))
    await setConversation(data).then((data) => navigate('/whatsapp'));
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
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
                    <td onClick={() => navigate('/profile', { state: { friendsId: user._id } })}>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <img src={user.photo} alt={user.name} style={{ width: '50px', height: '50px' }} />
                    </td>
                    <button onClick={(e) => handleClick(e, user._id)} className="border-2 border-black m-3 p-2">
                      Chat
                    </button>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
