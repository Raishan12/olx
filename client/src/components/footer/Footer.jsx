import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full bg-gray-100">
            {/* Upper Footer */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8 lg:py-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
                    {/* Popular Locations */}
                    <div>
                        <h4 className="text-sm sm:text-base font-bold mb-3">POPULAR LOCATIONS</h4>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer mb-2">Kolkata</p>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer mb-2">Mumbai</p>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer mb-2">Chennai</p>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer">Pune</p>
                    </div>
                    {/* Trending Locations */}
                    <div>
                        <h4 className="text-sm sm:text-base font-bold mb-3">TRENDING LOCATIONS</h4>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer mb-2">Bhubaneshwar</p>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer mb-2">Hyderabad</p>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer mb-2">Chandigarh</p>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer">Nashik</p>
                    </div>
                    {/* About Us */}
                    <div>
                        <h4 className="text-sm sm:text-base font-bold mb-3">ABOUT US</h4>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer mb-2">Tech@OLX</p>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer">Careers</p>
                    </div>
                    {/* OLX */}
                    <div>
                        <h4 className="text-sm sm:text-base font-bold mb-3">OLX</h4>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer mb-2">Blog</p>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer mb-2">Help</p>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer mb-2">Sitemap</p>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer mb-2">Legal & Privacy information</p>
                        <p className="text-xs sm:text-sm text-[rgb(141,145,149)] hover:text-black cursor-pointer">Vulnerability Disclosure Program</p>
                    </div>
                    {/* Follow Us */}
                    <div>
                        <h4 className="text-sm sm:text-base font-bold mb-3">FOLLOW US</h4>
                        <div className="flex gap-3 mb-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src="/svg/fb.svg" alt="Facebook" className="h-6 sm:h-7" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <img src="/svg/insta.svg" alt="Instagram" className="h-6 sm:h-7" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <img src="/svg/twitter.svg" alt="Twitter" className="h-6 sm:h-7" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <img src="/svg/yt.svg" alt="YouTube" className="h-6 sm:h-7" />
                            </a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://statics.olx.in/external/base/img/playstore.png"
                                    alt="Google Play Store"
                                    className="h-8 sm:h-10 w-auto"
                                />
                            </a>
                            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://statics.olx.in/external/base/img/appstore.png"
                                    alt="Apple App Store"
                                    className="h-8 sm:h-10 w-auto"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lower Footer */}
            <div className="bg-[rgb(0,72,150)] text-white">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <a href="https://cartradetech.com/" target="_blank" rel="noopener noreferrer">
                            <img src="/svg/cartrade_tech.svg" alt="CarTrade Tech" className="h-8 sm:h-10 lg:h-22 w-auto" />
                        </a>
                        <div className="hidden lg:block border-l-2 border-white h-8 sm:h-10 lg:h-22 self-center"></div>
                        <a href="https://www.olx.in/" target="_blank" rel="noopener noreferrer">
                            <img src="/svg/olx_2025.svg" alt="OLX 2025" className="h-8 sm:h-10 lg:h-22 w-auto" />
                        </a>
                        <a href="https://www.carwale.com/" target="_blank" rel="noopener noreferrer">
                            <img src="/svg/carwale.svg" alt="CarWale" className="h-8 sm:h-10 lg:h-22 w-auto" />
                        </a>
                        <a href="https://www.bikewale.com/" target="_blank" rel="noopener noreferrer">
                            <img src="/svg/bikewale.svg" alt="BikeWale" className="h-8 sm:h-10 lg:h-22 w-auto" />
                        </a>
                        <a href="https://www.cartrade.com/" target="_blank" rel="noopener noreferrer">
                            <img src="/svg/cartrade.svg" alt="CarTrade" className="h-8 sm:h-10 lg:h-22 w-auto" />
                        </a>
                        <a href="https://www.mobilityoutlook.com/" target="_blank" rel="noopener noreferrer">
                            <img src="/svg/mobility.svg" alt="Mobility Outlook" className="h-8 sm:h-10 lg:h-22 w-auto" />
                        </a>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm gap-4">
                        <p>Help - Sitemap</p>
                        <p>All rights reserved © 2006-2025 OLX</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer