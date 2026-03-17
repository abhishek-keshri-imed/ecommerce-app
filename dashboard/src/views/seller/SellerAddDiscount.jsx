import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack, MdSave, MdPercent, MdEvent } from "react-icons/md";
import toast from "react-hot-toast";


const SellerAddDiscount = () => {
  const navigate = useNavigate();
  
  // Form State matching your new separate schema
  const [formData, setFormData] = useState({
    productId: "", // Selected from a list
    discountPercent: "",
    discountCode: "",
    startDate: "",
    endDate: "",
  });

  // Mock Products - In a real app, you'd fetch these from d.productId schema
  const products = [
    { _id: "p1", name: "Nike Air Max", price: 200 },
    { _id: "p2", name: "iPhone 15 Pro", price: 1200 },
    { _id: "p3", name: "Mechanical Keyboard", price: 150 },
  ];

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logic: Find the selected product to show a live price preview
  const selectedProduct = products.find(p => p._id === formData.productId);
  const finalPrice = selectedProduct 
    ? (selectedProduct.price - (selectedProduct.price * (formData.discountPercent / 100))).toFixed(2)
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call would go here: axios.post('/api/discount/add', formData)
    toast.success("Promotion created successfully!");
    navigate("/seller/products");
  };

  return (
    <div className="px-4 py-6 lg:px-8 bg-[#f8f9fa] min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">Create Promotion</h1>
          <p className="text-sm text-gray-500">Apply a new discount to an existing product</p>
        </div>
        <Link to="/seller/discounts" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-semibold transition-all">
          <MdArrowBack size={20} /> Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-5 border-b pb-2">Discount Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600">Select Product</label>
                <select 
                  name="productId"
                  onChange={handleInput}
                  required
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                >
                  <option value="">Choose a product...</option>
                  {products.map(p => <option key={p._id} value={p._id}>{p.name} (${p.price})</option>)}
                </select>
              </div>

              {/* Discount Code */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600">Coupon Code</label>
                <input 
                  type="text" 
                  name="discountCode"
                  placeholder="e.g. SUMMER50"
                  onChange={handleInput}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              {/* Percentage */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600">Discount Percentage (%)</label>
                <div className="relative">
                  <MdPercent className="absolute right-3 top-3 text-gray-400" />
                  <input 
                    type="number" 
                    name="discountPercent"
                    placeholder="20"
                    onChange={handleInput}
                    max="99"
                    min="1"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Validity Dates */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-600">Validity Period</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" name="startDate" onChange={handleInput} className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl" required />
                  <input type="date" name="endDate" onChange={handleInput} className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl" required />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Real-time Preview Card */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
            <h3 className="font-bold text-gray-700 mb-4">Price Preview</h3>
            
            <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-dashed border-emerald-200 flex flex-col items-center text-center">
              {formData.productId && formData.discountPercent ? (
                <>
                  <span className="text-xs font-bold text-emerald-600 uppercase mb-1">Final Customer Price</span>
                  <h2 className="text-4xl font-black text-emerald-700">${finalPrice}</h2>
                  <p className="text-xs text-emerald-500 mt-2 font-medium">
                    You are saving the customer ${ (selectedProduct.price - finalPrice).toFixed(2) }
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-400 italic">Select a product and enter a percentage to see the preview.</p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <MdSave size={20} /> Create Promotion
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SellerAddDiscount