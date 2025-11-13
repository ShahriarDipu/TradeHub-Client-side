import React from 'react'
import { NavLink } from 'react-router'

export const Banner = () => {
  return (
    <section className="relative h-[550px] flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920')]">
     
      <div className="absolute inset-0 bg-gradient-to-t from-[#8B1C00]/90 via-[#A62300]/70 to-[#BF360C]/60"></div>

    
      <div className="relative z-10 text-center text-white px-4 max-w-3xl">
        <h1 className="text-2xl md:text-5xl font-extrabold mb-4">
          Your Gateway to <span className="text-yellow-400">Global Trade</span>
        </h1>
        <p className="text-lg mb-6 text-gray-100">
          Connect with suppliers and buyers worldwide. Import the best products or
          export your offerings to a global marketplace.
        </p>

     
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-8 sm:mb-10">
          <NavLink to="AllProducts"
            href="#"
            className=" w-5/12  mx-auto bg-white text-orange-600 font-semibold px-2 md:px-6 py-3 rounded-md hover:bg-orange-100 transition"
          >
            Browse Products →
          </NavLink>
          
        </div>

       
        <div className="flex flex-wrap justify-center gap-4 text-center text-white/90 font-medium">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
            <h2 className="text-2xl font-bold text-white">1,000+</h2>
            <p className="text-sm">Active Products</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
            <h2 className="text-2xl font-bold text-white">500+</h2>
            <p className="text-sm">Global Traders</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
            <h2 className="text-2xl font-bold text-white">50+</h2>
            <p className="text-sm">Countries</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
            <h2 className="text-2xl font-bold text-white">99%</h2>
            <p className="text-sm">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
