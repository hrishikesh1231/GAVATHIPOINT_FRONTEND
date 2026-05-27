import React, {
  useState,
} from "react";

import toast from "react-hot-toast";

import axios from "axios";

import {
  X,
  ArrowLeft,
  Trash2,
  ImagePlus,
  Loader2,
  Save,
} from "lucide-react";

const EditProductModal = ({

  product,

  setShowEditModal,

  fetchData,

}) => {

  // =========================
  // STATES
  // =========================

  const [name, setName] =
    useState(product?.name || "");

  const [description, setDescription] =
    useState(
      product?.description || ""
    );

  const [price, setPrice] =
    useState(product?.price || "");

  const [stock, setStock] =
    useState(product?.stock || "");

  // EXISTING IMAGES

  const [existingImages, setExistingImages] =
    useState(product?.images || []);

  // NEW IMAGES

  const [images, setImages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // REMOVE EXISTING IMAGE
  // =========================

  const removeExistingImage = (
    indexToRemove
  ) => {

    const updatedImages =
      existingImages.filter(

        (_, index) =>
          index !== indexToRemove

      );

    setExistingImages(
      updatedImages
    );

  };

  // =========================
  // REMOVE NEW IMAGE
  // =========================

  const removeNewImage = (
    indexToRemove
  ) => {

    const updated =
      Array.from(images).filter(

        (_, index) =>
          index !== indexToRemove

      );

    setImages(updated);

  };

  // =========================
  // UPDATE PRODUCT
  // =========================

// =========================
// UPDATE PRODUCT
// =========================

const handleUpdate = async (
  e
) => {

  e.preventDefault();

  // =========================
  // VALIDATION
  // =========================

  if (
    !name ||
    !description ||
    !price ||
    !stock
  ) {

    toast.error(
      "Please fill all fields"
    );

    return;

  }

  if (
    existingImages.length === 0 &&
    images.length === 0
  ) {

    toast.error(
      "At least one image is required"
    );

    return;

  }

  try {

    setLoading(true);

    const token =
      localStorage.getItem(
        "gavathi_token"
      );

    const formData =
      new FormData();

    // =========================
    // TEXT DATA
    // =========================

    formData.append(
      "name",
      name
    );

    formData.append(
      "description",
      description
    );

    formData.append(
      "price",
      price
    );

    formData.append(
      "stock",
      stock
    );

    // =========================
    // REMAINING OLD IMAGES
    // =========================

    formData.append(

      "existingImages",

      JSON.stringify(
        existingImages
      )

    );

    // =========================
    // NEW IMAGES
    // =========================

    for (
      let i = 0;
      i < images.length;
      i++
    ) {

      formData.append(
        "images",
        images[i]
      );

    }

    // =========================
    // API REQUEST
    // =========================

    const response =
      await axios.put(

        `${import.meta.env.VITE_API_URL}/api/products/update-product/${product._id}`,

        formData,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "multipart/form-data",

          },
        }

      );

    // =========================
    // REFRESH DATA
    // =========================

    await fetchData();

    // =========================
    // SUCCESS TOAST
    // =========================

    toast.success(
      response?.data?.message ||
      "Product updated successfully"
    );

    // =========================
    // CLOSE MODAL
    // =========================

    setShowEditModal(false);

  } catch (error) {

    console.log(error);

    toast.error(

      error?.response?.data?.message ||

      "Failed to update product"

    );

  } finally {

    setLoading(false);

  }

};

  return (

    <div className="
      fixed
      inset-0
      z-50
      bg-black/60
      backdrop-blur-md
      flex
      items-center
      justify-center
      px-2
      md:px-4
      py-3
      overflow-y-auto
    ">

      {/* ========================= */}
      {/* MODAL */}
      {/* ========================= */}

      <div className="
        w-full
        max-w-3xl
        bg-white
        rounded-[30px]
        shadow-2xl
        overflow-hidden
        max-h-[96vh]
        overflow-y-auto
        animate-fadeIn
      ">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="
          sticky
          top-0
          z-20
          bg-gradient-to-r
          from-[#14532d]
          to-[#166534]
          px-4
          py-4
          md:px-6
          flex
          items-center
          justify-between
          border-b
          border-white/10
          backdrop-blur-md
        ">

          {/* LEFT */}

          <div className="flex items-center gap-3">

            {/* BACK BUTTON */}

            <button

              type="button"

              onClick={() =>
                setShowEditModal(false)
              }

              className="
                w-11
                h-11
                rounded-full
                bg-white/15
                hover:bg-white/25
                active:scale-95
                text-white
                flex
                items-center
                justify-center
                transition-all
              "
            >

              <ArrowLeft size={22} />

            </button>

            {/* TITLE */}

            <div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-white">

                Edit Product

              </h2>

              <p className="text-green-100 text-sm md:text-base">

                Update product details & images

              </p>

            </div>

          </div>

          {/* CLOSE */}

          <button

            type="button"

            onClick={() =>
              setShowEditModal(false)
            }

            className="
              w-10
              h-10
              rounded-full
              bg-red-500
              hover:bg-red-600
              active:scale-95
              text-white
              flex
              items-center
              justify-center
              transition-all
              shadow-lg
            "
          >

            <X size={20} />

          </button>

        </div>

        {/* ========================= */}
        {/* FORM */}
        {/* ========================= */}

        <form
          onSubmit={handleUpdate}
          className="p-4 md:p-8 space-y-7"
        >

          {/* PRODUCT NAME */}

          <div>

            <label className="font-bold text-[#14532d] text-lg">

              Product Name

            </label>

            <input

              type="text"

              value={name}

              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              className="
                w-full
                mt-3
                border
                border-green-200
                rounded-2xl
                px-5
                py-4
                outline-none
                transition-all
                focus:border-[#14532d]
                focus:ring-4
                focus:ring-green-100
              "

              placeholder="Enter product name"
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="font-bold text-[#14532d] text-lg">

              Description

            </label>

            <textarea

              value={description}

              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }

              rows="4"

              className="
                w-full
                mt-3
                border
                border-green-200
                rounded-2xl
                px-5
                py-4
                outline-none
                transition-all
                focus:border-[#14532d]
                focus:ring-4
                focus:ring-green-100
              "

              placeholder="Enter description"
            />

          </div>

          {/* PRICE + STOCK */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="font-bold text-[#14532d] text-lg">

                Price

              </label>

              <input

                type="number"

                value={price}

                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }

                className="
                  w-full
                  mt-3
                  border
                  border-green-200
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  transition-all
                  focus:border-[#14532d]
                  focus:ring-4
                  focus:ring-green-100
                "

                placeholder="Enter price"
              />

            </div>

            <div>

              <label className="font-bold text-[#14532d] text-lg">

                Stock

              </label>

              <input

                type="number"

                value={stock}

                onChange={(e) =>
                  setStock(
                    e.target.value
                  )
                }

                className="
                  w-full
                  mt-3
                  border
                  border-green-200
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  transition-all
                  focus:border-[#14532d]
                  focus:ring-4
                  focus:ring-green-100
                "

                placeholder="Enter stock"
              />

            </div>

          </div>

          {/* CURRENT IMAGES */}

          <div>

            <div className="flex items-center justify-between mb-4">

              <h3 className="font-bold text-[#14532d] text-lg">

                Current Images

              </h3>

              <span className="bg-green-100 text-[#14532d] px-4 py-2 rounded-full text-sm font-bold">

                {existingImages.length} Images

              </span>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

              {

                existingImages.map(
                  (img, index) => (

                    <div
                      key={index}
                      className="relative"
                    >

                      <img
                        src={img}
                        alt="product"
                        className="
                          w-full
                          h-32
                          object-cover
                          rounded-2xl
                          border-2
                          border-green-100
                          shadow-md
                        "
                      />

                      {/* DELETE IMAGE */}

                      <button

                        type="button"

                        onClick={() =>
                          removeExistingImage(
                            index
                          )
                        }

                        className="
                          absolute
                          top-2
                          right-2
                          w-10
                          h-10
                          rounded-full
                          bg-red-500
                          hover:bg-red-600
                          active:scale-95
                          text-white
                          flex
                          items-center
                          justify-center
                          shadow-lg
                          transition-all
                          opacity-100
                        "
                      >

                        <Trash2 size={17} />

                      </button>

                    </div>

                  )
                )

              }

            </div>

          </div>

          {/* IMAGE UPLOAD */}

          <div>

            <label className="font-bold text-[#14532d] text-lg">

              Upload New Images

            </label>

            <label className="
              mt-4
              border-2
              border-dashed
              border-green-300
              rounded-[30px]
              p-10
              flex
              flex-col
              items-center
              justify-center
              cursor-pointer
              hover:bg-green-50
              transition-all
            ">

              <ImagePlus
                size={52}
                className="text-[#14532d]"
              />

              <p className="mt-4 text-lg font-bold text-[#14532d]">

                Click to Upload Images

              </p>

              <p className="text-gray-500 mt-1 text-sm text-center">

                PNG, JPG, WEBP Supported

              </p>

              <input

                type="file"

                multiple

                hidden

                onChange={(e) =>
                  setImages(
                    Array.from(
                      e.target.files
                    )
                  )
                }

              />

            </label>

          </div>

          {/* NEW IMAGES */}

          {

            images.length > 0 && (

              <div>

                <h3 className="font-bold text-[#14532d] text-lg mb-4">

                  New Selected Images

                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                  {

                    images.map(
                      (img, index) => (

                        <div
                          key={index}
                          className="relative"
                        >

                          <img
                            src={URL.createObjectURL(img)}
                            alt="preview"
                            className="
                              w-full
                              h-32
                              object-cover
                              rounded-2xl
                              border-2
                              border-green-100
                              shadow-md
                            "
                          />

                          {/* REMOVE NEW IMAGE */}

                          <button

                            type="button"

                            onClick={() =>
                              removeNewImage(
                                index
                              )
                            }

                            className="
                              absolute
                              top-2
                              right-2
                              w-10
                              h-10
                              rounded-full
                              bg-red-500
                              hover:bg-red-600
                              active:scale-95
                              text-white
                              flex
                              items-center
                              justify-center
                              shadow-lg
                              transition-all
                              opacity-100
                            "
                          >

                            <Trash2 size={17} />

                          </button>

                        </div>

                      )
                    )

                  }

                </div>

              </div>

            )

          }

          {/* UPDATE BUTTON */}

          <button

            type="submit"

            disabled={loading}

            className="
              w-full
              bg-[#14532d]
              hover:bg-[#166534]
              active:scale-[0.99]
              text-white
              py-5
              rounded-2xl
              font-bold
              text-lg
              transition-all
              shadow-xl
              flex
              items-center
              justify-center
              gap-3
            "
          >

            {

              loading ? (

                <>

                  <Loader2
                    size={22}
                    className="animate-spin"
                  />

                  Updating Product...

                </>

              ) : (

                <>

                  <Save size={22} />

                  Update Product

                </>

              )

            }

          </button>

        </form>

      </div>

    </div>

  );

};

export default EditProductModal;