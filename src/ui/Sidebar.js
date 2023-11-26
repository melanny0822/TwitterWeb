import React from 'react'
import { NavLink } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse, faUserPlus, faUser, faUserGroup, faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'


const Sidebar = () => {
  return (
    <div className='bg-gray-200 h-full w-1/5 p-4'>
        
        <div className='mb-4 p-2 hover:bg-gray-300 hover:text-black-900 rounded-full'>
            <FontAwesomeIcon icon={faTwitter} size="2xl" style={{color: "#2563EB",}} />
            <NavLink className="text-xl font-bold mb-4 uppercase text-center text-blue-600" end to="/Home"> Twitter </NavLink>
        </div>
    
        <div className="p-2 text-2x1 mt-2 text-black hover:bg-gray-300 hover:text-black-900 rounded-full">
          <FontAwesomeIcon icon={faHouse} size="xl" style={{color: "#000000",}} />
          <NavLink className="pl-flex font-bold" end to="/Home"> Home </NavLink>
        </div>

        <div className="p-2 text-2x1 mt-2 text-black hover:bg-gray-300 hover:text-black-900 rounded-full">
          <FontAwesomeIcon icon={faUserPlus} size="xl" style={{color: "#000000",}}/>
          <NavLink className="pl-flex" end to="/Register"> Register </NavLink>
        </div>

        <div className="p-2 text-2x1 mt-2 text-black hover:bg-gray-300 hover:text-black-900 rounded-full">
          <FontAwesomeIcon icon={faUser} size="xl" style={{color: "#000000",}}/>
          <NavLink className="pl-flex " end to="/Login"> Login </NavLink>
        </div>

        <div className="p-2 text-2x1 mt-2 text-black hover:bg-gray-300 hover:text-black-900 rounded-full">
          <FontAwesomeIcon icon={faUserGroup} size="xl" style={{color: "#000000",}}/>
          <NavLink className="pl-flex " end to="/Followers"> Followers </NavLink>
        </div>
        
        <div className="p-2 text-2x1 mt-2 text-black hover:bg-gray-300 hover:text-black-900 rounded-full">
          <FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#000000",}}/>
          <NavLink className="pl-flex " end to="/Publications"> Publications </NavLink>
        </div> 
        
        <div className='mt-2'>
          <button className="p-2 text-2x1 mt-2 text-black hover:bg-gray-300 hover:text-black-900 rounded-full">
            <NavLink className="pl-flex " end to="/"> Logout </NavLink>
          </button>
        </div>
      
    </div>
  )
}

export default Sidebar
