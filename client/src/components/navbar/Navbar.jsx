import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  const [location, setLocation] = useState("India")
  return (
    <>
    <div className='h-17 w-1/1 bg-gray-200 p-3 flex gap-3 border-b-4 border-b-white shadow-sm items-center sticky top-0'>
      <img src="/svg/vite.svg" alt="Search icon" className='size-12 ml-1' />

      <div className="inline-flex relative">
        <input
          type="search"
          name="location"
          id="location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          className='border-solid border-2 rounded bg-white h-12 pl-8 bg-[url("/svg/search.svg")] bg-no-repeat bg-position-[4px]'
        />
      </div>

      <div className=' flex '>
        <input
          type="search"
          name="search"
          id="search"
          placeholder='Search "Cars"'
          className='border-solid border-2 rounded bg-white h-12 w-195 pl-4'
        />
        <div className='bg-black size-12 rounded-r relative right-1 search-container ' >
          <svg fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='w-12 h-7 mt-2.5' >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <div className=' flex'>
        <p className=' mt-3'>ENGLISH</p>
        <img src="/svg/down.svg" alt="^" className=' mt-1  ' />
      </div>

      <div className=' flex hover:bg-[rgb(211,228,248)] mt-1 size-10 rounded-full hover:transition hover:duration-400 transition duration-400 cursor-pointer'>
        <img src="/svg/love.svg" alt="^" className='  mt-1 w-6 mx-auto' />
      </div>

      <div className=' underline underline-offset-4 decoration-3 hover:no-underline'>
        <Link>Login</Link>
      </div>

      <div className=' relative left-3 '>
        <div className=' cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.5)] h-10 w-25 grid grid-rows-3 grid-cols-4 rounded-[100px] overflow-hidden absolute left-2 '>
          <div className=' size-full bg-[rgb(66,179,173)] col-span-4'></div>
          <div className=' size-full bg-[rgb(254,207,50)] row-span-2 col-span-2'></div>
          <div className=' size-full bg-[rgb(1,121,250)] row-span-2 col-span-2'></div>
        </div>

        <div className=" cursor-pointer flex gap-2 h-7.5 w-22.5 bg-white relative items-center rounded-[100px] absolute top-1.25 left-3.25">
          <img src="/svg/plus.svg" alt="+" className=' ml-4 ' />
          <p className=" text-base font-medium text-[rgb(0,72,150)]" >SELL</p>
        </div>
      </div>
    </div>
    <div>

    </div>
    </>
  )
}

export default Navbar
