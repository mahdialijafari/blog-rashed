import React from 'react'
import { Footer, Navbar } from './Components'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Auth, Home, NotFound, PostDetails, Posts, Profile } from './Pages'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <>
     <Navbar/>
     <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/posts/:categoryId/categoryName' element={<Posts/>} />
        <Route path='/auth' element={token?<Navigate to={'/profile'} />:<Auth/>} />
        <Route path='/profile' element={!token?<Navigate to={'/auth'} />:<Profile/>} />
        <Route path='/posts/:categoryId/categoryName' element={<PostDetails/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes> 
      <Footer/>
      <Toaster/>
    </>
  )
}
