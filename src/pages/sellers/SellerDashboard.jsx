import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import {
  Package,
  ShoppingBag,
  IndianRupee,
  Eye,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import AddProductForm from "./AddProductForm";

import EditProductModal from "./EditProductModal";

const SellerDashboard = () => {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [products, setProducts] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  // =========================
  // EDIT STATES
  // =========================

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [showEditModal, setShowEditModal] =
    useState(false);

  // =========================
  // DELETE STATE
  // =========================

  const [
    deleteLoading,
    setDeleteLoading
  ] = useState(null);

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const token =
        localStorage.getItem(
          "gavathi_token"
        );

      // =========================
      // PRODUCTS
      // =========================

      const productResponse =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/products/my-products`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

      // =========================
      // FORMAT PRODUCTS
      // =========================

      const formattedProducts =
        productResponse.data.products.map(
          (product) => ({

            ...product,

            image:
              product.images?.[0] ||

              "https://via.placeholder.com/400",

            images:
              product.images || [],

          })
        );

      setProducts(
        formattedProducts
      );

      // =========================
      // ORDERS
      // =========================

      const orderResponse =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/orders/seller-orders`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

      if (
        orderResponse.data.success
      ) {

        setOrders(
          orderResponse.data.orders
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // DELETE PRODUCT
  // =========================

const handleDelete = async (
  productId
) => {

  // =========================
  // CONFIRM POPUP
  // =========================

  const result = await Swal.fire({

    title: "Delete Product?",

    text:
      "This product will be permanently removed.",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#dc2626",

    cancelButtonColor: "#14532d",

    confirmButtonText: "Yes, Delete",

    cancelButtonText: "Cancel",

    background: "#ffffff",

    color: "#14532d",

    borderRadius: "20px",

  });

  // =========================
  // CANCEL DELETE
  // =========================

  if (!result.isConfirmed) return;

  // =========================
  // PREVENT MULTIPLE CLICKS
  // =========================

  if (deleteLoading) return;

  try {

    setDeleteLoading(
      productId
    );

    const token =
      localStorage.getItem(
        "gavathi_token"
      );

    // =========================
    // SMOOTH DELETE ANIMATION
    // =========================

    setProducts((prev) =>
      prev.map((item) =>
        item._id === productId
          ? {
              ...item,
              deleting: true,
            }
          : item
      )
    );

    // =========================
    // WAIT FOR ANIMATION
    // =========================

    await new Promise((resolve) =>
      setTimeout(resolve, 200)
    );

    // =========================
    // API CALL
    // =========================

    const response =
      await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/products/delete-product/${productId}`,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

          },
        }

      );

    // =========================
    // REMOVE FROM UI
    // =========================

    setProducts((prev) =>

      prev.filter(

        (item) =>
          item._id !== productId

      )

    );

    // =========================
    // SUCCESS TOAST
    // =========================

    toast.success(

      response?.data?.message ||

      "Product deleted successfully"

    );

  } catch (error) {

    console.log(error);

    // =========================
    // RESTORE PRODUCT
    // =========================

    setProducts((prev) =>
      prev.map((item) =>
        item._id === productId
          ? {
              ...item,
              deleting: false,
            }
          : item
      )
    );

    toast.error(

      error?.response?.data?.message ||

      "Failed to delete product"

    );

  } finally {

    setDeleteLoading(null);

  }

};

  // =========================
  // REVENUE
  // =========================

  const totalRevenue =
    orders.reduce(

      (acc, order) =>

        acc + order.totalPrice,

      0

    );

  return (

    <section className="min-h-screen bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0] pt-28 px-4 pb-16">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="bg-white rounded-[35px] shadow-2xl p-8 mb-10 border border-green-100">

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#14532d]">

            Welcome, {user?.name}

          </h1>

          <p className="text-gray-500 text-base md:text-lg mt-3">

            Manage your products, analytics and orders professionally.

          </p>

        </div>

        {/* TOP CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          {/* PRODUCTS */}

          <div className="bg-white rounded-[30px] shadow-2xl p-8 border border-green-100">

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

              <Package
                size={34}
                className="text-[#14532d]"
              />

            </div>

            <h2 className="text-5xl font-extrabold text-[#14532d] mt-6">

              {products.length}

            </h2>

            <p className="text-gray-500 mt-2 text-lg">

              Total Products

            </p>

          </div>

          {/* ORDERS */}

          <div className="bg-white rounded-[30px] shadow-2xl p-8 border border-green-100">

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

              <ShoppingBag
                size={34}
                className="text-[#14532d]"
              />

            </div>

            <h2 className="text-5xl font-extrabold text-[#14532d] mt-6">

              {orders.length}

            </h2>

            <p className="text-gray-500 mt-2 text-lg">

              Total Orders

            </p>

            <button

              onClick={() =>
                navigate(
                  "/seller/orders"
                )
              }

              className="mt-6 flex items-center gap-2 bg-[#14532d] hover:bg-[#166534] text-white px-5 py-3 rounded-2xl font-bold transition-all duration-300"
            >

              <Eye size={18} />

              View Requests

            </button>

          </div>

          {/* REVENUE */}

          <div className="bg-white rounded-[30px] shadow-2xl p-8 border border-green-100">

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

              <IndianRupee
                size={34}
                className="text-[#14532d]"
              />

            </div>

            <h2 className="text-5xl font-extrabold text-[#14532d] mt-6">

              ₹{totalRevenue}

            </h2>

            <p className="text-gray-500 mt-2 text-lg">

              Revenue

            </p>

          </div>

        </div>

        {/* ADD PRODUCT */}

        <div className="mb-14">

          <AddProductForm />

        </div>

        {/* MY PRODUCTS */}

        <div>

          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#14532d]">

              My Products

            </h2>

            <div className="bg-white shadow-md px-5 py-2 rounded-full text-[#14532d] font-bold">

              {products.length} Products

            </div>

          </div>

          {

            products.length === 0 ? (

              <div className="bg-white rounded-[30px] shadow-2xl p-14 text-center border border-green-100">

                <h3 className="text-3xl font-bold text-gray-600">

                  No Products Added Yet

                </h3>

                <p className="text-gray-500 mt-3">

                  Start adding your gavathi products.

                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                <AnimatePresence mode="popLayout">

                  {

                    products.map((product) => (

                      <motion.div

                        layout

                        key={product._id}

                        initial={{
                          opacity: 0,
                          scale: 0.96,
                          y: 20,
                        }}

                        animate={{
                          opacity:
                            product.deleting
                              ? 0
                              : 1,

                          scale:
                            product.deleting
                              ? 0.92
                              : 1,

                          y:
                            product.deleting
                              ? -20
                              : 0,

                          height:
                            product.deleting
                              ? 0
                              : "auto",

                          marginBottom:
                            product.deleting
                              ? 0
                              : 24,
                        }}

                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          y: -20,
                        }}

                        transition={{
                          duration: 0.35,
                          ease: "easeInOut",
                        }}

                        style={{
                          willChange:
                            "transform, opacity",
                        }}

                        className="
                          bg-white
                          rounded-[30px]
                          shadow-2xl
                          overflow-hidden
                          border border-green-100
                          hover:-translate-y-2
                          transition-all duration-300
                        "
                      >

                        {/* IMAGE */}

                        <div className="relative">

                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="w-full h-64 object-cover"
                          />

                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-[#14532d] shadow-md">

                            Qty: {product.stock}

                          </div>

                        </div>

                        {/* CONTENT */}

                        <div className="p-6">

                          <h3 className="text-2xl font-extrabold text-[#14532d] line-clamp-1">

                            {product.name}

                          </h3>

                          <p className="text-gray-500 mt-3 line-clamp-2 leading-relaxed">

                            {product.description}

                          </p>

                          <div className="flex items-center justify-between mt-6">

                            <span className="text-3xl font-extrabold text-[#14532d]">

                              ₹{product.price}

                            </span>

                            <span className="bg-green-100 text-[#14532d] px-4 py-2 rounded-full text-sm font-bold">

                              Organic

                            </span>

                          </div>

                          {/* BUTTONS */}

                          <div className="flex gap-3 mt-7">

                            {/* EDIT */}

                            <button

                              onClick={() => {

                                setEditingProduct(
                                  product
                                );

                                setShowEditModal(
                                  true
                                );

                              }}

                              className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 py-3 rounded-2xl font-bold transition-all duration-300"
                            >

                              <Pencil size={18} />

                              Edit

                            </button>

                            {/* DELETE */}

                            <button

                              onClick={() =>
                                handleDelete(
                                  product._id
                                )
                              }

                              disabled={
                                deleteLoading ===
                                product._id
                              }

                              className="
                                flex items-center gap-2
                                bg-red-500 hover:bg-red-600
                                disabled:bg-red-300
                                text-white
                                px-4 py-2
                                rounded-xl
                                transition-all duration-300
                              "
                            >

                              {

                                deleteLoading ===
                                product._id

                                ? (

                                  <>

                                    <Loader2
                                      size={18}
                                      className="animate-spin"
                                    />

                                    Deleting...

                                  </>

                                ) : (

                                  <>

                                    <Trash2 size={18} />

                                    Delete

                                  </>

                                )

                              }

                            </button>

                          </div>

                        </div>

                      </motion.div>

                    ))

                  }

                </AnimatePresence>

              </div>

            )

          }

        </div>

        {/* EDIT PRODUCT MODAL */}

        {

          showEditModal && (

            <EditProductModal

              product={editingProduct}

              setShowEditModal={
                setShowEditModal
              }

              fetchData={fetchData}

            />

          )

        }

      </div>

    </section>

  );

};

export default SellerDashboard;