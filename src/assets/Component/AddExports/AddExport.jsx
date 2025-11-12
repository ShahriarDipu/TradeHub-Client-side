import React, { use, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { FaBoxOpen } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
const AddExport = () => {
  
const { user } = use(AuthContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    origin_country: "",
    rating: "",
    available_quantity: "",
    category: "",
    image: "",
    description: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert numeric values properly
   const productData = {
    ...formData,
    email: user?.email, // 👈 add logged-in user's email here
    price: parseFloat(formData.price),
    rating: parseFloat(formData.rating),
    available_quantity: parseInt(formData.available_quantity),
    createdAt: new Date(),
  };

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("✅ Product added successfully!");
        navigate("/allproducts"); // redirect to All Products page
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ Failed to add product.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaBoxOpen className="text-orange-500 text-3xl" />
          <div>
            <h1 className="text-2xl font-bold">Add Export Product</h1>
            <p className="text-gray-500 text-sm">
              List a new product for export
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-lg font-semibold mb-2">Product Information</h2>

          {/* Product Name and Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Product Name *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter product name"
                className="border rounded-lg w-full p-2 mt-1 focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Price (USD) *</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                className="border rounded-lg w-full p-2 mt-1 focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Country & Rating */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Origin Country *</label>
              <input
                type="text"
                name="origin_country"
                value={formData.origin_country}
                onChange={handleChange}
                required
                placeholder="e.g., United States"
                className="border rounded-lg w-full p-2 mt-1 focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Rating (1–5) *</label>
              <input
                type="number"
                name="rating"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                required
                className="border rounded-lg w-full p-2 mt-1 focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Quantity & Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Available Quantity *</label>
              <input
                type="number"
                name="available_quantity"
                value={formData.available_quantity}
                onChange={handleChange}
                required
                className="border rounded-lg w-full p-2 mt-1 focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Electronics"
                className="border rounded-lg w-full p-2 mt-1 focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium">Product Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
              className="border rounded-lg w-full p-2 mt-1 focus:ring-2 focus:ring-orange-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Use Unsplash or similar for sample images.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe your product..."
              className="border rounded-lg w-full p-2 mt-1 focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
            >
              ➕ Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExport;
