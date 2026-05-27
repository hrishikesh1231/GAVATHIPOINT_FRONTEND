import React, { useState } from "react";

import axios from "axios";

import Swal from "sweetalert2";

import {
  FaPlusCircle,
  FaBox,
  FaCloudUploadAlt,
  FaTrash,
} from "react-icons/fa";

const AddProductForm = () => {

  const [formData, setFormData] =
    useState({

      name: "",
      description: "",
      price: "",
      stock: "",

    });

  const [images, setImages] =
    useState([]);

  const [previewImages, setPreviewImages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    if (
      (name === "price" ||
        name === "stock") &&
      value < 0
    ) {
      return;
    }

    setFormData({

      ...formData,

      [name]: value,

    });

  };

  // =========================
  // HANDLE IMAGE CHANGE
  // =========================

  const handleImageChange = (
    e
  ) => {

    const files = Array.from(
      e.target.files
    );

    // MAX 5 IMAGES

    if (
      files.length +
        images.length >
      5
    ) {

      Swal.fire({

        icon: "warning",

        title:
          "Maximum 5 Images",

        text:
          "You can upload only 5 product images.",

        confirmButtonColor:
          "#14532d",

      });

      return;

    }

    setImages((prev) => [
      ...prev,
      ...files,
    ]);

    // PREVIEW

    const previews =
      files.map((file) =>
        URL.createObjectURL(file)
      );

    setPreviewImages((prev) => [
      ...prev,
      ...previews,
    ]);

  };

  // =========================
  // REMOVE IMAGE
  // =========================

  const removeImage = (
    index
  ) => {

    const updatedImages =
      [...images];

    const updatedPreviews =
      [...previewImages];

    updatedImages.splice(
      index,
      1
    );

    updatedPreviews.splice(
      index,
      1
    );

    setImages(updatedImages);

    setPreviewImages(
      updatedPreviews
    );

  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "gavathi_token"
        );

      const data =
        new FormData();

      data.append(
        "name",
        formData.name
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "stock",
        formData.stock
      );

      // MULTIPLE IMAGES

      images.forEach((image) => {

        data.append(
          "images",
          image
        );

      });

      const response =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/products/add-product`,

          data,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }

        );

      // =========================
      // SUCCESS POPUP
      // =========================

      await Swal.fire({

        icon: "success",

        title:
          "Product Added",

        text:
          response.data.message,

        confirmButtonColor:
          "#14532d",

        background:
          "#ffffff",

        color:
          "#14532d",

        timer: 2000,

        showConfirmButton: false,

      });
      window.location.reload();

      // RESET

      setFormData({

        name: "",
        description: "",
        price: "",
        stock: "",

      });

      setImages([]);

      setPreviewImages([]);

    } catch (error) {

      console.log(error);

      Swal.fire({

        icon: "error",

        title:
          "Failed",

        text:
          "Failed to add product",

        confirmButtonColor:
          "#dc2626",

      });

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-white rounded-[30px] shadow-2xl p-4 sm:p-8 border border-green-100 overflow-hidden">

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">

        <div className="bg-[#14532d] p-4 rounded-2xl shadow-lg">

          <FaPlusCircle className="text-white text-2xl" />

        </div>

        <div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14532d]">

            Add New Product

          </h2>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">

            Add your village products professionally.

          </p>

        </div>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* PRODUCT NAME */}

        <div>

          <label className="block mb-2 font-bold text-gray-700">

            Product Name

          </label>

          <div className="relative">

            <FaBox className="absolute top-5 left-4 text-gray-400" />

            <input
              type="text"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-[#14532d] focus:ring-2 focus:ring-green-200 transition-all"
              required
            />

          </div>

        </div>

        {/* DESCRIPTION */}

        <div>

          <label className="block mb-2 font-bold text-gray-700">

            Product Description

          </label>

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            placeholder="Enter detailed product description"
            rows="5"
            className="w-full border border-gray-300 rounded-2xl px-4 py-4 outline-none focus:border-[#14532d] focus:ring-2 focus:ring-green-200 transition-all resize-none"
            required
          />

        </div>

        {/* PRICE + STOCK */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PRICE */}

          <div>

            <label className="block mb-2 font-bold text-gray-700">

              Product Price (₹)

            </label>

            <input
              type="number"
              name="price"
              value={
                formData.price
              }
              onChange={
                handleChange
              }
              placeholder="Enter product price"
              min="1"
              onWheel={(e) =>
                e.target.blur()
              }
              className="w-full border border-gray-300 rounded-2xl px-4 py-4 outline-none focus:border-[#14532d] focus:ring-2 focus:ring-green-200 transition-all"
              required
            />

          </div>

          {/* STOCK */}

          <div>

            <label className="block mb-2 font-bold text-gray-700">

              Available Stock

            </label>

            <input
              type="number"
              name="stock"
              value={
                formData.stock
              }
              onChange={
                handleChange
              }
              placeholder="Enter available stock"
              min="1"
              onWheel={(e) =>
                e.target.blur()
              }
              className="w-full border border-gray-300 rounded-2xl px-4 py-4 outline-none focus:border-[#14532d] focus:ring-2 focus:ring-green-200 transition-all"
              required
            />

          </div>

        </div>

        {/* MULTIPLE IMAGES */}

        <div>

          <label className="block mb-3 font-bold text-gray-700">

            Product Images

          </label>

          <label className="border-2 border-dashed border-green-300 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition-all duration-300">

            <FaCloudUploadAlt className="text-5xl text-[#14532d] mb-4" />

            <h2 className="text-xl font-bold text-[#14532d]">

              Upload Product Images

            </h2>

            <p className="text-gray-500 mt-2 text-center">

              Drag & drop or click to upload

            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="hidden"
            />

          </label>

          {

            previewImages.length > 0 && (

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">

                {

                  previewImages.map(

                    (
                      image,
                      index
                    ) => (

                      <div
                        key={index}
                        className="relative group"
                      >

                        <img
                          src={image}
                          alt="preview"
                          className="w-full h-32 object-cover rounded-2xl border border-green-100 shadow-md"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              index
                            )
                          }
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >

                          <FaTrash />

                        </button>

                      </div>

                    )

                  )

                }

              </div>

            )

          }

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#14532d] hover:bg-[#166534] text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:scale-[1.01] disabled:opacity-70"
        >

          {

            loading
              ? "Adding Product..."
              : "Add Product"

          }

        </button>

      </form>

    </div>

  );

};

export default AddProductForm;