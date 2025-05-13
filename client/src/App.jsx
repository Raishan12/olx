import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Postad from './pages/Postad/Postad'
import Login from './pages/login/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post' element={<Postad />} />
        <Route path='/login/:id' element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
