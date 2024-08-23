import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import {Home, Login, Register, Navbar, ArticleDetail, CreateArticle, EditArticle} from './components'
import AuthService from './service/auth'
import { useDispatch } from 'react-redux'
import { signUserSuccess } from './slice/auth'
import { getItem } from './helpers/persistence-storage'


const App = () => {
  const dispatch = useDispatch()
  const getUser = async() => {
    try {
      const response = await AuthService.getUser()
      dispatch(signUserSuccess(response.user))      
    } catch (error) {
      console.log(error);
      
    }
  }


useEffect(() => {
  const token = getItem('token')
  if (token) {
    getUser()
  }

}, [])


  return (
    
    <div>
      <Navbar/>
      <div className='container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/article/:slug" element={<ArticleDetail/>} />
        <Route path="/create-article" element={<CreateArticle/>} />
        <Route path="/edit-article/:slug" element={<EditArticle/>} />
      </Routes>
      </div>
    </div>
  )
}

export default App
