import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../../pages/login/Login'
import LogoutButton from '../../pages/logout/Logout'

const Navbar = () => {
  const [locationval, setLocation] = useState("India")
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isDropDown, setIsDropDown] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()


  return (
    <>
      <div className='h-17 w-1/1 bg-gray-200 p-3 flex gap-3 border-b-4 border-b-white shadow-sm items-center sticky top-0'>
        <img src="/svg/vite.svg" alt="Search icon" className='size-12 ml-1' />

        <div className="inline-flex relative">
          <input
            type="search"
            name="location"
            id="location"
            value={locationval}
            onChange={(e) => setLocation(e.target.value)}
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

        <div className=' flex gap-3'>
          <p className=' mt-3'>ENGLISH</p>
          <img src="/svg/down.svg" alt="^" className=' mt-1  ' />
        </div>

        <div className=' flex hover:bg-[rgb(211,228,248)] mt-1 size-10 rounded-full hover:transition hover:duration-400 transition duration-400 cursor-pointer'>
          <img src="/svg/love.svg" alt="^" className='  mt-1 w-6 mx-auto' />
        </div>

        {
          isAuthenticated ? (
            <div className=' relative '>
              {localStorage.setItem("email",user.email)}
              <div className=' flex size-7 gap-3 mt-2 cursor-pointer' onClick={() => setIsDropDown(!isDropDown)} >
                <img src={user.picture} alt="" className='rounded-full' />
                <img src="/svg/down.svg" alt="" className=' w-6 ' />
              </div>

              {
                isDropDown && (
                  <div className=' absolute top-12 w-70 -right-10 bg-gray-300 shadow-[0_0_4px_1px_rgba(0,0,0,0.6)]'>
                    <div className='p-5 bg-white'>
                      <div className=' flex gap-3'>
                        <img src={user.picture} alt="" className=' w-14 rounded-full ' />
                        <h2 className=' text-xl font-bold'>{user.name}</h2>
                      </div>
                      <div className=' bg-[#004896] text-white font-extrabold border-5 border-[#004896] p-1 hover:bg-white hover:text-[#004896] text-center mt-6 rounded '>
                        <p>View and edit profile</p>
                      </div>
                    </div>

                    <div className=' bg-white mt-0.5 '>
                      <div className=' flex p-4 gap-2 hover:bg-[#d8eafe] '>
                        <img src="/svg/myAds.svg" alt="" />
                        <p>My Ads</p>
                      </div>
                      <div className=' flex p-4 gap-2 hover:bg-[#d8eafe]'>
                        <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon"  fill-rule="evenodd"><path class="rui-w4DG7" d="M426.667 42.667h170.667l42.667 42.667-42.667 42.667h256l42.667 42.667v768l-42.667 42.667h-682.667l-42.667-42.667v-768l42.667-42.667h256l-42.667-42.667 42.667-42.667zM213.333 896h597.333v-682.667h-597.333v682.667zM469.333 426.667v-85.333h256v85.333h-256zM298.667 426.667v-85.333h85.333v85.333h-85.333zM469.333 597.333v-85.333h256v85.333h-256zM298.667 597.333v-85.333h85.333v85.333h-85.333zM469.333 768v-85.333h256v85.333h-256zM298.667 768v-85.333h85.333v85.333h-85.333z"></path></svg>
                        <p>Buy Business Packages</p>
                      </div>
                      <div className=' flex p-4 gap-2 hover:bg-[#d8eafe]'>
                        <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon"  fill-rule="evenodd"><path class="rui-w4DG7" d="M899.285 256l39.381 39.083v476.501l-39.381 39.083h-774.571l-39.381-39.083v-476.501l39.381-39.083h774.571zM853.461 511.573h-681.6v213.632h681.6v-213.632zM693.205 618.411h76.459l34.901 32.213-34.901 32.213h-128.896l-34.901-32.213 34.901-32.213h52.437zM853.461 341.248h-681.387v86.357l681.387-2.347v-84.053z"></path></svg>
                        <p>Bought Packages & Billing</p>
                      </div>
                    </div>
                    <div className=' bg-white mt-0.5 '>
                      <div className=' flex p-4 gap-2 hover:bg-[#d8eafe]'>
                        <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon"  fill-rule="evenodd"><path class="rui-w4DG7" d="M899.285 256l39.381 39.083v476.501l-39.381 39.083h-774.571l-39.381-39.083v-476.501l39.381-39.083h774.571zM853.461 511.573h-681.6v213.632h681.6v-213.632zM693.205 618.411h76.459l34.901 32.213-34.901 32.213h-128.896l-34.901-32.213 34.901-32.213h52.437zM853.461 341.248h-681.387v86.357l681.387-2.347v-84.053z"></path></svg>
                        <p>Help</p>
                      </div>
                      <div className=' flex p-4 gap-2 hover:bg-[#d8eafe]'>
                        <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon"  fill-rule="evenodd"><path class="rui-w4DG7" d="M873.997 456.711H819.182C811.047 414.001 794.347 374.323 770.704 339.651L809.444 300.892V259.727L767.653 217.918H726.489L687.73 256.677C653.058 233.054 613.38 216.334 570.67 208.199V153.384L541.552 124.266H482.455L453.337 153.384V208.199C410.628 216.334 370.949 233.054 336.277 256.677L297.518 217.918H256.334L214.544 259.727V300.892L253.303 339.651C229.661 374.323 212.96 414.001 204.825 456.711H150.011L120.893 485.829V544.926L150.011 574.044H204.825C212.96 616.753 229.661 656.431 253.303 691.103L214.544 729.863V771.047L256.334 812.837H297.518L336.277 774.078C370.949 797.72 410.628 814.421 453.337 822.556V877.37L482.455 906.488H541.552L570.67 877.37V822.556C613.38 814.421 653.058 797.72 687.73 774.078L726.489 812.837H767.653L809.444 771.047V729.863L770.704 691.103C794.347 656.431 811.047 616.753 819.182 574.044H873.997L903.115 544.926V485.829L873.997 456.711ZM512.004 750.044C382.605 750.044 277.337 644.776 277.337 515.377C277.337 385.978 382.605 280.711 512.004 280.711C641.403 280.711 746.67 385.978 746.67 515.377C746.67 644.776 641.403 750.044 512.004 750.044ZM512.004 350.839C421.266 350.839 347.463 424.641 347.463 515.379C347.463 606.117 421.266 679.92 512.004 679.92C602.741 679.92 676.544 606.117 676.544 515.379C676.544 424.641 602.741 350.839 512.004 350.839ZM512.004 601.697C464.405 601.697 425.685 562.977 425.685 515.379C425.685 467.781 464.405 429.061 512.004 429.061C559.602 429.061 598.322 467.781 598.322 515.379C598.322 562.977 559.602 601.697 512.004 601.697Z"></path></svg>
                        <p>Settings</p>
                      </div>
                      <div className=' flex p-4 gap-2 hover:bg-[#d8eafe]'>
                        <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon"  fill-rule="evenodd"><path class="rui-w4DG7" d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z"></path></svg>
                        <LogoutButton />
                      </div>
                    </div>
                  </div>
                )
              }

            </div>

          ) : (
            <div>
              <LoginButton />
            </div>
          )
        }




        {/* <div className=' underline underline-offset-4 decoration-3 hover:no-underline'> */}
        {/* <Link to={"/login/1"} state={{ background: location }} >Login</Link> */}
        {/* <LoginButton />
        <LogoutButton />

        
      </div> */}

        <div className=' relative -right-10 ' onClick={() => navigate("/post")}>
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
