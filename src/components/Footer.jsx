import React from "react";

const Footer = () => {
  return (

    <footer className="bg-[#14532d] text-white py-6 mt-auto">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-2xl font-bold">
            GAVATHI 🌾
          </h1>

          <p className="text-gray-300 mt-1 text-sm">
            Pure village products from Konkan.
          </p>
        </div>

        <div className="flex gap-6 text-gray-300 text-sm">

          <a href="#" className="hover:text-yellow-300 transition">
            Home
          </a>

          <a href="#" className="hover:text-yellow-300 transition">
            Shop
          </a>

          <a href="#" className="hover:text-yellow-300 transition">
            Contact
          </a>

        </div>

        <p className="text-xs text-gray-400">
          © 2026 GAVATHI Marketplace
        </p>

      </div>

    </footer>
  );
};

export default Footer;