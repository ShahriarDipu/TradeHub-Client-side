import React, { useEffect, useState } from "react";
import { Products } from "../Products/Products";

export const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("-created_date");

  // Fetch products
  useEffect(() => {
    fetch("https://assignment-10-server-six-ivory.vercel.app/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Loading state
  if (!allProducts || allProducts.length === 0) {
    return (
      <p className="text-center my-10 text-gray-500">
        <span className="loading loading-infinity loading-xl"></span>
      </p>
    );
  }

  // 🔍 Filter by search
  const filteredProducts = allProducts.filter((product) => {
    const titleMatch = product.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const countryMatch = product.origin_country
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return titleMatch || countryMatch;
  });

  // 🔃 Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "created_date": // Oldest first
        return new Date(a.created_date) - new Date(b.created_date);

      case "-created_date": // Newest first
        return new Date(b.created_date) - new Date(a.created_date);

      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      case "name-asc":
        return a.title.localeCompare(b.title);

      default:
        return 0;
    }
  });

  return (
    <div className="p-6 py-15">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Explore All Products
      </h1>

      {/* 🔍 Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by product name or country..."
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔃 Sort + Count */}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        {/* Left: Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="-created_date">Newest First</option>
          <option value="created_date">Oldest First</option>
          <option value="name-asc">Name: A–Z</option>
        </select>

        {/* Right: Count */}
        <p className="text-gray-600 text-sm">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {sortedProducts.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {allProducts.length}
          </span>{" "}
          products
        </p>
      </div>

      {/* 🛍 Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Products key={product._id} Products={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};
