import React from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { BsArrowBarLeft, BsBoxSeam } from 'react-icons/bs';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { LuPackagePlus } from 'react-icons/lu';
import { TbPackageExport, TbPackageImport } from 'react-icons/tb';
import { Link, Outlet,NavLink } from 'react-router'


const Dashboard = () => {
    const menuClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2 transition-all
   ${
     isActive
       ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
       : "text-gray-700 hover:bg-base-300"
   }`;

  return (
    <div>
<div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
<div className="drawer-content">
  {/* Navbar */}
  <nav className="navbar w-full bg-orange-50 dark:bg-gray-900 dark:text-gray-300 px-4 shadow-sm">
    
    {/* Left: Drawer Toggle + Title */}
    <div className="flex items-center gap-3">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
<FaArrowRightArrowLeft className='text-base'/>
      </label>

      <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
        Dashboard
      </h1>
    </div>

    {/* Right: Back to Home */}
    <div className="ml-auto">
      <a
        href="/"
        className="
          flex items-center gap-2
          rounded-lg px-4 py-2
          text-sm font-medium
          text-gray-700
          border border-gray-200
          hover:bg-base-300
          transition
          dark:text-gray-300
        "
      >
        {/* Home Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-4"
          
        >
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M9 21v-8h6v8" />
        </svg>

        Back to Home
      </a>
    </div>
  </nav>

  {/* Page content */}
  <div className="p-4 dark:text-gray-300">
    <Outlet />
  </div>
</div>


  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-orange-50  is-drawer-close:w-17 is-drawer-open:w-64 dark:bg-gray-900">
      {/* Sidebar content here */}
   <ul className="menu w-full grow gap-2 px-2  mt-2">
 
      <li className="flex flex-row gap-2 ml-1 mb-5 ">
                <div className="w-12 md:flex h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                 <BsBoxSeam className='text-white  text-3xl'/>
                </div>
            
              </li>
  {/* Dashboard */}
  <li>
    <NavLink
      to="/dashboard"
      end
      className={menuClass}
      data-tip="Dashboard"
    >
      <svg className="size-5 dark:text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
      <span className="is-drawer-close:hidden font-medium dark:text-gray-300" >Dashboard View</span>
    </NavLink>
  </li>

  {/* My Exports */}
  <li>
    <NavLink to="/dashboard/MyExports" className={menuClass}>
     <TbPackageExport className='text-2xl dark:text-gray-300' />
      <span className="is-drawer-close:hidden dark:text-gray-300">My Exports</span>
    </NavLink>
  </li>

  {/* My Imports */}
  <li>
    <NavLink to="/dashboard/AddImports" className={menuClass}>
      <TbPackageImport className='text-2xl dark:text-gray-300' />
      <span className="is-drawer-close:hidden dark:text-gray-300" >My Imports</span>
    </NavLink>
  </li>

  {/* Add Product */}
  <li>
    <NavLink to="/dashboard/AddExports" className={menuClass}>
      <LuPackagePlus className='text-2xl dark:text-gray-300'/>
      <span className="is-drawer-close:hidden dark:text-gray-300">Add Product</span>
    </NavLink>
  </li>

</ul>


    </div>
  </div>
</div>



    </div>
  )
}

export default Dashboard