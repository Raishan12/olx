import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Postad from './pages/Postad/Postad'

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Postad />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
