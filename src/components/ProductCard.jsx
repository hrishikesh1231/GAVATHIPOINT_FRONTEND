import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, increaseQty, decreaseQty, cartItems } = useCart();
  const cartItem = cartItems.find((item) => item._id === product._id);
  const quantity = cartItem ? cartItem.qty : 0;
  const inStock  = product.stock > 0;

  const productImage =
    product.images?.find((img) => img?.includes("cloudinary")) ||
    product.image ||
    "https://via.placeholder.com/500x500?text=No+Image";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        /* ── Shell ── */
        .zc {
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .zc-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: box-shadow 0.22s ease, transform 0.22s ease;
          position: relative;
        }
        .zc-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.12);
          transform: translateY(-3px);
        }

        /* ── Image ── */
        .zc-img-wrap {
          position: relative;
          overflow: hidden;
          background: #f0ebe0;
          flex-shrink: 0;
        }
        .zc-img {
          width: 100%;
          /* KEY FIX: fixed aspect ratio — no more overflow */
          aspect-ratio: 1 / 1;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .zc-card:hover .zc-img { transform: scale(1.05); }

        /* Bottom scrim on image */
        .zc-scrim {
          position: absolute; bottom:0; left:0; right:0;
          height: 45%;
          background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%);
          pointer-events: none;
        }

        /* Veg dot — top left */
        .zc-veg {
          position: absolute; top:8px; left:8px;
          width: 17px; height: 17px;
          border-radius: 4px;
          border: 1.5px solid #21a558;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .zc-veg-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #21a558;
        }

        /* Organic badge — top right */
        .zc-organic {
          position: absolute; top:8px; right:8px;
          background: rgba(26,61,31,0.88);
          color: #a7f3d0;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 3px 7px;
          border-radius: 999px;
          backdrop-filter: blur(6px);
          font-family: 'DM Sans', sans-serif;
        }

        /* Rating chip — bottom left of image */
        .zc-rating {
          position: absolute; bottom:8px; left:8px;
          background: #1a8a45;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6;
        }

        /* Sold out overlay */
        .zc-soldout-overlay {
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(2px);
          display: flex; align-items: center; justify-content: center;
        }
        .zc-soldout-pill {
          background: #dc2626; color: #fff;
          font-size: 10px; font-weight: 700;
          padding: 4px 12px; border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.04em;
        }

        /* Gold top bar when in cart */
        .zc-cart-bar {
          position: absolute; top:0; left:0; right:0; height:3px;
          background: linear-gradient(90deg, #c9900c, #e6b830);
          border-radius: 18px 18px 0 0;
          z-index: 5;
        }

        /* ── Body ──
           KEY FIX: no hanging button — ADD is INSIDE the card body,
           part of normal document flow, never overlaps anything.
        */
        .zc-body {
          padding: 10px 11px 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0;
        }

        .zc-name {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          color: #1c1c1c;
          font-size: clamp(13px, 3.6vw, 15px);
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          /* Fixed min-height so cards align in grid */
          min-height: 2.6em;
          margin-bottom: 3px;
        }

        .zc-desc {
          font-size: clamp(9px, 2.4vw, 11px);
          color: #9a9080;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 6px;
        }

        .zc-divider {
          height: 1px;
          background: #f0ece4;
          margin: 6px 0;
        }

        /* Price + stock row */
        .zc-price-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 4px;
          margin-bottom: 8px;
        }
        .zc-price {
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          color: #1c1c1c;
          font-size: clamp(15px, 4.2vw, 18px);
          line-height: 1;
        }
        .zc-per {
          font-size: 9px;
          color: #b0a898;
          margin-top: 1px;
        }
        .zc-stock {
          font-size: 9px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 999px;
          flex-shrink: 0;
          align-self: flex-end;
        }
        .zc-stock-in  { background: #f0fdf4; color: #16a34a; }
        .zc-stock-out { background: #fef2f2; color: #dc2626; }

        /* ── ADD button — full width, bottom of card ── */
        .zc-add-btn {
          width: 100%;
          background: #fff;
          color: #1a3d1f;
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(11px, 3vw, 13px);
          letter-spacing: 0.05em;
          padding: 9px 12px;
          border-radius: 10px;
          border: 1.5px solid rgba(45,106,53,0.30);
          box-shadow: 0 2px 8px rgba(26,61,31,0.10);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 5px;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          margin-top: auto;
        }
        .zc-add-btn:hover {
          background: #1a3d1f; color: #fff;
          border-color: #1a3d1f;
          box-shadow: 0 6px 18px rgba(26,61,31,0.26);
          transform: translateY(-1px);
        }
        .zc-add-btn:active { transform: scale(0.97); }

        /* ── QTY row — same height as add btn ── */
        .zc-qty-row {
          width: 100%;
          display: flex;
          align-items: center;
          border: 1.5px solid rgba(45,106,53,0.25);
          border-radius: 10px;
          overflow: hidden;
          margin-top: auto;
        }
        .zc-qty-btn {
          flex: 0 0 auto;
          width: clamp(30px, 9vw, 36px);
          height: 36px;
          display: flex; align-items: center; justify-content: center;
          border: none; cursor: pointer;
          transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1);
        }
        .zc-qty-btn:hover  { filter: brightness(0.88); }
        .zc-qty-btn:active { transform: scale(0.90); }
        .zc-qty-minus { background: #fff2f2; color: #dc2626; }
        .zc-qty-plus  { background: #1a3d1f; color: #fff; }
        .zc-qty-num {
          flex: 1;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(13px, 3.5vw, 15px);
          color: #1a3d1f;
          background: #fff;
          height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-left: 1px solid rgba(45,106,53,0.14);
          border-right: 1px solid rgba(45,106,53,0.14);
        }
      `}</style>

      <div className="zc zc-card">

        {/* Cart indicator bar */}
        {quantity > 0 && <div className="zc-cart-bar"/>}

        {/* ── IMAGE ── */}
        <Link to={`/product/${product._id}`} className="block">
          <div className="zc-img-wrap">
            <img
              src={productImage}
              alt={product.name}
              onError={(e) => { e.target.src = "https://via.placeholder.com/500x500?text=No+Image"; }}
              className="zc-img"
            />
            <div className="zc-scrim"/>
            <div className="zc-veg"><div className="zc-veg-dot"/></div>
            <div className="zc-organic">🌿 ORGANIC</div>
            <div className="zc-rating">★ 4.8</div>
            {!inStock && (
              <div className="zc-soldout-overlay">
                <span className="zc-soldout-pill">SOLD OUT</span>
              </div>
            )}
          </div>
        </Link>

        {/* ── BODY ── */}
        <div className="zc-body">
          <Link to={`/product/${product._id}`}>
            <h2 className="zc-name">{product.name}</h2>
          </Link>

          <p className="zc-desc">
            {product.description || "Fresh · Organic · Village Sourced"}
          </p>

          <div className="zc-divider"/>

          {/* Price + stock */}
          <div className="zc-price-row">
            <div>
              <p className="zc-price">₹{product.price}</p>
              <p className="zc-per">per item</p>
            </div>
            <span className={`zc-stock ${inStock ? "zc-stock-in" : "zc-stock-out"}`}>
              {inStock ? `${product.stock} left` : "Sold out"}
            </span>
          </div>

          {/* ADD / QTY — always at bottom, in flow */}
          {inStock ? (
            quantity === 0 ? (
              <button
                onClick={(e) => { e.preventDefault(); addToCart(product); }}
                className="zc-add-btn"
              >
                <Plus size={12}/> ADD
              </button>
            ) : (
              <div className="zc-qty-row">
                <button
                  onClick={(e) => { e.preventDefault(); decreaseQty(product._id); }}
                  className="zc-qty-btn zc-qty-minus"
                >
                  <Minus size={12}/>
                </button>
                <span className="zc-qty-num">{quantity}</span>
                <button
                  onClick={(e) => { e.preventDefault(); increaseQty(product._id); }}
                  className="zc-qty-btn zc-qty-plus"
                >
                  <Plus size={12}/>
                </button>
              </div>
            )
          ) : (
            <button disabled className="zc-add-btn" style={{ opacity:0.45, cursor:"not-allowed" }}>
              Out of Stock
            </button>
          )}
        </div>

      </div>
    </>
  );
};

export default ProductCard;