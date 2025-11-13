import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { FaMapMarkerAlt, FaStar, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";

export const MyExports = () => {
  const { user } = use(AuthContext);
  const [exports, setExports] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});

  // ✅ Load all products for this user
  const loadMyExports = () => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/products?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setExports(data.reverse()))
      .catch((err) => console.error("Error loading exports:", err));
  };

  useEffect(() => {
    loadMyExports();
  }, [user]);

  // ✅ Delete export
  const handleDelete = (id) => {
    if (window.confirm("❗Are you sure you want to delete this export?")) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Export deleted successfully!");
          setExports(exports.filter((item) => item._id !== id));
        })
        .catch(() => toast.error("Failed to delete export!"));
    }
  };

  // ✅ Open edit modal
  const handleEdit = (product) => {
    setEditingProduct(product);

    // Create clean edit object
    setFormData({
      title: product.title,
      price: product.price,
      origin_country: product.origin_country,
      rating: product.rating,
      available_quantity: product.available_quantity,
      category: product.category || "",
      image: product.image,
      description: product.description || "",
    });
  };

  // 🔥 FIXED UPDATE FUNCTION
  const handleUpdate = (e) => {
    e.preventDefault();

    // Convert numeric fields to numbers (backend requires numbers)
    const cleanedData = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
      available_quantity: Number(formData.available_quantity),
    };

    fetch(`http://localhost:3000/products/${editingProduct._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanedData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("✅ Product updated successfully!");
        setEditingProduct(null);
        loadMyExports(); // reload fresh updated data
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
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold capitalize">{item.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-orange-500" />{" "}
                  {item.origin_country}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-xl font-bold text-orange-600">${item.price}</p>

                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-md flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    {item.rating}
                  </span>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-lg transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-100 text-red-500 hover:bg-red-500 hover:text-white px-3 py-2 rounded-lg transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 FIXED UPDATE MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-1 text-orange-600">✏️ Update Product</h2>

            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border p-2 rounded-lg"
                required
              />

              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="border p-2 rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="Origin Country"
                value={formData.origin_country}
                onChange={(e) =>
                  setFormData({ ...formData, origin_country: e.target.value })
                }
                className="border p-2 rounded-lg"
                required
              />

              <input
                type="number"
                step="0.1"
                placeholder="Rating"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
                className="border p-2 rounded-lg"
                required
              />

              <input
                type="number"
                placeholder="Available Quantity"
                value={formData.available_quantity}
                onChange={(e) =>
                  setFormData({ ...formData, available_quantity: e.target.value })
                }
                className="border p-2 rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border p-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="border p-2 rounded-lg col-span-2"
                required
              />

              <textarea
                placeholder="Description"
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border p-2 rounded-lg col-span-2"
              />

              <div className="flex justify-end col-span-2 gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-orange-600 text-white font-semibold"
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
