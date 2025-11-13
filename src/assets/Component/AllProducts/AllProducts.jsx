import React, { useEffect, useState } from 'react'
import { Products } from '../Products/Products';

export const AllProducts = () => {

  const [allProducts,setAllProducts]=useState([])
const [search, setSearch] = useState("");
  


useEffect(() => {
  fetch("http://localhost:3000/products")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setAllProducts(data);
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);

console.log(allProducts)

//filtered products based on search input
//when there is no item in includes so it return a true with empty string
//thats mean it is true for every product and show every item

  const filteredProducts =allProducts.filter((product)=>{//filter and return a full product who pass the below match
     const titleMatch = product.title.toLowerCase().includes(search.toLowerCase());//match with the title with search if true
                                                                                  
   const countryMatch = product.origin_country.toLowerCase().includes(search.toLowerCase());//match with country if true
 
 return titleMatch || countryMatch;//when it return true filter return the full array of product
 
  })



  return (
    <div className="p-6 py-15">
      <h1 className="text-2xl font-bold mb-6  text-center">All Products</h1>


      <div className="flex justify-center mb-15">
        <input
          type="text"
          placeholder="Search by product name or country..."
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}/// every time we type something goes to state
                                                     // from state it goes to filter
        />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15 w-15/17 mx-auto">
        {filteredProducts.length > 0 ? (///if filter matched any len
          filteredProducts.map((product) => (
            <Products key={product._id} Products={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
    
  )
}
