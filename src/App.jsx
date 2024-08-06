import { useState } from 'react'
import SignUp from './pages/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Tasks from './pages/Tasks'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<SignUp/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/tasks' element = {<Tasks/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
