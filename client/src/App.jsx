import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './component/Home';
import Signin from './component/Signin';
import Navbar from './component/Navbar';
import Signup from './component/Signup';
import Myfriend from './component/Myfriend';
import Random from './component/Random';
import Match from './component/Match';
import WhatsapLogin from './component/whatsapp/WhatsapLogin';

export default function App() {
  const USER_TYPE = {
    PUBLIC: 'Public User',
    USER: 'User',
    ADMIN: 'Admin',
  };

  
  const AppRouters = () => (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/myfriend" element={<Myfriend/>} />
      <Route path="/whatsapp" element={<WhatsapLogin/>} />
      <Route path="/random" element={<Random/>} />
      <Route path="/matches" element={<Match/>} />
    </Routes>
  );
  

  return (
    <>
      <Navbar />
      <AppRouters />
    </>
  );

  // function PublicElement({ children }) {
  //   return <>{children}</>;
  // }

  // function UserElement({ children }) {
  //   const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);

  //   if (CURRENT_USER_TYPE === USER_TYPE.USER || CURRENT_USER_TYPE === USER_TYPE.ADMIN) {
  //     return <>{children}</>;
  //   } else return <>Do not have access to this, Login Again</>;
  // }

  // function OnlyUserElement({ children }) {
  //   const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);

  //   if (CURRENT_USER_TYPE === USER_TYPE.USER) return <>{children}</>;
  //   else return <>You do not need to access this site</>;
  // }
}
