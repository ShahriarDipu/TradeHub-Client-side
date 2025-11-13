import React, {use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaStar, FaMapMarkerAlt, FaBoxOpen, FaArrowLeft } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { AuthContext } from "../../../Context/AuthContext";

const ProductDetails = () => {
    const {user}=use(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  const { _id, image, title, price, origin_country, rating, available_quantity } = product;

  // ✅ Handle Import Submit
  const handleImport = () => {
    const importData = {
      product_id: _id,
      title,
      price,
      image,
      origin_country,
      quantity,
      totalPrice: price * quantity,
      date: new Date(),
       email: user?.email,
    };

    fetch("http://localhost:3000/imports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(importData),
    })
      .then((res) => res.json())
      .then(() => {
        // reduce available quantity
        fetch(`http://localhost:3000/products/${_id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });
        setShowModal(false);
        navigate("/myimports");
      })
      .catch((err) => console.error("Import failed:", err));
  };

  return (
    <div className="min-h-screen  flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-6xl mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium transition"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <div className="max-w-6xl w-full  backdrop-blur-sm rounded-3xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-10">
        {/* Image */}
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="rounded-2xl w-full h-[500px] object-cover shadow-md"
          />
          <span className="absolute top-3 right-3 bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full shadow">
            ⭐ {rating}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-500 flex items-center gap-1 mb-4">
              <FaMapMarkerAlt className="text-orange-500" /> {origin_country}
            </p>

            <p className="text-3xl font-bold text-orange-600 mb-6">${price}</p>

            <div className="flex items-center justify-between bg-orange-50/40 rounded-xl px-4 py-3 mb-6">
              <div className="flex items-center gap-2">
                <FaBoxOpen className="text-orange-500 text-lg" />
                <p className="font-semibold text-gray-700">Availability:</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-semibold">In Stock</p>
                <p className="text-sm font-semibold text-gray-700">
                  {available_quantity} units
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              This is the description of the product.
            </p>
          </div>

          {/* Import Button */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 rounded-lg shadow hover:opacity-90 transition"
          >
            <FiShoppingCart className="text-lg" /> Import Now
          </button>
          <div className="mt-8 border-t pt-4 text-lg text-gray-900 grid grid-cols-2 gap-y-2">
            <p className="text-gray-600">Rating:</p>
            <p className="font-semibold">{rating} / 5</p>
            <p className="text-gray-600">Origin:</p>
            <p className="font-semibold capitalize">{origin_country}</p>
            <p className="text-gray-600">Price per unit:</p>
            <p className="font-semibold">${price}</p>
          </div>
        </div>
      </div>




      {/* ✅ Import Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
              <FaBoxOpen className="text-orange-500" /> Import Product
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Enter the quantity you want to import for <b>{title}</b>
            </p>

            {/* Quantity Input */}
            <label className="text-sm font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-lg w-full p-2 mt-1 mb-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <p className="text-gray-500 text-sm mb-4">
              Available: {available_quantity} units
            </p>

            {/* Price Summary */}
            <div className="bg-orange-50 p-3 rounded-lg text-sm mb-4">
              <p>Price per unit: <b>${price}</b></p>
              <p>Quantity: <b>{quantity}</b></p>
              <hr className="my-2" />
              <p>
                Total:{" "}
                <b className="text-orange-600">${(price * quantity).toFixed(2)}</b>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={quantity > available_quantity || quantity < 1}
                className={`px-4 py-2 rounded-lg text-white font-semibold shadow transition ${
                  quantity > available_quantity || quantity < 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-400 to-orange-600 hover:opacity-90"
                }`}
              >
                Import Now
              </button>

         
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

   