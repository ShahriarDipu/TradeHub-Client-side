import React from 'react'
import { FaBoxOpen } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
export const EachLatestProduct = ({eachLatestProduct}) => {

    const {title,available_quantity,origin_country,rating,price,image}=eachLatestProduct;

 
  return (
    
     <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover"
        />

        {/* Quantity Badge */}
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          <FaBoxOpen className="inline mr-1" /> {available_quantity} left
        </span>
      </div>

      {/* Details Section */}
      <div className="p-4">
        {/* Title + Rating Row */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold capitalize">{title}</h3>
          <span className="bg-white border border-orange-500 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
            <FaStar className="text-yellow-400" /> {rating}
          </span>
        </div>

        {/* Country */}
        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
          <FaMapMarkerAlt className="text-orange-500" />
          {origin_country}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-xl font-bold text-orange-600">${price}</p>

        <button
         // to={`/product/${_id}`}
  className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow 
             transition-all duration-300 bg-[length:200%_200%] bg-left hover:bg-right"
>
  See Details
</button>

        </div>
      </div>
    </div>
  )
}
