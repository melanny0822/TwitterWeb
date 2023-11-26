import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Sidebar from './ui/Sidebar'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Followers from './pages/Followers'
import Publications from './pages/Publications'
import firebase, {FirebaseContext} from './firebase'


const App = () => {
  return (
    <FirebaseContext.Provider value={{firebase}} >
      <div className='flex h-screen'>
        <Sidebar/>
        <div className='md: w-3/5 xl:w-4/5 p-6'>
          <Routes className='md: w-3/5 xl:w-4/5 p-6'>
            <Route path='/' element={<Register/>}/>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/Register' element={<Register/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Followers' element={<Followers/>}/>
            <Route path='/Publications' element={<Publications/>}/>
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
      
  )
}

export default App