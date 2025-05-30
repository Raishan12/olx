import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Postad from './pages/Postad/Postad'
import Login from './pages/login/Login'
import Car from './pages/Postad/sub/Car'
import Preview from './pages/preview/Preview'
import Nav from './components/nav/nav'
import Bike from './pages/Postad/sub/Bike'
import Wishlist from './pages/wishlist/wishlist'
import Categories from './pages/categories/Categories'
import Viewprofile from './pages/viewprofile/Viewprofile'
import Editprofiledetails from './pages/editprofile/Editprofiledetails'
import Myads from './pages/myads/Myads'
import Mobile from './pages/Postad/sub/Mobile'

const App = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const location = useLocation()

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <>
      {/* <BrowserRouter> */}
      {
        ["/post", "/addcar", "/bike", "/mobile"].includes(location.pathname) ? (
          <Nav />
        ) : (
          <Navbar onSearch={handleSearch} />
        )
      }
      <Routes>
        <Route path="/" element={<Home searchResults={searchQuery} />} />
        <Route path='/post' element={<Postad />} />
        <Route path='/login/:id' element={<Login />} />
        <Route path='/addcar' element={<Car />} />
        <Route path='/bike' element={<Bike />} />
        <Route path='/preview/:productId' element={<Preview />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path="/categories/:category" element={<Categories />} />
        <Route path='/profile' element={<Viewprofile />} />
        <Route path="/editprofiledetails" element={<Editprofiledetails />} />
        <Route path="/myads" element={<Myads />} />
        <Route path="/mobile" element={<Mobile />} />
      </Routes>
      <Footer />
      {/* </BrowserRouter> */}

    </>
  )
}

export default App
