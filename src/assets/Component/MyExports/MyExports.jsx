import React, { useEffect, useState, useContext, use } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { FaBoxOpen, FaMapMarkerAlt, FaStar, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";

export const MyExports = () => {
  const { user } = use(AuthContext);
  const [exports, setExports] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});

  // ✅ Load all products for this user
  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/products?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setExports(data.reverse()))
      .catch((err) => console.error("Error loading exports:", err));
  }, [user]);

  // ✅ Delete export
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

  // ✅ Open edit modal
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  // ✅ Handle update
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/products/${editingProduct._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("✅ Product updated successfully!");
        setEditingProduct(null);
        setExports((prev) =>
          prev.map((item) =>
            item._id === editingProduct._id ? { ...item, ...formData } : item
          )
        );
      })
      .catch(() => toast.error("Failed to update product!"));
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
                  {item.available_quantity} available
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-100 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Update Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-1 text-orange-600 flex items-center gap-2">
              ✏️ Update Product
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Make changes to your product information
            </p>

            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="border rounded-lg p-2 col-span-1"
              />
              <input
                type="number"
                placeholder="Price (USD)"
                value={formData.price || ""}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
                className="border rounded-lg p-2 col-span-1"
              />
              <input
                type="text"
                placeholder="Origin Country"
                value={formData.origin_country || ""}
                onChange={(e) =>
                  setFormData({ ...formData, origin_country: e.target.value })
                }
                required
                className="border rounded-lg p-2 col-span-1"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Rating (1–5)"
                value={formData.rating || ""}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
                required
                className="border rounded-lg p-2 col-span-1"
              />
              <input
                type="number"
                placeholder="Available Quantity"
                value={formData.available_quantity || ""}
                onChange={(e) =>
                  setFormData({ ...formData, available_quantity: e.target.value })
                }
                required
                className="border rounded-lg p-2 col-span-1"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category || ""}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border rounded-lg p-2 col-span-1"
              />
              <input
                type="text"
                placeholder="Product Image URL"
                value={formData.image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
                className="border rounded-lg p-2 col-span-2"
              />
              <textarea
                placeholder="Description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="3"
                className="border rounded-lg p-2 col-span-2"
              />

              {/* Buttons */}
              <div className="flex justify-end col-span-2 gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
