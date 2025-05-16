import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../../pages/login/Login';
import LogoutButton from '../../pages/logout/Logout';
import axios from 'axios';

const Navbar = () => {
  const [locationval, setLocation] = useState("India");
  const { user, isAuthenticated } = useAuth0();
  const [isDropDown, setIsDropDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userdata, setUserdata] = useState({
    username: '',
    email: ''
  });

  const goToBackend = async (userData) => {
    try {
      const res = await axios.post("http://localhost:7000/api/olx/signup", userData);
      localStorage.setItem("id", res.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handlegotoprofile = () =>{
    navigate("/profile")
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      const userData = { username: user.name, email: user.email };
      setUserdata(userData);
      goToBackend(userData);
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <div className="bg-gray-200 border-b-4 border-white shadow-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
            {/* Logo and Hamburger */}
            <div className="flex justify-between items-center w-full md:w-auto">
              <a href="/"><img src="/svg/vite.svg" alt="OLX Logo" className="h-10 md:h-12" /></a>
              <button
                className="md:hidden focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>

            {/* Location and Search Inputs */}
            <div className={`flex flex-col md:flex-row gap-3 ${isMenuOpen ? 'flex' : 'hidden md:flex'} w-full`}>
              <div className="relative w-full md:w-1/4">
                <input
                  type="search"
                  name="location"
                  id="location"
                  value={locationval}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-2 rounded bg-white h-12 pl-8 w-full bg-[url('/svg/search.svg')] bg-no-repeat bg-[position:4px_center]"
                />
              </div>
              <div className="flex w-full md:flex-grow">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search 'Cars'"
                  className="border-2 rounded-l bg-white h-12 w-full pl-4"
                />
                <button className="bg-black h-12 w-12 rounded-r flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div
              className={`${isMenuOpen ? "flex" : "hidden"
                } md:flex flex-col md:flex-row gap-3 items-center w-full md:w-auto mt-3 md:mt-0`}
            >
              <div className="flex gap-2 items-center">
                <p className="text-sm">ENGLISH</p>
                <img src="/svg/down.svg" alt="Dropdown" className="w-4" />
              </div>
              <div className="hover:bg-blue-100 rounded-full p-2 transition duration-400 cursor-pointer" onClick={() => navigate("/wishlist")}>
                <img src="/svg/love.svg" alt="Favorites" className="w-6" />
              </div>
              {isAuthenticated ? (
                <div className="relative">
                  {localStorage.setItem("email", user.email)}
                  <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => setIsDropDown(!isDropDown)}
                  >
                    <img src={user.picture} alt="User" className="w-7 h-7 rounded-full" />
                    <img src="/svg/down.svg" alt="Dropdown" className="w-4" />
                  </div>
                  {isDropDown && (
                    <div className="absolute top-10 w-64 -right-2 bg-gray-300 shadow-lg md:w-72">
                      <div className="p-4 bg-white">
                        <div className="flex gap-3 items-center">
                          <img src={user.picture} alt="User" className="w-12 rounded-full" />
                          <h2 className="text-lg font-bold">{user.name}</h2>
                        </div>
                        <div onClick={()=>handlegotoprofile()} className="bg-blue-800 text-white font-bold p-2 mt-4 rounded text-center hover:bg-white hover:text-blue-800" >
                          <p>View and edit profile</p>
                        </div>
                      </div>
                      <div className="bg-white mt-1">
                        <div className="flex p-4 gap-2 hover:bg-blue-100">
                          <img src="/svg/myAds.svg" alt="My Ads" />
                          <p>My Ads</p>
                        </div>
                        <div className="flex p-4 gap-2 hover:bg-blue-100">
                          <svg width="23" height="23" viewBox="0 0 1024 1024">
                            <path d="M426.667 42.667h170.667l42.667 42.667-42.667 42.667h256l42.667 42.667v768l-42.667 42.667h-682.667l-42.667-42.667v-768l42.667-42.667h256l-42.667-42.667 42.667-42.667zM213.333 896h597.333v-682.667h-597.333v682.667zM469.333 426.667v-85.333h256v85.333h-256zM298.667 426.667v-85.333h85.333v85.333h-85.333zM469.333 597.333v-85.333h256v85.333h-256zM298.667 597.333v-85.333h85.333v85.333h-85.333zM469.333 768v-85.333h256v85.333h-256zM298.667 768v-85.333h85.333v85.333h-85.333z" />
                          </svg>
                          <p>Buy Business Packages</p>
                        </div>
                        <div className="flex p-4 gap-2 hover:bg-blue-100">
                          <svg width="23" height="23" viewBox="0 0 1024 1024">
                            <path d="M899.285 256l39.381 39.083v476.501l-39.381 39.083h-774.571l-39.381-39.083v-476.501l39.381-39.083h774.571zM853.461 511.573h-681.6v213.632h681.6v-213.632zM693.205 618.411h76.459l34.901 32.213-34.901 32.213h-128.896l-34.901-32.213 34.901-32.213h52.437zM853.461 341.248h-681.387v86.357l681.387-2.347v-84.053z" />
                          </svg>
                          <p>Bought Packages & Billing</p>
                        </div>
                      </div>
                      <div className="bg-white mt-1">
                        <div className="flex p-4 gap-2 hover:bg-blue-100">
                          <svg width="23" height="23" viewBox="0 0 1024 1024">
                            <path d="M899.285 256l39.381 39.083v476.501l-39.381 39.083h-774.571l-39.381-39.083v-476.501l39.381-39.083h774.571zM853.461 511.573h-681.6v213.632h681.6v-213.632zM693.205 618.411h76.459l34.901 32.213-34.901 32.213h-128.896l-34.901-32.213 34.901-32.213h52.437zM853.461 341.248h-681.387v86.357l681.387-2.347v-84.053z" />
                          </svg>
                          <p>Help</p>
                        </div>
                        <div className="flex p-4 gap-2 hover:bg-blue-100">
                          <svg width="23" height="23" viewBox="0 0 1024 1024">
                            <path d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z" />
                          </svg>
                          <p>Settings</p>
                        </div>
                        <div className="flex p-4 gap-2 hover:bg-blue-100">
                          <svg width="23" height="23" viewBox="0 0 1024 1024">
                            <path d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z" />
                          </svg>
                          <LogoutButton />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <LoginButton />
                </div>
              )}
              <div
                className="relative left-3 w-35 h-10 cursor-pointer"
                onClick={() => navigate("/post")}
              >
                <div className="absolute inset-0 grid grid-rows-3 grid-cols-4 rounded-full shadow-md overflow-hidden">
                  <div className="bg-teal-500 col-span-4"></div>
                  <div className="bg-yellow-400 row-span-2 col-span-2"></div>
                  <div className="bg-blue-600 row-span-2 col-span-2"></div>
                </div>
                <div className="absolute inset-1 flex items-center justify-center bg-white rounded-full">
                  <img src="/svg/plus.svg" alt="Plus" className="w-5" />
                  <p className="text-sm font-medium text-blue-900">SELL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative sticky h-10 shadow-sm content-center">
        <div className='flex gap-9 justify-around mx-50'>
          <div className='flex gap-2'>
            <h2 className='font-bold'>ALL CATEGORIES</h2>
            <img src="/svg/down.svg" alt="" className='' />
          </div>

          <div className='flex gap-5'>
            <p className='cursor-pointer' onClick={() => navigate('/categories/cars')}>Cars</p>
            <p className='cursor-pointer' onClick={() => navigate('/categories/bikes')}>Bikes</p>
            <p className='cursor-pointer' onClick={() => navigate('/categories/Mobile Phones')}>Mobile Phones</p>
            <p className='cursor-pointer' onClick={() => navigate('/categories/Electronics & Appliances')}>Electronics & Appliances</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;