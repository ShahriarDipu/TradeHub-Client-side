import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { FaMapMarkerAlt, FaStar, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";

export const MyExports = () => {
  const { user } = use(AuthContext);
  const [exports, setExports] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});
const [deleteId, setDeleteId] = useState(null);
const [loading, setLoading] = useState(true);

  // ✅ Load all products for this user
  const loadMyExports = () => {
    if (!user?.email) return;

    fetch(`https://assignment-10-server-six-ivory.vercel.app/products?email=${user.email}`)
      .then((res) => res.json())
       .then((data) => {
      setExports(data.reverse());
      setLoading(false);
    })
      .catch((err) => console.error("Error loading exports:", err));
  };

  useEffect(() => {
    loadMyExports();
  }, [user]);

  // ✅ Delete export
const handleDelete = () => {
  fetch(`https://assignment-10-server-six-ivory.vercel.app/products/${deleteId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      toast.success("Export deleted successfully!");
      setExports(exports.filter((item) => item._id !== deleteId));
      setDeleteId(null);
    })
    .catch(() => toast.error("Failed to delete export!"));
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

    fetch(`https://assignment-10-server-six-ivory.vercel.app/products/${editingProduct._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanedData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(" Product updated successfully!");
        setEditingProduct(null);
        loadMyExports(); // reload fresh updated data
      })
      .catch(() => toast.error("Failed to update product!"));
  };
if (loading) {
  return (
    <div className="flex justify-center my-20">
      <span className="loading loading-infinity loading-xl"></span>
    </div>
  );
}
if (!loading && exports.length === 0) {
  return (
    <p className="text-center text-gray-500 my-20">
      You haven't added any products yet.
    </p>
  );
}

  return (
    <div className="p-6 dark:bg-gray-700 h-screen ">
      <h1 className="text-2xl font-bold mb-6 text-center">My Exported Products</h1>

      
       <div className="max-w-5xl mx-auto space-y-4">
  {exports.map((item) => (
    <div
      key={item._id}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4
                 bg-white dark:bg-gray-800
                 rounded-2xl shadow
                 p-4 hover:shadow-lg transition"
    >
      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
      />

      {/* INFO */}
      <div className="flex-1 w-full">
        <h3 className="text-lg font-semibold capitalize dark:text-gray-200">
          {item.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <FaMapMarkerAlt className="text-orange-500" />
          {item.origin_country}
        </p>

        <div className="flex items-center gap-4 mt-2">
          <p className="text-xl font-bold text-orange-600">
            ${item.price}
          </p>

          <span className="text-xs bg-gray-200 dark:bg-gray-700
                           text-gray-800 dark:text-gray-200
                           px-2 py-1 rounded-md flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            {item.rating}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(item)}
          className="p-2 rounded-lg bg-blue-100 text-blue-600
                     hover:bg-blue-600 hover:text-white transition
                     dark:bg-blue-900 dark:text-blue-300"
        >
          <FaEdit />
        </button>

        <button
         onClick={() => setDeleteId(item._id)}

          className="p-2 rounded-lg bg-red-100 text-red-500
                     hover:bg-red-500 hover:text-white transition
                     dark:bg-red-900 dark:text-red-300"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  ))}
</div>

     

      {/* 🔥 FIXED UPDATE MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-white dark:bg-gray-900
                text-gray-900 dark:text-gray-200
                rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-1 text-orange-600"> Update Product</h2>

            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border p-2 rounded-lg
           bg-white dark:bg-gray-800
           text-gray-900 dark:text-gray-200
           border-gray-300 dark:border-gray-600"

                required
              />

              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="border p-2 rounded-lg
           bg-white dark:bg-gray-800
           text-gray-900 dark:text-gray-200
           border-gray-300 dark:border-gray-600"

                required
              />

              <input
                type="text"
                placeholder="Origin Country"
                value={formData.origin_country}
                onChange={(e) =>
                  setFormData({ ...formData, origin_country: e.target.value })
                }
              className="border p-2 rounded-lg
           bg-white dark:bg-gray-800
           text-gray-900 dark:text-gray-200
           border-gray-300 dark:border-gray-600"

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
             className="border p-2 rounded-lg
           bg-white dark:bg-gray-800
           text-gray-900 dark:text-gray-200
           border-gray-300 dark:border-gray-600"

                required
              />

              <input
                type="number"
                placeholder="Available Quantity"
                value={formData.available_quantity}
                onChange={(e) =>
                  setFormData({ ...formData, available_quantity: e.target.value })
                }
              className="border p-2 rounded-lg
           bg-white dark:bg-gray-800
           text-gray-900 dark:text-gray-200
           border-gray-300 dark:border-gray-600"

                required
              />

              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
             className="border p-2 rounded-lg
           bg-white dark:bg-gray-800
           text-gray-900 dark:text-gray-200
           border-gray-300 dark:border-gray-600"

              />

              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
            className="border p-2 rounded-lg
           bg-white dark:bg-gray-800
           text-gray-900 dark:text-gray-200
           border-gray-300 dark:border-gray-600"

                required
              />

              <textarea
                placeholder="Description"
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              className="border p-2 rounded-lg
           bg-white dark:bg-gray-800
           text-gray-900 dark:text-gray-200
           border-gray-300 dark:border-gray-600"

              />

              <div className="flex justify-end col-span-2 gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                className="px-4 py-2 border rounded-lg
           text-gray-700 dark:text-gray-300
           border-gray-300 dark:border-gray-600
           hover:bg-gray-100 dark:hover:bg-gray-800"

                >
                  Cancel
                </button>
                <button
                  type="submit"
                className="px-5 py-2 rounded-lg
           bg-orange-600 hover:bg-orange-700
           text-white font-semibold"

                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteId && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <div className="bg-white dark:bg-gray-900
                    text-gray-900 dark:text-gray-200
                    rounded-xl shadow-xl w-full max-w-sm p-6">
      
      <h3 className="text-lg font-semibold mb-2">
        Delete Product
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Are you sure you want to delete this product?  
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setDeleteId(null)}
          className="px-4 py-2 rounded-lg border
                     text-gray-700 dark:text-gray-300
                     border-gray-300 dark:border-gray-600
                     hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg
                     bg-red-600 hover:bg-red-700
                     text-white font-medium"
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
