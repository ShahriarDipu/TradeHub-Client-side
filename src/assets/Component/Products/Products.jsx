import React, { use } from 'react'
import { FaBoxOpen } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import ProductDetails from '../ProductDetails/ProductDetails';
import { NavLink } from 'react-router';
export const Products = ({Products}) => {
    const { _id, image, title, price, origin_country, rating, available_quantity } = Products;

   
    
  return (
   <div className=" rounded-2xl shadow-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-90 object-cover"
          />
  
     
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            <FaBoxOpen className="inline mr-1" /> {available_quantity} left
          </span>
        </div>
  
        <div className="p-4">
     
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold capitalize">{title}</h3>
            <span className="bg-white border border-orange-500 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
              <FaStar className="text-yellow-400" /> {rating}
            </span>
          </div>
 
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <FaMapMarkerAlt className="text-orange-500" />
            {origin_country}
          </p>
  
         
          <div className="flex items-center justify-between mt-3">
            <p className="text-xl font-bold text-orange-600">${price}</p>
  
         <NavLink
  to={`/products/${_id}`}
  className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow 
             transition-all duration-300 bg-[length:200%_200%] bg-left hover:bg-right"
>
  See Details
</NavLink>
  
          </div>
        </div>
      </div>
  )
}
