import { useState } from 'react'
import SignUp from './components/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<SignUp/>}/>
          <Route path='/login' element = {<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
