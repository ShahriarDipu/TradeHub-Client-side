import React, { use, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { BsBoxSeam } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import { Sun, Moon } from "lucide-react";

import {
  FiGrid,
  FiBox,
  FiDownload,
  FiPlusCircle,
  FiUser,
  FiLogOut
} from "react-icons/fi";

import '../../../App.css';
import { AuthContext } from '../../../Context/AuthContext';
import DarkModeToggle from '../DarkModeToggle';
const Navbar = () => {
 const [theme, setTheme]=useState(localStorage.getItem('theme')||"light")

  const{user,signOutWithGoogle,} =use(AuthContext)
 console.log(user)

useEffect(()=>{
  const html =document.querySelector('html')
  html.setAttribute("data-theme", theme)
  localStorage.setItem("theme",theme)
},[theme])

 const handleTheme=(checked)=>{

setTheme(checked? "night":"light")
 }






 const links = <div className='flex flex-col md:flex-row  text-lg '>
<li 
className='px-4 py-2 rounded-lg font-medium transition-all duration-200 text-base-content hover:bg-orange-50 hover:text-orange-600'> <NavLink to="/">Home</NavLink></li> 
 <li className='px-4 py-2 rounded-lg font-medium transition-all duration-200 text-base-content hover:bg-orange-50 hover:text-orange-600'><NavLink to="AllProducts">All Products</NavLink></li> 
   <li className='px-4 py-2 rounded-lg font-medium transition-all duration-200 text-base-content hover:bg-orange-50 hover:text-orange-600'><NavLink to="/About">About Us</NavLink></li> 
     <li className='px-4 py-2 rounded-lg font-medium transition-all duration-200 text-base-content hover:bg-orange-50 hover:text-orange-600'><NavLink to="/Contact">Contact Us</NavLink></li>
{/* {
  user && <>
       <li className='px-4 py-2 rounded-lg font-medium transition-all duration-200 text-base-content hover:bg-orange-50 hover:text-orange-600'><NavLink to="AddExports"> Add Export</NavLink></li>
      <li className='px-4 py-2 rounded-lg font-medium transition-all duration-200 text-base-content hover:bg-orange-50 hover:text-orange-600'><NavLink to="MyExports">My Exports</NavLink></li>

       <li className='px-4 py-2 rounded-lg font-medium transition-all duration-200 text-base-content hover:bg-orange-50 hover:text-orange-600'><NavLink to="MyImports">My Imports</NavLink></li>
    
    </>
} */}
 </div>


const handleSignOut=()=>{
   signOutWithGoogle()
   .then(result=>{
    console.log(result)
   })
   .catch(error=>{
    console.log(error)
   })
}
  return (
    <div className='w-full sm:w-15/17 mx-auto'>





        <div className="navbar bg-base-100 z-30">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    
      <li className="flex items-center gap-2 group ">
                <div className="w-12 hidden md:flex h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                 <BsBoxSeam className='text-white  text-3xl'/>
                </div>
                <div>   
               
                  <h1 className='text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-400 bg-clip-text text-transparent'>TradeHub</h1>
                
<p className='text-sm hidden sm:block'>Global MarketPlace</p></div>
              </li>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">

 <button
  onClick={() =>
    handleTheme(localStorage.getItem("theme") !== "night")
  }
  aria-label="Toggle theme"
  className="mr-4 p-2 rounded-lg transition
             hover:bg-orange-100 dark:hover:bg-gray-700"
>
  {localStorage.getItem("theme") === "night" ? (
    <Moon className="w-5 h-5 text-orange-400" />
  ) : (
    <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
  )}
</button>


  {
    user ?  (

        <>

        {user.photoURL && (
             
  <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
             
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 mr-2 rounded-full border-2 border-orange-500"
              />
            
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       <div className="mt-4">
        <p className="text-xs text-gray-400 font-semibold mb-2 px-2">
          TRADING
        </p>
    <Link to="/dashboard" >
        <li>       <a href="" className='text-sm'> <FiGrid className='text-xl'/>Dashboard </a>     </li>
        </Link>
      </div>
        <div className="my-4">
        <p className="text-xs text-gray-400 font-semibold mb-2 px-2">
          ACCOUNT
        </p>

       <Link to="/profile"><li >      <a href="" className='text-sm'> <FiUser  className='text-xl' />Profile Settings</a>     </li>
        </Link> 
      </div>
        
        <li>
  <a   onClick={handleSignOut} className="btn"> <LuLogOut />Sign Out</a> 

        </li>
      </ul>
    </div>
            )}
          
       

         </>
    )
    
   
    :   <NavLink 
      className={({ isActive }) =>
    isActive
      ? "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-orange-50 text-orange-600"
      : " flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
  }

    
    to="LoginRegister">
        <LuLogIn className="text-lg" />
        Sign In</NavLink>
  }
    {/* <NavLink to="LoginRegister">Login/Register</NavLink> */}
  </div>
</div>


    </div>

  )
}

export default Navbar
