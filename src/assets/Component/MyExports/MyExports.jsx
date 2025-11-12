import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext"; // adjust path
import { FaBoxOpen, FaMapMarkerAlt, FaStar, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

export const MyExports = () => {
  const { user } = useContext(AuthContext);
  const [exports, setExports] = useState([]);

  useEffect(() => {
    // Fetch products created by this user
    const url = user?.email
      ? `http://localhost:3000/products?email=${user.email}`
      : "http://localhost:3000/products";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setExports(data.reverse()))
      .catch((err) => console.error("Error loading exports:", err));
  }, [user]);

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("❗Are you sure you want to delete this export?")) {
      fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          setExports(exports.filter((item) => item._id !== id));
          toast.success("Export deleted successfully!");
        })
        .catch(() => toast.error("Failed to delete export!"));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Exported Products</h1>

      {exports.length === 0 ? (
        <p className="text-center text-gray-500">You haven't added any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exports.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Exported
                </span>
                <span className="absolute top-3 right-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
                  <FaStar className="inline text-yellow-400 mr-1" />
                  {item.rating}
                </span>
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold capitalize">{item.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-orange-500" /> {item.origin_country}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-xl font-bold text-orange-600">${item.price}</p>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-100 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
