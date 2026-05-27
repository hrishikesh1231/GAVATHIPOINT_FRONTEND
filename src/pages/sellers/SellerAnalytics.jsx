import React from "react";

import {
  FaBoxOpen,
  FaRupeeSign,
  FaClipboardList,
} from "react-icons/fa";

const SellerAnalytics = ({ products }) => {

  const totalProducts = products.length;

  const totalRevenue = products.reduce(

    (acc, product) =>

      acc + (product.price * product.stock),

    0

  );

  return (

    <div className="space-y-6">

      {/* PRODUCTS */}

      <div className="bg-white rounded-[30px] shadow-2xl p-7 hover:scale-105 transition-all duration-300 border border-green-100">

        <div className="bg-green-100 w-fit p-4 rounded-2xl mb-5">

          <FaBoxOpen className="text-4xl text-[#14532d]" />

        </div>

        <h2 className="text-4xl font-extrabold text-[#14532d]">

          {totalProducts}

        </h2>

        <p className="text-gray-500 mt-2 font-medium">

          Total Products

        </p>

      </div>

      {/* ORDERS */}

      <div className="bg-white rounded-[30px] shadow-2xl p-7 hover:scale-105 transition-all duration-300 border border-green-100">

        <div className="bg-green-100 w-fit p-4 rounded-2xl mb-5">

          <FaClipboardList className="text-4xl text-[#14532d]" />

        </div>

        <h2 className="text-4xl font-extrabold text-[#14532d]">

          0

        </h2>

        <p className="text-gray-500 mt-2 font-medium">

          Total Orders

        </p>

      </div>

      {/* REVENUE */}

      <div className="bg-white rounded-[30px] shadow-2xl p-7 hover:scale-105 transition-all duration-300 border border-green-100">

        <div className="bg-green-100 w-fit p-4 rounded-2xl mb-5">

          <FaRupeeSign className="text-4xl text-[#14532d]" />

        </div>

        <h2 className="text-4xl font-extrabold text-[#14532d]">

          ₹{totalRevenue}

        </h2>

        <p className="text-gray-500 mt-2 font-medium">

          Revenue

        </p>

      </div>

    </div>
  );
};

export default SellerAnalytics;