import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'

const Tasks = () => {
    const username = useSelector((store)=>store.auth)
    // console.log(username.user?.username);
    
  return (
    <div className='flex'>
        {/* {username.user?.username} */}
        <Sidebar/>
        <Main/>
    </div>
  )
}

export default Tasks