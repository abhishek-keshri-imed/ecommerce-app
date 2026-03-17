import React, { useRef, useState } from "react";
import { BsImages } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const SellerAddProduct = () => {
  const fileRef = useRef(null); // Uncontrolled
  const [loading, setLoading] = useState(false);

  // Controlled form state
  const [state, setState] = useState({
    name: "",
    category: "Electronics",
    price: "",
    discount: 0,
    stock: "",
  });

  // store files + preview URLs separately
  const [images, setImages] = useState([]);

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleImageChange = () => {
    const files = Array.from(fileRef.current.files);

    // 1. Format Validation (JPEG, JPG, PNG only)
    const allowedTypes = ["image/jpeg", "image/png"];
    const invalidFile = files.find((file) => !allowedTypes.includes(file.type));
    if (invalidFile) {
      toast.error(
        "Invalid file format. Please upload only JPEG or PNG images.",
      );
      fileRef.current.value = null; // Clear the input
      return;
    }

    // 2. Quantity Validation
    if (images.length + files.length > 5) {
      toast.error("You can only upload a maximum of 5 images");
      fileRef.current.value = null;
      return;
    }

    // 3. Process valid files
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    // Clear the ref value so the same file can be re-selected if removed
    fileRef.current.value = null;
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index].preview);
    setImages(images.filter((_, i) => i !== index));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!state.name || !state.price || !state.stock) {
      toast.error("Please fill in all required fields!");
      setLoading(false);
      return;
    }

    try {
      // Example payload
      const formData = new FormData();
      Object.entries(state).forEach(([key, value]) =>
        formData.append(key, value),
      );
      images.forEach((img) => formData.append("images", img.file));

      console.log("Submitting product…");
      await new Promise((r) => setTimeout(r, 1500));

      toast.success("Product added successfully!");

      // cleanup
      images.forEach((img) => URL.revokeObjectURL(img.preview));
      setImages([]);
      setState({
        name: "",
        category: "Electronics",
        price: "",
        discount: 0,
        stock: "",
      });
      fileRef.current.value = null;
    } catch {
      toast.error("Failed to submit product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] p-4 lg:p-7">
      <Toaster position="top-right" />
      <div className="bg-white p-6 lg:p-8 rounded-2xl border shadow-sm overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Add Product</h2>

        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Controlled inputs */}
          <input
            name="name"
            value={state.name}
            onChange={inputHandle}
            placeholder="Product Name"
            className="p-3 border rounded-xl"
          />

          <select
            name="category"
            value={state.category}
            onChange={inputHandle}
            className="p-3 border rounded-xl"
          >
            <option>Electronics</option>
            <option>Fashion</option>
          </select>

          <input
            name="price"
            type="number"
            value={state.price}
            onChange={inputHandle}
            placeholder="Price"
            className="p-3 border rounded-xl"
          />

          <input
            name="discount"
            type="number"
            value={state.discount}
            onChange={inputHandle}
            min="0"
            max="100"
            placeholder="Discount"
            className="p-3 border rounded-xl"
          />

          <input
            name="stock"
            type="number"
            value={state.stock}
            onChange={inputHandle}
            placeholder="Stock"
            className="p-3 border rounded-xl"
          />

          {/* Uncontrolled File Input */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-bold">
              Product Images
            </label>
            <label className="h-32 border-dashed border-2 rounded-xl flex flex-col justify-center items-center cursor-pointer">
              <BsImages size={24} />
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/jpeg,image/png"
                onChange={handleImageChange}
                className="hidden"
              />            </label>

            <div className="grid grid-cols-4 gap-4 mt-4">
              {images.map((img, i) => (
                <div key={i} className="relative h-28">
                  <img
                    src={img.preview}
                    alt="preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1"
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl"
            >
              {loading ? <ClipLoader size={14} color="white" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerAddProduct;
