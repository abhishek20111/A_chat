import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Myfriend from './component/Myfriend';
import Random from './component/Random';
import Match from './component/Match';
import WhatsapLogin from './component/whatsapp/WhatsapLogin';
import Setting from './component/Setting';
import Profile from './component/Profile';
import { ToastContainer } from 'react-toastify';

export default function App() {

  const AppRouters = () => (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/setting" element={<Setting/>} />
      <Route path="/myfriend" element={<Myfriend/>} />
      <Route path="/whatsapp" element={<WhatsapLogin/>} />
      <Route path="/random" element={<Random/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/matches" element={<Match/>} />
    </Routes>
  );
  

  return (
    <>
      <Navbar />
      <AppRouters />
      <ToastContainer/>
    </>
  );

}
