import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Postad from './pages/Postad/Postad'
import Login from './pages/login/Login'
import Car from './pages/Postad/sub/Car'
import Preview from './pages/preview/Preview'

const App = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  
  return (
    <BrowserRouter>
      <Navbar onSearch={handleSearch} />
      <Routes>
      <Route path="/" element={<Home searchResults={searchQuery} />} />
        <Route path='/post' element={<Postad />} />
        <Route path='/login/:id' element={<Login />} />
        <Route path='/addcar' element={<Car />} />
        <Route path='/preview/:productId' element={<Preview />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
