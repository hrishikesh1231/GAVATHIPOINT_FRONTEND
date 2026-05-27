import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems } = useCart();

  const cartItem = cartItems.find((item) => item._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const productImage =
    product.images?.find((img) => img && img.includes("cloudinary")) ||
    product.image ||
    "https://via.placeholder.com/500x500?text=No+Image";

  const inStock = product.stock > 0;

  return (
    <>
      <style>{`
        .pc-card {
          background: rgba(255,255,255,0.84);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.75);
          box-shadow: 0 8px 28px rgba(26,61,31,0.09), 0 2px 8px rgba(0,0,0,0.04);
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.28s ease;
        }
        .pc-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(26,61,31,0.15), 0 4px 14px rgba(0,0,0,0.06);
        }

        /* Image wrapper */
        .pc-img-wrap {
          position: relative;
          overflow: hidden;
          background: #f5f0e8;
        }
        .pc-img {
          width: 100%;
          height: clamp(150px, 44vw, 200px);
          object-fit: cover;
          display: block;
          transition: transform 0.55s ease;
        }
        .pc-card:hover .pc-img { transform: scale(1.06); }

        /* Gradient fade at bottom of image */
        .pc-img-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 55%;
          background: linear-gradient(to top, rgba(15,30,15,0.38) 0%, transparent 100%);
          pointer-events: none;
        }

        /* Stock badge */
        .pc-stock {
          position: absolute;
          top: 10px; left: 10px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: clamp(9px, 2.4vw, 11px);
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.04em;
        }
        .pc-stock-in  { background: rgba(26,61,31,0.85); color: #a7f3d0; backdrop-filter: blur(6px); }
        .pc-stock-out { background: rgba(185,28,28,0.80); color: #fecaca; backdrop-filter: blur(6px); }

        /* ADD button */
        .pc-add-btn {
          position: absolute;
          bottom: 10px; right: 10px;
          background: linear-gradient(135deg, #1a3d1f 0%, #2d6a35 100%);
          color: #fff;
          font-weight: 700;
          font-size: clamp(10px, 2.8vw, 12px);
          font-family: 'DM Sans', sans-serif;
          padding: 7px 14px;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(26,61,31,0.38);
          display: flex;
          align-items: center;
          gap: 5px;
          border: none;
          cursor: pointer;
          transition: all 0.24s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pc-add-btn:hover  { transform: scale(1.08); box-shadow: 0 10px 24px rgba(26,61,31,0.45); }
        .pc-add-btn:active { transform: scale(0.95); }

        /* Qty counter */
        .pc-qty {
          position: absolute;
          bottom: 10px; right: 10px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border: 1.5px solid rgba(45,106,53,0.22);
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 8px;
          box-shadow: 0 6px 18px rgba(26,61,31,0.18);
        }
        .pc-qty-btn {
          width: clamp(24px, 6vw, 28px);
          height: clamp(24px, 6vw, 28px);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .pc-qty-btn:hover  { transform: scale(1.15); }
        .pc-qty-btn:active { transform: scale(0.90); }
        .pc-qty-plus { background: linear-gradient(135deg,#1a3d1f,#2d6a35); color:#fff; box-shadow:0 3px 10px rgba(26,61,31,0.30); }
        .pc-qty-minus { background: linear-gradient(135deg,#dc2626,#ef4444); color:#fff; box-shadow:0 3px 10px rgba(220,38,38,0.28); }
        .pc-qty-num {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #1a3d1f;
          font-size: clamp(13px, 3.5vw, 15px);
          min-width: 16px;
          text-align: center;
        }

        /* Card body */
        .pc-body {
          padding: clamp(10px, 3vw, 14px) clamp(11px, 3.2vw, 16px) clamp(12px, 3.5vw, 16px);
          display: flex;
          flex-direction: column;
          flex: 1;
          background: rgba(250,246,238,0.60);
        }

        .pc-name {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #1a3d1f;
          font-size: clamp(14px, 4vw, 18px);
          line-height: 1.25;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: clamp(36px, 10vw, 46px);
        }

        .pc-desc {
          color: #7a6a58;
          font-size: clamp(10px, 2.8vw, 12px);
          margin-top: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .pc-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(45,106,53,0.15), transparent);
          margin: 8px 0;
        }

        .pc-price {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: #c9900c;
          font-size: clamp(17px, 5vw, 22px);
          line-height: 1;
        }
        .pc-per {
          font-size: clamp(9px, 2.4vw, 11px);
          color: #a09070;
          font-family: 'DM Sans', sans-serif;
          margin-top: 2px;
        }
        .pc-stock-count {
          font-size: clamp(9px, 2.4vw, 11px);
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          padding: 4px 10px;
          border-radius: 999px;
        }
        .pc-stock-count-in  { background: rgba(45,106,53,0.10); color: #1a3d1f; }
        .pc-stock-count-out { background: rgba(185,28,28,0.09); color: #dc2626; }

        /* Cart indicator dot */
        .pc-in-cart {
          position: absolute;
          top: 10px; right: 10px;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #c9900c;
          box-shadow: 0 0 0 3px rgba(201,144,12,0.25);
        }
      `}</style>

      <div className="pc-card">

        {/* ── IMAGE ── */}
        <Link to={`/product/${product._id}`} className="block">
          <div className="pc-img-wrap">
            <img
              src={productImage}
              alt={product.name}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/500x500?text=No+Image";
              }}
              className="pc-img"
            />

            {/* Fade overlay */}
            <div className="pc-img-fade"/>

            {/* Stock badge */}
            <div className={`pc-stock ${inStock ? "pc-stock-in" : "pc-stock-out"}`}>
              {inStock ? "● In Stock" : "● Sold Out"}
            </div>

            {/* In-cart gold dot */}
            {quantity > 0 && <div className="pc-in-cart"/>}
          </div>
        </Link>

        {/* ADD / QTY button — outside Link so click doesn't navigate */}
        <div style={{ position:"relative", height:0 }}>
          <div style={{ position:"absolute", bottom:10, right:10, zIndex:10 }}>
            {quantity === 0 ? (
              <button
                disabled={!inStock}
                onClick={(e) => { e.preventDefault(); addToCart(product); }}
                className="pc-add-btn"
                style={{ opacity: inStock ? 1 : 0.5, cursor: inStock ? "pointer" : "not-allowed" }}
              >
                <Plus size={11}/> ADD
              </button>
            ) : (
              <div className="pc-qty">
                <button
                  onClick={(e) => { e.preventDefault(); removeFromCart(product._id); }}
                  className="pc-qty-btn pc-qty-minus">
                  <Minus size={11}/>
                </button>
                <span className="pc-qty-num">{quantity}</span>
                <button
                  onClick={(e) => { e.preventDefault(); addToCart(product); }}
                  className="pc-qty-btn pc-qty-plus">
                  <Plus size={11}/>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="pc-body">
          <Link to={`/product/${product._id}`}>
            <h2 className="pc-name">{product.name}</h2>
          </Link>
          <p className="pc-desc">
            {product.description || "Fresh Gavathi village product · गावठी उत्पादन"}
          </p>

          <div className="pc-divider"/>

          {/* Price row */}
          <div className="flex items-end justify-between">
            <div>
              <p className="pc-price">₹{product.price}</p>
              <p className="pc-per">per item</p>
            </div>
            <div className={`pc-stock-count ${inStock ? "pc-stock-count-in" : "pc-stock-count-out"}`}>
              {inStock ? `${product.stock} left` : "Out of stock"}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProductCard;