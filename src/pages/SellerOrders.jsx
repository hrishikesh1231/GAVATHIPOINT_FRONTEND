import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import toast from "react-hot-toast";

import {
  Eye,
  MapPin,
  CheckCircle,
  XCircle,
  Minus,
  Plus,
  Truck,
  PackageCheck,
  CookingPot,
} from "lucide-react";

const SellerOrders = () => {

  const [orders, setOrders] =
    useState([]);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [sellerResponse, setSellerResponse] =
    useState({});

  const [deliveryCharge, setDeliveryCharge] =
    useState(0);

  const [discount, setDiscount] =
    useState(0);

  const [
    expectedDeliveryDate,
    setExpectedDeliveryDate,
  ] = useState("");

  const [sellerMessage, setSellerMessage] =
    useState("");

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

          `${import.meta.env.VITE_API_URL}/api/orders/seller-orders`,

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

    }

  };

  // =====================================
  // OPEN ORDER
  // =====================================

  const openOrder = (order) => {

    setSelectedOrder(order);

    // already seller responded
    if (
      order.status !== "Pending"
    ) {

      setSellerResponse(
        order.sellerResponse || {}
      );

      setDeliveryCharge(
        order.deliveryCharge || 0
      );

      setDiscount(
        order.discount || 0
      );

      setExpectedDeliveryDate(
        order.expectedDeliveryDate
          ?.split("T")[0] || ""
      );

      setSellerMessage(
        order.sellerMessage || ""
      );

      return;

    }

    // fresh order
    setDeliveryCharge(0);

    setDiscount(0);

    setExpectedDeliveryDate("");

    setSellerMessage("");

    order.products.forEach((item) => {

      initializeProduct(item);

    });

  };

  // =====================================
  // INITIALIZE PRODUCT
  // =====================================

  const initializeProduct = (item) => {

    setSellerResponse((prev) => {

      if (prev[item.productId]) {
        return prev;
      }

      return {

        ...prev,

        [item.productId]: {

          availableQty:
            item.quantity,

          finalPrice:
            item.quantity *
            item.price,

          availability:
            "Available",

        },

      };

    });

  };

  // =====================================
  // ALREADY RESPONDED
  // =====================================

  const alreadyResponded =
    selectedOrder?.status !==
    "Pending";

  // =====================================
  // QTY CHANGE
  // =====================================

  const handleQtyChange = (
    item,
    qty
  ) => {

    if (alreadyResponded)
      return;

    const safeQty =
      Math.max(
        0,
        Number(qty || 0)
      );

    const availability =
      sellerResponse[item.productId]
        ?.availability ||
      "Available";

    const finalPrice =
      availability ===
      "Not Available"
        ? 0
        : safeQty *
          Number(item.price);

    setSellerResponse((prev) => ({

      ...prev,

      [item.productId]: {

        ...prev[item.productId],

        availableQty:
          safeQty,

        finalPrice,

      },

    }));

  };

  // =====================================
  // INCREMENT
  // =====================================

  const incrementQty = (
    item
  ) => {

    if (alreadyResponded)
      return;

    const currentQty =
      sellerResponse[
        item.productId
      ]?.availableQty ??
      item.quantity;

    handleQtyChange(
      item,
      currentQty + 1
    );

  };

  // =====================================
  // DECREMENT
  // =====================================

  const decrementQty = (
    item
  ) => {

    if (alreadyResponded)
      return;

    const currentQty =
      sellerResponse[
        item.productId
      ]?.availableQty ??
      item.quantity;

    if (currentQty <= 0)
      return;

    handleQtyChange(
      item,
      currentQty - 1
    );

  };

  // =====================================
  // STATUS CHANGE
  // =====================================

  const handleStatusChange = (
    item,
    value
  ) => {

    if (alreadyResponded)
      return;

    const currentQty =
      sellerResponse[
        item.productId
      ]?.availableQty ??
      item.quantity;

    let updatedPrice =
      currentQty *
      Number(item.price);

    let updatedQty =
      currentQty;

    if (
      value ===
      "Not Available"
    ) {

      updatedPrice = 0;

      updatedQty = 0;

    }

    setSellerResponse((prev) => ({

      ...prev,

      [item.productId]: {

        ...prev[item.productId],

        availability:
          value,

        availableQty:
          updatedQty,

        finalPrice:
          updatedPrice,

      },

    }));

  };

  // =====================================
  // CALCULATE TOTAL
  // =====================================

  const calculateTotal =
    () => {

      let subtotal = 0;

      Object.values(
        sellerResponse
      ).forEach((item) => {

        subtotal += Number(
          item.finalPrice || 0
        );

      });

      const delivery =
        Math.max(
          0,
          Number(
            deliveryCharge || 0
          )
        );

      const discountValue =
        Math.max(
          0,
          Number(discount || 0)
        );

      const finalTotal =
        subtotal +
        delivery -
        discountValue;

      return finalTotal > 0
        ? finalTotal
        : 0;

    };

  // =====================================
  // SEND RESPONSE
  // =====================================

  const sendResponse =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "gavathi_token"
          );

        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/orders/respond/${selectedOrder._id}`,

          {

            sellerResponse,

            deliveryCharge:
              Number(
                deliveryCharge
              ),

            discount:
              Number(discount),

            finalTotal:
              calculateTotal(),

            expectedDeliveryDate,

            sellerMessage,

          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

        toast.success(
          "Response sent successfully"
        );

        setSelectedOrder(
          null
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );

      }

    };

  // =====================================
  // DELIVERY STATUS
  // =====================================

  const updateDeliveryStatus =
    async (
      deliveryStatus
    ) => {

      try {

        const token =
          localStorage.getItem(
            "gavathi_token"
          );

        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/orders/delivery-status/${selectedOrder._id}`,

          {
            deliveryStatus,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

        toast.success(
          "Delivery updated"
        );

        fetchOrders();

        setSelectedOrder(
          null
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update delivery"
        );

      }

    };

  // =====================================
  // STATUS STYLE
  // =====================================

  const getStatusStyle = (
    status
  ) => {

    if (
      status === "Pending"
    ) {

      return "bg-yellow-400 text-black";

    }

    if (
      status === "Confirmed"
    ) {

      return "bg-green-600 text-white";

    }

    if (
      status ===
      "Seller Responded"
    ) {

      return "bg-blue-500 text-white";

    }

    return "bg-red-500 text-white";

  };

  return (

    <div className="min-h-screen bg-[#f6fff8] pt-28 px-3 pb-20">

      <div className="max-w-5xl mx-auto">

        {/* TITLE */}

        <div className="mb-8">

          <h1 className="text-4xl font-extrabold text-[#14532d]">

            Seller Orders

          </h1>

        </div>

        {/* ORDERS */}

        <div className="space-y-6">

          {
            orders.map(
              (order) => (

                <div

                  key={order._id}

                  className="bg-white rounded-[28px] shadow-lg overflow-hidden border border-green-100"

                >

                  {/* TOP */}

                  <div className="bg-[#14532d] p-5 text-white">

                    <div className="flex justify-between items-center">

                      <div>

                        <h2 className="text-2xl font-extrabold">

                          {
                            order
                              .customer
                              ?.name
                          }

                        </h2>

                        <p className="mt-1 text-green-100">

                          ₹
                          {
                            order.finalTotal ||
                            order.totalPrice
                          }

                        </p>

                      </div>

                      <div

                        className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusStyle(order.status)}`}

                      >

                        {
                          order.status
                        }

                      </div>

                    </div>

                  </div>

                  {/* BODY */}

                  <div className="p-5">

                    <div className="flex items-center gap-2 text-gray-600">

                      <MapPin
                        size={18}
                        className="text-green-700"
                      />

                      <p>

                        {
                          order
                            .customer
                            ?.taluka
                        }

                        ,

                        {
                          order
                            .customer
                            ?.district
                        }

                      </p>

                    </div>

                    <button

                      onClick={() =>
                        openOrder(
                          order
                        )
                      }

                      className="mt-5 bg-[#14532d] hover:bg-[#166534] text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2"

                    >

                      <Eye size={18} />

                      View Details

                    </button>

                  </div>

                </div>

              )
            )
          }

        </div>

        {/* MODAL */}

        {
          selectedOrder && (

            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-3">

              <div className="bg-white w-full max-w-5xl rounded-[28px] p-5 max-h-[95vh] overflow-y-auto">

                {/* HEADER */}

                <div className="flex justify-between items-center mb-7">

                  <h2 className="text-3xl font-extrabold text-[#14532d]">

                    Order Details

                  </h2>

                  <button

                    onClick={() =>
                      setSelectedOrder(
                        null
                      )
                    }

                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl font-bold"

                  >

                    Close

                  </button>

                </div>

                {/* ADDRESS */}

                <div className="bg-[#f0fdf4] rounded-3xl p-5 border border-green-100 mb-8">

                  <h3 className="text-2xl font-extrabold text-[#14532d] mb-4">

                    Delivery Address

                  </h3>

                  <div className="space-y-2 text-gray-700">

                    <p className="font-bold text-xl text-[#14532d]">

                      {
                        selectedOrder
                          .customer
                          ?.name
                      }

                    </p>

                    <p>

                      {
                        selectedOrder
                          .customer
                          ?.address
                      }

                    </p>

                    <p>

                      {
                        selectedOrder
                          .customer
                          ?.taluka
                      }

                      ,

                      {
                        selectedOrder
                          .customer
                          ?.district
                      }

                    </p>

                    <p>

                      PIN:
                      {" "}
                      {
                        selectedOrder
                          .customer
                          ?.pinCode
                      }

                    </p>

                    <p>

                      WhatsApp:
                      {" "}
                      {
                        selectedOrder
                          .customer
                          ?.whatsappNumber
                      }

                    </p>

                  </div>

                </div>

                {/* PRODUCTS */}

                <div className="space-y-5">

                  {
                    selectedOrder.products.map(

                      (
                        item,
                        index
                      ) => {

                        const currentData =
                          sellerResponse[
                            item
                              .productId
                          ] || {};

                        return (

                          <div

                            key={index}

                            className="border border-green-100 rounded-3xl p-5"

                          >

                            {/* TOP */}

                            <div className="flex justify-between items-start">

                              <div>

                                <h2 className="text-2xl font-extrabold text-[#14532d]">

                                  {
                                    item.name
                                  }

                                </h2>

                                <p className="text-gray-500 mt-1">

                                  Requested:
                                  {" "}
                                  {
                                    item.quantity
                                  }

                                </p>

                              </div>

                              <h2 className="text-3xl font-extrabold text-green-700">

                                ₹
                                {
                                  item.price
                                }

                              </h2>

                            </div>

                            {/* GRID */}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                              {/* QTY */}

                              <div className="bg-[#f8fffb] border-2 border-green-100 rounded-2xl p-4">

                                <p className="font-semibold text-gray-600 mb-3">

                                  Available Qty

                                </p>

                                <div className="flex items-center justify-between gap-3">

                                  <button

                                    disabled={
                                      alreadyResponded
                                    }

                                    onClick={() =>
                                      decrementQty(
                                        item
                                      )
                                    }

                                    className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center"

                                  >

                                    <Minus
                                      size={
                                        18
                                      }
                                    />

                                  </button>

                                  <input

                                    type="number"

                                    disabled={
                                      alreadyResponded
                                    }

                                    value={
                                      currentData.availableQty ??
                                      item.quantity
                                    }

                                    onChange={(
                                      e
                                    ) =>
                                      handleQtyChange(
                                        item,
                                        e
                                          .target
                                          .value
                                      )
                                    }

                                    className="w-full text-center text-lg font-bold outline-none bg-transparent"

                                  />

                                  <button

                                    disabled={
                                      alreadyResponded
                                    }

                                    onClick={() =>
                                      incrementQty(
                                        item
                                      )
                                    }

                                    className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center"

                                  >

                                    <Plus
                                      size={
                                        18
                                      }
                                    />

                                  </button>

                                </div>

                              </div>

                              {/* PRICE */}

                              <div className="bg-[#f8fffb] border-2 border-green-100 rounded-2xl p-4">

                                <p className="font-semibold text-gray-600 mb-2">

                                  Total Price

                                </p>

                                <h2 className="text-3xl font-extrabold text-green-700">

                                  ₹
                                  {
                                    currentData.finalPrice ??
                                    item.price *
                                      item.quantity
                                  }

                                </h2>

                              </div>

                              {/* STATUS */}

                              <div>

                                <select

                                  disabled={
                                    alreadyResponded
                                  }

                                  value={
                                    currentData.availability ||
                                    "Available"
                                  }

                                  onChange={(
                                    e
                                  ) =>
                                    handleStatusChange(
                                      item,
                                      e
                                        .target
                                        .value
                                    )
                                  }

                                  className="w-full min-h-[100px] bg-[#f8fffb] border-2 border-green-100 rounded-2xl px-4 py-4 font-semibold outline-none"

                                >

                                  <option value="Available">

                                    ✅ Available

                                  </option>

                                  <option value="Limited Stock">

                                    ⚠️ Limited Stock

                                  </option>

                                  <option value="Not Available">

                                    ❌ Not Available

                                  </option>

                                </select>

                              </div>

                            </div>

                          </div>

                        );

                      }
                    )
                  }

                </div>

                {/* BILLING */}

                <div className="bg-[#f0fdf4] rounded-3xl p-6 mt-8 border border-green-100">

                  <h2 className="text-2xl font-extrabold text-[#14532d] mb-5">

                    Billing Summary

                  </h2>

                  <div className="space-y-4">

                    {/* DELIVERY */}

                    <div className="flex justify-between items-center">

                      <p className="font-semibold text-gray-700">

                        Delivery Charge

                      </p>

                      <input

                        disabled={
                          alreadyResponded
                        }

                        type="number"

                        min="0"

                        value={
                          deliveryCharge
                        }

                        onChange={(e) =>
                          setDeliveryCharge(
                            Math.max(
                              0,
                              Number(
                                e
                                  .target
                                  .value
                              )
                            )
                          )
                        }

                        className="border-2 border-green-100 rounded-2xl p-3 w-40 outline-none"

                      />

                    </div>

                    {/* DISCOUNT */}

                    <div className="flex justify-between items-center">

                      <p className="font-semibold text-gray-700">

                        Discount

                      </p>

                      <input

                        disabled={
                          alreadyResponded
                        }

                        type="number"

                        min="0"

                        value={
                          discount
                        }

                        onChange={(e) =>
                          setDiscount(
                            Math.max(
                              0,
                              Number(
                                e
                                  .target
                                  .value
                              )
                            )
                          )
                        }

                        className="border-2 border-green-100 rounded-2xl p-3 w-40 outline-none"

                      />

                    </div>

                    {/* DATE */}

                    <div className="flex justify-between items-center">

                      <p className="font-semibold text-gray-700">

                        Expected Delivery

                      </p>

                      <input

                        disabled={
                          alreadyResponded
                        }

                        type="date"

                        min={
                          new Date()
                            .toISOString()
                            .split("T")[0]
                        }

                        value={
                          expectedDeliveryDate
                        }

                        onChange={(e) =>
                          setExpectedDeliveryDate(
                            e.target.value
                          )
                        }

                        className="border-2 border-green-100 rounded-2xl p-3 outline-none"

                      />

                    </div>

                    {/* MESSAGE */}

                    <div>

                      <p className="font-semibold text-gray-700 mb-2">

                        Seller Message

                      </p>

                      <textarea

                        disabled={
                          alreadyResponded
                        }

                        rows="3"

                        placeholder="Write note..."

                        value={
                          sellerMessage
                        }

                        onChange={(e) =>
                          setSellerMessage(
                            e.target.value
                          )
                        }

                        className="w-full border-2 border-green-100 rounded-2xl p-4 outline-none resize-none"

                      />

                    </div>

                    {/* TOTAL */}

                    <div className="bg-white rounded-2xl p-5 flex justify-between items-center">

                      <h2 className="text-2xl font-extrabold text-[#14532d]">

                        Final Total

                      </h2>

                      <h2 className="text-4xl font-extrabold text-green-700">

                        ₹
                        {
                          calculateTotal()
                        }

                      </h2>

                    </div>

                  </div>

                </div>

                {/* FINALIZED SECTION */}

                {
                  alreadyResponded && (

                    <div className="bg-white border border-green-100 rounded-3xl p-5 mt-8">

                      <h2 className="text-2xl font-extrabold text-[#14532d] mb-5">

                        Finalized Order Summary

                      </h2>

                      <div className="space-y-3 text-gray-700">

                        <div className="flex justify-between">

                          <p>Customer Decision</p>

                          <p className="font-bold">

                            {
                              selectedOrder.customerDecision
                            }

                          </p>

                        </div>

                        <div className="flex justify-between">

                          <p>Delivery Status</p>

                          <p className="font-bold">

                            {
                              selectedOrder.deliveryStatus
                            }

                          </p>

                        </div>

                      </div>

                    </div>

                  )
                }

                {/* DELIVERY ACTIONS */}

                {
                  selectedOrder?.status ===
                  "Confirmed" && (

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                      <button

                        onClick={() =>
                          updateDeliveryStatus(
                            "Preparing"
                          )
                        }

                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"

                      >

                        <CookingPot
                          size={20}
                        />

                        Preparing

                      </button>

                      <button

                        onClick={() =>
                          updateDeliveryStatus(
                            "Out For Delivery"
                          )
                        }

                        className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"

                      >

                        <Truck
                          size={20}
                        />

                        Out For Delivery

                      </button>

                      <button

                        onClick={() =>
                          updateDeliveryStatus(
                            "Delivered"
                          )
                        }

                        className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"

                      >

                        <PackageCheck
                          size={20}
                        />

                        Delivered

                      </button>

                    </div>

                  )
                }

                {/* BUTTONS */}

                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                  <button

                    disabled={
                      alreadyResponded
                    }

                    onClick={
                      sendResponse
                    }

                    className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2

                    ${
                      alreadyResponded

                      ? "bg-gray-400 cursor-not-allowed text-white"

                      : "bg-[#14532d] hover:bg-[#166534] text-white"
                    }`}

                  >

                    <CheckCircle
                      size={20}
                    />

                    {
                      alreadyResponded

                      ? "Response Already Sent"

                      : "Send Response"
                    }

                  </button>

                  <button

                    onClick={() =>
                      setSelectedOrder(
                        null
                      )
                    }

                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"

                  >

                    <XCircle
                      size={20}
                    />

                    Close

                  </button>

                </div>

              </div>

            </div>

          )
        }

      </div>

    </div>

  );

};

export default SellerOrders;