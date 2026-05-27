import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SellerDashboard from "./pages/sellers/SellerDashboard";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import SellerOrders from "./pages/SellerOrders";
import Orders from "./pages/Orders";



function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
      <ScrollToTop/>
      <Navbar />
      <main className="flex-grow">
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/product/:id" element={<ProductDetails/>} />

        <Route path="/login" element={<Login/>} />

        <Route path="/signup" element={<Signup/>} />

        <Route path="/seller/dashboard" element={<SellerDashboard />}/>

        <Route path="/cart" element={<Cart/>} />

        <Route path="/wishlist" element={<Wishlist />}/>

        <Route path="/seller/orders" element={<SellerOrders />}/>

        <Route path="/orders" element={<Orders/>}/>

      </Routes>
      </main>

      <Footer />
      </div>

    </BrowserRouter>
  );
}

export default App;