import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaStar, FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export const MyImports = () => {
  const [imports, setImports] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // for modal
  const navigate = useNavigate();

  //  Fetch ALL imports from database
  useEffect(() => {
    fetch("http://localhost:3000/imports")
      .then((res) => res.json())
      .then((data) => setImports(data.reverse()))
      .catch((err) => console.error("Error fetching imports:", err));
  }, []);

  // Handle delete confirm
  const handleConfirmDelete = () => {
    fetch(`http://localhost:3000/imports/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setImports(imports.filter((item) => item._id !== deleteId));
        setDeleteId(null);
        toast.success("Import deleted successfully!");
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        toast.error("Failed to delete import!");
      });
  };

  return (
    <div className="p-6 min-h-screen ">
      <h1 className="text-2xl font-bold mb-8 text-center">My Imported Products</h1>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-15/17 mx-auto">
        {imports.map((item) => (
          <div
            key={item._id}
            className=" rounded-2xl shadow-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
     
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-90 object-cover"
              />

              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                 {item.quantity} imported
              </span>

              <span className="absolute top-3 right-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
                <FaStar className="text-yellow-400" /> 4.5
              </span>
            </div>

         
            <div className="p-4">
              <h3 className="text-lg font-semibold capitalize mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                <FaMapMarkerAlt className="text-orange-500" /> {item.origin_country}
              </p>

              <p className="text-sm text-gray-700">Total Cost</p>
              <p className="text-xl font-bold text-orange-600 mb-4">
                ${item.totalPrice}
              </p>

    
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate(`/products/${item.product_id}`)}
                  className="flex-1 border border-gray-300 rounded-lg py-2 font-medium hover:bg-gray-100 transition"
                >
                  See Details
                </button>
                <button
                  onClick={() => setDeleteId(item._id)} // open modal
                  className="ml-2 p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

   {/* Custom Delete Confirmation popup system  */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-sm p-6 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Are you sure you want to delete this imported product? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
