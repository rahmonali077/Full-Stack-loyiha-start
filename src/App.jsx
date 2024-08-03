import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {Home, Login, Register, Navbar} from './components'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
