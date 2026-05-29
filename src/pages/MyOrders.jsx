import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  Truck,
  PackageCheck,
  Clock3,
  CircleCheckBig,
  CircleX,
  MessageCircle,
  Star,
} from "lucide-react";

const MyOrders = () => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("Pending");

  // =====================================
  // FETCH ORDERS
  // =====================================

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const token =
        localStorage.getItem(
          "gavathi_token"
        );

      const { data } =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/orders/my-orders`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

      if (data.success) {

        setOrders(data.orders);

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch orders"
      );

    } finally {

      setLoading(false);

    }

  };

  // =====================================
  // CUSTOMER RESPONSE
  // =====================================

  const handleCustomerDecision =
    async (
      orderId,
      customerDecision
    ) => {

      try {

        const token =
          localStorage.getItem(
            "gavathi_token"
          );

        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/orders/customer-response/${orderId}`,

          {
            customerDecision,

            paymentMethod:
              "COD",
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

        toast.success(

          customerDecision ===
            "Confirmed"

            ? "Order Confirmed"

            : "Order Cancelled"

        );

        fetchOrders();

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );

      }

    };

  // =====================================
  // FILTERED ORDERS
  // =====================================

  const filteredOrders =
    orders.filter((order) => {

      if (
        activeTab ===
        "Pending"
      ) {

        return (

          order.status ===
            "Pending" ||

          order.status ===
            "Seller Responded"

        );

      }

      if (
        activeTab ===
        "Preparing"
      ) {

        return (
          order.deliveryStatus ===
          "Preparing"
        );

      }

      if (
        activeTab ===
        "On The Way"
      ) {

        return (
          order.deliveryStatus ===
          "Out For Delivery"
        );

      }

      if (
        activeTab ===
        "Delivered"
      ) {

        return (
          order.deliveryStatus ===
          "Delivered"
        );

      }

      return false;

    });

  // =====================================
  // DELIVERY STEP
  // =====================================

  const getDeliveryStep =
    (
      deliveryStatus
    ) => {

      if (
        deliveryStatus ===
        "Pending"
      )
        return 1;

      if (
        deliveryStatus ===
        "Preparing"
      )
        return 2;

      if (
        deliveryStatus ===
        "Out For Delivery"
      )
        return 3;

      if (
        deliveryStatus ===
        "Delivered"
      )
        return 4;

      return 1;

    };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#fefce8] to-[#dcfce7]">

        <h1 className="text-2xl font-bold text-[#14532d]">

          Loading Orders...

        </h1>

      </div>

    );

  }

  return (

    <section className="min-h-screen bg-gradient-to-br from-[#fefce8] via-[#dcfce7] to-[#bbf7d0] pt-24 pb-32 px-3 sm:px-5">

      <div className="max-w-5xl mx-auto">

        {/* TITLE */}

        <div className="mb-8">

          <h1 className="text-4xl sm:text-5xl font-black text-[#14532d]">

            My Orders

          </h1>

          <p className="text-gray-600 mt-2 text-sm sm:text-base">

            Track your orders easily

          </p>

        </div>

        {/* TABS */}

        <div className="grid grid-cols-4 gap-2 mb-8">

          {
            [
              "Pending",
              "Preparing",
              "On The Way",
              "Delivered",
            ].map((tab) => (

              <button

                key={tab}

                onClick={() =>
                  setActiveTab(tab)
                }

                className={`py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300

                ${
                  activeTab ===
                  tab

                    ? "bg-[#14532d] text-white shadow-lg scale-105"

                    : "bg-white text-[#14532d] border border-green-100"
                }`}

              >

                {tab}

              </button>

            ))
          }

        </div>

        {/* NO ORDERS */}

        {
          filteredOrders.length ===
            0 && (

            <div className="bg-white rounded-[30px] shadow-xl p-10 text-center">

              <h2 className="text-3xl font-extrabold text-[#14532d]">

                No Orders Found

              </h2>

            </div>

          )
        }

        {/* ORDERS */}

        <div className="space-y-8">

          {
            filteredOrders.map(
              (order) => {

                const deliveryStep =
                  getDeliveryStep(
                    order.deliveryStatus
                  );

                return (

                  <div

                    key={order._id}

                    className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-green-100"

                  >

                    {/* TOP */}

                    <div className="bg-[#14532d] p-5 text-white">

                      <div className="flex justify-between items-center">

                        <div>

                          <h2 className="text-3xl font-black">

                            {
                              order.status
                            }

                          </h2>

                          <p className="mt-2 text-green-100 font-semibold">

                            {
                              order.deliveryStatus ||
                              "Pending"
                            }

                          </p>

                        </div>

                        <div className="text-right">

                          <h2 className="text-4xl font-black text-yellow-300">

                            ₹
                            {
                              order.finalTotal ||
                              order.totalPrice
                            }

                          </h2>

                        </div>

                      </div>

                    </div>

                    {/* BODY */}

                    <div className="p-5 sm:p-6">

                      {/* PRODUCTS */}

                      <div className="space-y-5">

                        {
                          order.products.map(

                            (
                              item,
                              index
                            ) => (

                              <div

                                key={index}

                                className="flex gap-4 border-b border-gray-100 pb-5"

                              >

                                <img

                                  src={
                                    item.image
                                  }

                                  alt={
                                    item.name
                                  }

                                  className="w-24 h-24 rounded-2xl object-cover border"

                                />

                                <div className="flex-1">

                                  <h2 className="text-2xl font-black text-[#14532d]">

                                    {
                                      item.name
                                    }

                                  </h2>

                                  <p className="text-gray-500 mt-1">

                                    Quantity:
                                    {" "}
                                    {
                                      item.quantity
                                    }

                                  </p>

                                  <p className="text-orange-600 font-bold mt-2 text-xl">

                                    ₹
                                    {
                                      item.price
                                    }

                                  </p>

                                </div>

                              </div>

                            )
                          )
                        }

                      </div>

                      {/* SELLER RESPONSE */}

                      {
                        order.status !==
                          "Pending" && (

                          <div className="bg-[#f0fdf4] rounded-3xl p-5 mt-8 border border-green-100">

                            <h2 className="text-3xl font-black text-[#14532d] mb-5">

                              Seller Response

                            </h2>

                            <div className="space-y-4">

                              {
                                Object.entries(
                                  order.sellerResponse ||
                                    {}
                                ).map(
                                  (
                                    [
                                      productId,
                                      response,
                                    ],
                                    index
                                  ) => (

                                    <div

                                      key={
                                        index
                                      }

                                      className="bg-white rounded-2xl p-4 border border-green-100"

                                    >

                                      <div className="flex justify-between items-center">

                                        <div>

                                          <p className="font-bold text-[#14532d] text-lg">

                                            Product
                                            {" "}
                                            {
                                              index +
                                              1
                                            }

                                          </p>

                                          <p className="text-gray-500 mt-1">

                                            Available Qty:
                                            {" "}
                                            {
                                              response.availableQty
                                            }

                                          </p>

                                        </div>

                                        <div className="text-right">

                                          <p className="font-black text-2xl text-green-700">

                                            ₹
                                            {
                                              response.finalPrice
                                            }

                                          </p>

                                          <p className="text-sm mt-1 font-semibold">

                                            {
                                              response.availability
                                            }

                                          </p>

                                        </div>

                                      </div>

                                    </div>

                                  )
                                )
                              }

                            </div>

                          </div>

                        )
                      }

                      {/* CUSTOMER ACTION */}

                      {
                        order.status ===
                          "Seller Responded" && (

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

                            <button

                              onClick={() =>
                                handleCustomerDecision(

                                  order._id,

                                  "Confirmed"

                                )
                              }

                              className="bg-[#14532d] hover:bg-[#166534] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg"

                            >

                              <CircleCheckBig
                                size={22}
                              />

                              Confirm Order

                            </button>

                            <button

                              onClick={() =>
                                handleCustomerDecision(

                                  order._id,

                                  "Cancelled"

                                )
                              }

                              className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg"

                            >

                              <CircleX
                                size={22}
                              />

                              Cancel Order

                            </button>

                          </div>

                        )
                      }

                      {/* DELIVERY TRACKER */}

                      {
                        order.status ===
                          "Confirmed" && (

                          <div className="bg-[#f0fdf4] rounded-3xl p-6 mt-8 border border-green-100">

                            <h2 className="text-3xl font-black text-[#14532d] mb-8">

                              Delivery Tracking

                            </h2>

                            <div className="grid grid-cols-4 gap-4">

                              {/* PENDING */}

                              <div className="text-center">

                                <div

                                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center

                                  ${
                                    deliveryStep >=
                                    1

                                      ? "bg-yellow-400 text-black"

                                      : "bg-gray-200"
                                  }`}

                                >

                                  <Clock3
                                    size={
                                      28
                                    }
                                  />

                                </div>

                                <p className="font-bold mt-3 text-xs">

                                  Pending

                                </p>

                              </div>

                              {/* PREPARING */}

                              <div className="text-center">

                                <div

                                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center

                                  ${
                                    deliveryStep >=
                                    2

                                      ? "bg-blue-500 text-white"

                                      : "bg-gray-200"
                                  }`}

                                >

                                  <PackageCheck
                                    size={
                                      28
                                    }
                                  />

                                </div>

                                <p className="font-bold mt-3 text-xs">

                                  Preparing

                                </p>

                              </div>

                              {/* WAY */}

                              <div className="text-center">

                                <div

                                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center

                                  ${
                                    deliveryStep >=
                                    3

                                      ? "bg-orange-500 text-white"

                                      : "bg-gray-200"
                                  }`}

                                >

                                  <Truck
                                    size={
                                      28
                                    }
                                  />

                                </div>

                                <p className="font-bold mt-3 text-xs">

                                  On The Way

                                </p>

                              </div>

                              {/* DELIVERED */}

                              <div className="text-center">

                                <div

                                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center

                                  ${
                                    deliveryStep >=
                                    4

                                      ? "bg-green-600 text-white"

                                      : "bg-gray-200"
                                  }`}

                                >

                                  <CircleCheckBig
                                    size={
                                      28
                                    }
                                  />

                                </div>

                                <p className="font-bold mt-3 text-xs">

                                  Delivered

                                </p>

                              </div>

                            </div>

                          </div>

                        )
                      }

                      {/* HELP + FEEDBACK */}

                      {
                        order.deliveryStatus ===
                          "Delivered" && (

                          <div className="grid grid-cols-2 gap-4 mt-8">

                            <button

                              className="bg-[#14532d] hover:bg-[#166534] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"

                            >

                              <MessageCircle
                                size={20}
                              />

                              Help

                            </button>

                            <button

                              className="bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2"

                            >

                              <Star
                                size={20}
                              />

                              Feedback

                            </button>

                          </div>

                        )
                      }

                    </div>

                  </div>

                );

              }
            )
          }

        </div>

      </div>

    </section>

  );

};

export default MyOrders;