import React, { useEffect, useState } from 'react'
import logo from '../assets/full_title.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { addEmail,addImage, addName, addFriend, setIsLogin, updateId} from '../store/UserSlice';
import Alex from '../assets/alex.jpg'
import { addUser } from '../service/api';

export default function Navbar() {
    const [openOption, setOpenOption] = useState(false)
    const [openOptionMobile, setOpenOptionMobile] = useState(false)
    const { logout, isAuthenticated, user, loginWithRedirect } = useAuth0();
    const dispatch = useDispatch();
    const name = useSelector((state)=>state.userData.name)
    const image = useSelector((state)=>state.userData.image)
    const displayImage = image || Alex;

    const fetchData = async () => {
        try {
            const data = { name: user.name, email: user.email, photo: user.picture };
            const showData = await addUser(data)
            .then((data)=> 
                {
                dispatch(setIsLogin(true));
                dispatch(addName(data.name));
                dispatch(addEmail(data.email));
                dispatch(addImage(data.photo));
                dispatch(updateId(data._id));
                dispatch(addFriend(data.friend));
                }
            )
        } catch (error) {
            console.log('Error while calling addUser API ', error);
        }
    };
    
    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    

    return (
        <div>
            <nav className="bg-[#581c87]">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                         
                            <button onClick={() => setOpenOptionMobile(!openOptionMobile)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                             
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>

                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img className="h-10 rounded w-auto" src={logo} alt="Your Company" />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link to={'/'} className="active:bg-gray-900 text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium" >Home</Link>
                                    <Link to={'/random'} className="text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Random Chat</Link>
                                    {isAuthenticated && <Link to={'/whatsapp'} className="text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Message</Link>}
                                    <Link to={'/matches'} className="text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Match</Link>
                                </div>
                            </div>
                        </div>
                        {isAuthenticated ? <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Link to={'/notification'} type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">View notifications</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                            </Link>

                            {/* <!-- Profile dropdown --> */}
                            <div className="relative ml-3">
                                <div>
                                    <button onClick={() => setOpenOption(!openOption)} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src={displayImage} alt={Alex}/>
                                    </button>
                                </div>

                                {/* <!-- Dropdown menu, show/hide based on menu state.
                                Entering: "transition ease-out duration-100"
                                From: "transform opacity-0 scale-95"
                                To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                From: "transform opacity-100 scale-100"
                                To: "transform opacity-0 scale-95"   --> */}
                                {openOption && <div onClick={() => setOpenOption(false)} className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                    {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                                    <Link to={'/profile'} className=" block px-4 py-2 text-sm text-gray-700">Your Profile</Link>
                                    <Link to={'/setting'} className=" block px-4 py-2 text-sm text-gray-700">Setting</Link>
                                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className=" block px-4 py-2 text-sm text-gray-700">Sign Out</button>
                                </div>}
                            </div>
                        </div> : <>
                            <button onClick={() => loginWithRedirect()} className='hover:bg-gray-900 text-white bg-gradient-to-r m-auto from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                                Login
                            </button>
                        </>}
                    </div>
                </div>

                {/* <!-- Mobile menu, show/hide based on menu state. --> */}
                {openOptionMobile && <div className="sm:hidden" id="mobile-menu">
                    <div onClick={() => setOpenOptionMobile(false)} className="space-y-1 px-2 pb-3 pt-2">
                        <Link to={'/'} className=" hover:bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" >Home</Link>
                        <Link to={'/random'} className=" hover:bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">Random Chat</Link>
                        <Link to={'/myfriend'} className=" hover:bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">My Friend</Link>
                        <Link to={'/matches'} className=" hover:bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">Match</Link>
                    </div>
                </div>}
            </nav>

        </div>
    )
}
