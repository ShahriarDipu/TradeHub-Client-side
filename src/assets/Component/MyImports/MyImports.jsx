import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaStar, FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthContext";


export const MyImports = () => {
  const { user } = use(AuthContext);
  const [imports, setImports] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // for modal
  const navigate = useNavigate();

  //  Fetch ALL imports from database
  useEffect(() => {
if(!user?.email) return

    fetch(`https://assignment-10-server-six-ivory.vercel.app/imports?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setImports(data.reverse()))
      .catch((err) => console.error("Error fetching imports:", err));
  }, [user?.email]);

if (!imports || imports.length === 0) {
  return (
    <p className="text-center my-50 text-gray-500">
      <span className="loading loading-infinity loading-xl"></span>
    </p>
  );
}



  // Handle delete confirm
  const handleConfirmDelete = () => {
    fetch(`https://assignment-10-server-six-ivory.vercel.app/imports/${deleteId}`, {
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
    <div className="p-6 min-h-screen pb-15 dark:bg-gray-700 ">
      <h1 className="text-2xl font-bold mb-8 text-center">My Imported Products</h1>

   
      <div className="max-w-5xl mx-auto space-y-4">
  {imports.map((item) => (
    <div
      key={item._id}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4
                 bg-white dark:bg-gray-800 rounded-2xl shadow
                 p-4 hover:shadow-lg transition"
    >
      {/* IMAGE */}
      <div className="relative flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-xl"
        />

        <span className="absolute -top-2 -left-2 bg-green-500 text-white
                         text-xs font-semibold px-2 py-1 rounded-full shadow">
          {item.quantity} imported
        </span>
      </div>

      {/* INFO */}
      <div className="flex-1 w-full">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold dark:text-gray-200">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <FaMapMarkerAlt className="text-orange-500" />
              {item.origin_country}
            </p>
          </div>

       
        </div>

        <div className="mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Cost</p>
          <p className="text-xl font-bold text-orange-600">
            ${item.totalPrice}
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 w-full sm:w-auto">
        <button
          onClick={() => navigate(`/products/${item.product_id}`)}
          className="flex-1 sm:flex-none px-4 py-2 border rounded-lg
                     text-sm font-medium
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          See Details
        </button>

        <button
          onClick={() => setDeleteId(item._id)}
          className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
        >
          <FaTrashAlt />
        </button>
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
