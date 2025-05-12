import React from 'react'

const Footer = () => {
    return (
        <>
            <div className=' static bottom-0 w-1/1 mt-50 '>
                <div className=' bg-[rgb(246,247,247)] h-45 '>
                    <div className=' mx-40 '>
                        <div className=' h-30 flex justify-between pt-5 pb-9 '>
                            <div>
                                <h4 className=' text-sm font-black mb-2 ' >POPULAR LOCATIONS</h4>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Kolkata</p>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Mumbai</p>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Chennai</p>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Pune</p>
                            </div>
                            <div>
                                <h4 className=' text-sm font-black mb-2 ' >TRENDING LOCATIONS</h4>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Bhubaneshwar</p>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Hyderabad</p>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Chandigarh</p>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Nashik</p>
                            </div>
                            <div>
                                <h4 className=' text-sm font-black mb-2 ' >ABOUT US</h4>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Tech@OLX</p>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Careers</p>
                            </div>
                            <div>
                                <h4 className=' text-sm font-black mb-2 ' >OLX</h4>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Blog</p>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Help</p>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Sitemap</p>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Legal & Privacy information</p>
                                <p className=' text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer'>Vulnerability Disclosure Program</p>
                            </div>
                            <div>
                                <h4 className=' text-sm font-black mb-2 ' >FOLLOW US</h4>
                                <div className=' flex gap-3 mb-2'>
                                    <img src="/svg/fb.svg" alt="" className=' h-7 ' />
                                    <img src="/svg/insta.svg" alt="" className=' h-7 ' />
                                    <img src="/svg/twitter.svg" alt="" className=' h-7 ' />
                                    <img src="/svg/yt.svg" alt="" className=' h-7 ' />
                                </div>
                                <div className=' flex flex-col gap-2 '>
                                    <img src="https://statics.olx.in/external/base/img/playstore.png" alt="" className=' h-10 w-auto ' />
                                    <img src="https://statics.olx.in/external/base/img/appstore.png" alt="" className=' h-10 ' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' bg-[rgb(0,72,150)] '>
                    <div className=' mx-40 '>
                        <div className=' h-30 flex justify-between pt-5 pb-5 '>
                            <div><img src="/svg/cartrade_tech.svg" alt="" className=' size-full ' /></div>
                            <div className=' flex '><hr className=' size-full border border-white ' /></div>
                            <div className=' '><img src="/svg/olx_2025.svg" alt="" className=' size-full ' /></div>
                            <div className=' '><a href="https://www.carwale.com/" target='1'><img src="/svg/carwale.svg" alt="" className=' size-full ' /></a></div>
                            <div className=' '><a href="https://www.bikewale.com/" target='1'><img src="/svg/bikewale.svg" alt="" className=' size-full ' /></a></div>
                            <div className=' '><a href="https://www.cartrade.com/" target='1'><img src="/svg/cartrade.svg" alt="" className=' size-full ' /></a></div>
                            <div className=' '><a href="https://www.mobilityoutlook.com/" target='1'><img src="/svg/mobility.svg" alt="" className=' size-full ' /></a></div>
                        </div>
                        <div className=' flex justify-between text-white pb-5'>
                            <div><p>Help - Sitemap</p></div>
                            <div><p>All rights reserved © 2006-2025 OLX</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
