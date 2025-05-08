import React from 'react'

const Navbar = () => {
  return (
    <div className=' h-17 w-screen bg-gray-200 p-3 flex gap-3'>
        <img src="./public/svg/vite.svg" alt="" className=' size-12 ml-1  ' />
        <div className=" inline-flex relative ">
          <img src="./public/svg/search.svg" className=' size-6 my-auto ' />
          <input
           type="search"
           name="location"
           id="location"
           value={"India"}
           className='border-solid border-2 rounded bg-white h-12 w-70'
           />
        </div>
        <div className="  ">
          <input
           type="search"
           name="search"
           id="search"
           placeholder='Search "Cars"'
           className='border-solid border-2 rounded bg-white h-12 w-200'
           />
        </div>


    </div>
  )
}

export default Navbar
