import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, Truck, Star, Heart, ShoppingCart, Plus, Minus, Leaf, MapPin } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Tiro+Devanagari+Marathi&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

    .pd { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    .pd-serif   { font-family: 'Playfair Display', serif; }
    .pd-marathi { font-family: 'Tiro Devanagari Marathi', serif; }

    .pd-bg {
      background:
        radial-gradient(ellipse 70% 55% at 90% 10%, rgba(45,106,53,0.09) 0%, transparent 60%),
        radial-gradient(ellipse 55% 50% at 5%  90%, rgba(201,144,12,0.07) 0%, transparent 60%),
        linear-gradient(158deg, #faf6ee 0%, #f1ead8 100%);
      min-height: 100vh;
    }
    .pd::before {
      content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E");
      background-size:180px 180px;
    }

    .pd-glass {
      background: rgba(255,255,255,0.84);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.78);
      box-shadow: 0 24px 64px rgba(26,61,31,0.12), 0 4px 16px rgba(0,0,0,0.05);
    }
    .pd-info {
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(45,106,53,0.13);
      box-shadow: 0 4px 14px rgba(26,61,31,0.07);
    }
    .pd-badge {
      background: linear-gradient(135deg, rgba(45,106,53,0.11), rgba(201,144,12,0.09));
      border: 1px solid rgba(45,106,53,0.22);
      backdrop-filter: blur(8px);
    }

    /* Back button */
    .pd-back {
      background: rgba(255,255,255,0.90);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(45,106,53,0.16);
      box-shadow: 0 4px 14px rgba(26,61,31,0.10);
      color: #1a3d1f;
      font-weight: 700;
      transition: all 0.22s ease;
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 18px;
      border-radius: 14px;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
    }
    .pd-back:hover { transform: translateX(-3px); box-shadow: 0 6px 20px rgba(26,61,31,0.15); }

    /* Image panel */
    .pd-img-panel {
      background: linear-gradient(145deg, #f5f0e6 0%, #edf5ea 100%);
      position: relative;
    }

    /* Thumbnails */
    .pd-thumb {
      border-radius: 14px;
      overflow: hidden;
      border: 2.5px solid transparent;
      transition: all 0.22s ease;
      cursor: pointer;
      flex-shrink: 0;
    }
    .pd-thumb:hover { transform: scale(1.05); }
    .pd-thumb-active { border-color: #1a3d1f !important; box-shadow: 0 4px 14px rgba(26,61,31,0.22); }

    /* Tag pills */
    .pd-tag {
      font-size: clamp(10px, 2.6vw, 12px);
      font-weight: 700;
      padding: 5px 13px;
      border-radius: 999px;
      font-family: 'DM Sans', sans-serif;
      letter-spacing: 0.03em;
    }
    .pd-tag-green { background: linear-gradient(135deg,#1a3d1f,#2d6a35); color: #fff; }
    .pd-tag-gold  { background: linear-gradient(135deg, rgba(201,144,12,0.15), rgba(201,144,12,0.08)); color: #92400e; border: 1px solid rgba(201,144,12,0.28); }
    .pd-tag-light { background: rgba(45,106,53,0.09); color: #1a3d1f; border: 1px solid rgba(45,106,53,0.18); }

    /* Rating */
    .pd-rating {
      background: #1a8a45;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 7px;
      display: inline-flex; align-items: center; gap: 4px;
      font-family: 'DM Sans', sans-serif;
    }

    /* Divider */
    .pd-divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(45,106,53,0.16), transparent);
    }

    /* Feature cards */
    .pd-feature {
      background: rgba(240,253,244,0.80);
      border: 1px solid rgba(45,106,53,0.12);
      border-radius: 18px;
      padding: 14px 16px;
      display: flex; align-items: center; gap: 12px;
      transition: transform 0.22s ease;
    }
    .pd-feature:hover { transform: translateY(-2px); }

    /* ADD TO CART button */
    .pd-add-btn {
      background: linear-gradient(135deg, #1a3d1f 0%, #2d6a35 100%);
      box-shadow: 0 10px 28px rgba(26,61,31,0.32), inset 0 1px 0 rgba(255,255,255,0.10);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-weight: 800;
      font-size: clamp(14px, 3.5vw, 16px);
      letter-spacing: 0.04em;
      border: none;
      cursor: pointer;
      transition: all 0.28s cubic-bezier(0.34,1.56,0.64,1);
      display: flex; align-items: center; justify-content: center; gap: 10px;
      width: 100%;
      padding: 17px 24px;
      border-radius: 18px;
    }
    .pd-add-btn:hover  { transform: translateY(-2px) scale(1.01); box-shadow: 0 16px 36px rgba(26,61,31,0.38); }
    .pd-add-btn:active { transform: scale(0.97); }

    /* QTY controls */
    .pd-qty-wrap {
      background: rgba(240,253,244,0.85);
      border: 1.5px solid rgba(45,106,53,0.20);
      border-radius: 18px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px;
      gap: 12px;
      width: 100%;
    }
    .pd-qty-btn {
      width: clamp(46px,12vw,54px); height: clamp(46px,12vw,54px);
      border-radius: 13px;
      display: flex; align-items: center; justify-content: center;
      border: none; cursor: pointer;
      transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
      flex-shrink: 0;
    }
    .pd-qty-btn:hover  { transform: scale(1.10); }
    .pd-qty-btn:active { transform: scale(0.93); }
    .pd-qty-minus { background: linear-gradient(135deg,#dc2626,#ef4444); color:#fff; box-shadow:0 4px 14px rgba(220,38,38,0.30); }
    .pd-qty-plus  { background: linear-gradient(135deg,#1a3d1f,#2d6a35); color:#fff; box-shadow:0 4px 14px rgba(26,61,31,0.28); }

    /* Heart button */
    .pd-heart {
      position: absolute; top: 16px; right: 16px; z-index: 20;
      width: 44px; height: 44px;
      border-radius: 50%;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(0,0,0,0.07);
      box-shadow: 0 4px 14px rgba(0,0,0,0.12);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; border: none;
      transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
    }
    .pd-heart:hover { transform: scale(1.15); box-shadow: 0 6px 20px rgba(0,0,0,0.16); }
    .pd-heart:active { transform: scale(0.92); }

    /* Dot */
    .pd-dot { width:4px; height:4px; border-radius:50%; background:#c9900c; display:inline-block; }
    .pd-leaf { position:absolute; opacity:0.05; pointer-events:none; }

    @keyframes spinSlow { to { transform: rotate(360deg); } }
    .pd-spin { animation: spinSlow 1.1s linear infinite; }

    @keyframes pulseG {
      0%,100% { box-shadow:0 0 0 0 rgba(45,106,53,0.35); }
      50%     { box-shadow:0 0 0 8px rgba(45,106,53,0); }
    }
    .pd-pulse { animation: pulseG 2.2s ease-in-out infinite; }

    /* Mobile: stack image on top */
    @media (max-width: 1023px) {
      .pd-img-panel { border-radius: 28px 28px 0 0; }
      .pd-details-panel { border-radius: 0 0 28px 28px; }
    }
  `}</style>
);

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        setProduct(res.data.product);
        setSelectedImage(res.data.product.images?.[0]);
      } catch (err) { console.log(err); }
      finally { setLoading(false); }
    };
    fetchProduct();
  }, [id]);

  // ── LOADING ──
  if (loading) return (
    <div className="pd pd-bg min-h-screen flex flex-col items-center justify-center gap-5">
      <FontStyle/>
      <div className="relative" style={{ width:64, height:64 }}>
        <div className="absolute inset-0 rounded-full" style={{ border:"3px solid rgba(45,106,53,0.15)" }}/>
        <div className="pd-spin absolute inset-0 rounded-full"
          style={{ border:"3px solid transparent", borderTopColor:"#1a3d1f" }}/>
        <span className="absolute inset-0 flex items-center justify-center" style={{ fontSize:22 }}>🌱</span>
      </div>
      <p className="pd-serif font-bold text-[#1a3d1f]" style={{ fontSize:20 }}>Loading product...</p>
      <p className="pd-marathi text-[#a09070]" style={{ fontSize:13 }}>कोकणातील ताजे उत्पादन</p>
    </div>
  );

  // ── NOT FOUND ──
  if (!product) return (
    <div className="pd pd-bg min-h-screen flex items-center justify-center">
      <FontStyle/>
      <div className="pd-glass rounded-[32px] p-12 text-center">
        <div style={{ fontSize:56, marginBottom:12 }}>🌾</div>
        <h1 className="pd-serif font-bold text-[#1a3d1f]" style={{ fontSize:28 }}>Product Not Found</h1>
        <button onClick={() => navigate(-1)} className="pd-back mt-6 mx-auto">
          <ArrowLeft size={16}/> Go Back
        </button>
      </div>
    </div>
  );

  const cartItem = cartItems.find((item) => item._id === product._id);
  const liked    = isInWishlist(product._id);
  const inStock  = product.stock > 0;

  return (
    <div className="pd pd-bg relative" style={{ paddingTop:"clamp(88px,18vw,110px)", paddingBottom:"clamp(48px,10vw,80px)" }}>
      <FontStyle/>

      {/* Deco leaves */}
      <svg className="pd-leaf" style={{ width:"clamp(180px,40vw,380px)", top:"-50px", right:"-40px" }}
        viewBox="0 0 400 400" fill="none">
        <path d="M200 10C350 60 390 200 200 390 10 200 50 60 200 10Z" fill="#1a3d1f"/>
      </svg>
      <svg className="pd-leaf" style={{ width:"clamp(100px,24vw,200px)", bottom:"5%", left:"-20px" }}
        viewBox="0 0 400 400" fill="none">
        <path d="M200 10C350 60 390 200 200 390 10 200 50 60 200 10Z" fill="#c9900c"/>
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── BACK ── */}
        <motion.div
          initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.4 }} className="mb-6">
          <button className="pd-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={16}/> Back to Shop
          </button>
        </motion.div>

        {/* ── MAIN CARD ── */}
        <motion.div
          initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.55, ease:[0.25,0.46,0.45,0.94] }}
          className="pd-glass overflow-hidden"
          style={{ borderRadius:"clamp(24px,5vw,36px)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ══ IMAGE PANEL ══ */}
            <div className="pd-img-panel relative p-5 sm:p-8">

              {/* Heart */}
              <button className="pd-heart" onClick={() => toggleWishlist(product)}>
                <Heart size={20}
                  className={liked ? "text-red-500" : "text-gray-400"}
                  fill={liked ? "#ef4444" : "none"}
                />
              </button>

              {/* Main image */}
              <motion.img
                key={selectedImage}
                initial={{ opacity:0, scale:0.97 }}
                animate={{ opacity:1, scale:1 }}
                transition={{ duration:0.35 }}
                src={selectedImage || "https://via.placeholder.com/600x600?text=No+Image"}
                alt={product.name}
                className="w-full object-cover shadow-2xl"
                style={{
                  height:"clamp(260px,60vw,460px)",
                  borderRadius:"clamp(18px,4vw,26px)",
                }}
              />

              {/* Sold out overlay */}
              {!inStock && (
                <div className="absolute inset-5 sm:inset-8 flex items-center justify-center"
                  style={{ borderRadius:"clamp(18px,4vw,26px)", background:"rgba(255,255,255,0.50)", backdropFilter:"blur(3px)" }}>
                  <span className="font-bold text-white text-lg"
                    style={{ background:"#dc2626", padding:"8px 22px", borderRadius:999 }}>
                    SOLD OUT
                  </span>
                </div>
              )}

              {/* Thumbnails */}
              {product.images?.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-1"
                  style={{ scrollbarWidth:"none" }}>
                  {product.images.map((img, i) => (
                    <button key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`pd-thumb ${selectedImage === img ? "pd-thumb-active" : ""}`}
                      style={{ width:"clamp(64px,16vw,84px)", height:"clamp(64px,16vw,84px)", flexShrink:0 }}>
                      <img src={img} alt="" className="w-full h-full object-cover"/>
                    </button>
                  ))}
                </div>
              )}

              {/* Bottom info strip */}
              <div className="flex items-center gap-3 mt-4">
                <div className="pd-badge inline-flex items-center gap-2 rounded-full" style={{ padding:"8px 14px" }}>
                  <span className="pd-pulse rounded-full bg-emerald-500 inline-block" style={{ width:6, height:6 }}/>
                  <span className="pd-serif text-[#1a3d1f] font-semibold uppercase tracking-widest" style={{ fontSize:10 }}>
                    Konkan · Organic
                  </span>
                </div>
                <div className="pd-rating">★ 4.8 <span style={{ opacity:0.7, fontWeight:400 }}>· 1.2k reviews</span></div>
              </div>
            </div>

            {/* ══ DETAILS PANEL ══ */}
            <div className="pd-details-panel p-5 sm:p-8 lg:p-10 flex flex-col"
              style={{ background:"rgba(250,246,238,0.60)" }}>

              {/* Tags */}
              <motion.div
                initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.15 }}
                className="flex flex-wrap gap-2">
                <span className="pd-tag pd-tag-green">🌿 100% Organic</span>
                <span className="pd-tag pd-tag-gold">✦ Fresh Village Product</span>
                {inStock
                  ? <span className="pd-tag pd-tag-light">● {product.stock} In Stock</span>
                  : <span className="pd-tag" style={{ background:"#fef2f2", color:"#dc2626", border:"1px solid rgba(220,38,38,0.22)" }}>● Out of Stock</span>
                }
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.2 }}
                className="pd-serif font-black text-[#1a3d1f] capitalize mt-5 leading-[1.08]"
                style={{ fontSize:"clamp(28px,7vw,48px)" }}>
                {product.name}
              </motion.h1>

              {/* Marathi sub */}
              <p className="pd-marathi text-[#2d6a35] mt-1" style={{ fontSize:13, opacity:0.8 }}>
                कोकणातील ताजे गावठी उत्पादन
              </p>

              {/* Dot divider */}
              <div className="flex items-center gap-2.5 my-4">
                <div className="h-px bg-gradient-to-r from-[#2d6a35] to-transparent w-8"/>
                <span className="pd-dot"/><span className="pd-dot" style={{ opacity:0.4 }}/>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay:0.25 }}
                className="text-[#5c3a1e] leading-relaxed"
                style={{ fontSize:"clamp(13px,3.2vw,15px)" }}>
                {product.description || "Fresh homemade Gavathi village product, organically grown and traditionally prepared in Konkan region."}
              </motion.p>

              <div className="pd-divider my-5"/>

              {/* Price */}
              <motion.div
                initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }}
                transition={{ delay:0.28 }}>
                <p className="pd-serif font-black text-[#c9900c]"
                  style={{ fontSize:"clamp(36px,9vw,54px)", lineHeight:1 }}>
                  ₹{product.price}
                </p>
                <p className="text-[#a09070]" style={{ fontSize:12, marginTop:3 }}>
                  per item · inclusive of all taxes
                </p>
              </motion.div>

              <div className="pd-divider my-5"/>

              {/* Feature cards */}
              <motion.div
                initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.32 }}
                className="grid grid-cols-2 gap-3">
                {[
                  { icon:ShieldCheck, title:"Pure Quality", sub:"100% Natural", color:"#2d6a35" },
                  { icon:Truck,       title:"Fast Delivery", sub:"Within 24 hrs", color:"#2d6a35" },
                  { icon:Leaf,        title:"No Chemicals", sub:"Pesticide free", color:"#2d6a35" },
                  { icon:MapPin,      title:"Konkan Origin", sub:"50+ villages",  color:"#c9900c" },
                ].map(({ icon:Icon, title, sub, color }) => (
                  <div key={title} className="pd-feature">
                    <div className="rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ width:36, height:36, background:"rgba(45,106,53,0.10)" }}>
                      <Icon size={17} style={{ color }}/>
                    </div>
                    <div>
                      <p className="font-bold text-[#1a3d1f]" style={{ fontSize:"clamp(11px,3vw,13px)", lineHeight:1.2 }}>{title}</p>
                      <p className="text-[#a09070]" style={{ fontSize:"clamp(9px,2.5vw,11px)", marginTop:1 }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* ── CART CONTROLS ── */}
              <motion.div
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.38 }}
                className="mt-7">

                <AnimatePresence mode="wait">
                  {!cartItem ? (
                    <motion.button
                      key="add"
                      initial={{ opacity:0, scale:0.95 }}
                      animate={{ opacity:1, scale:1 }}
                      exit={{ opacity:0, scale:0.95 }}
                      onClick={() => inStock && addToCart(product)}
                      className="pd-add-btn"
                      style={{ opacity: inStock ? 1 : 0.5, cursor: inStock ? "pointer" : "not-allowed" }}
                    >
                      <ShoppingCart size={20}/>
                      {inStock ? "ADD TO CART" : "OUT OF STOCK"}
                    </motion.button>
                  ) : (
                    <motion.div
                      key="qty"
                      initial={{ opacity:0, scale:0.95 }}
                      animate={{ opacity:1, scale:1 }}
                      exit={{ opacity:0, scale:0.95 }}
                      className="pd-qty-wrap">
                      <button
                        onClick={() => decreaseQty(product._id)}
                        className="pd-qty-btn pd-qty-minus">
                        <Minus size={18}/>
                      </button>
                      <div className="text-center">
                        <p className="pd-serif font-black text-[#1a3d1f]"
                          style={{ fontSize:"clamp(26px,7vw,36px)", lineHeight:1 }}>
                          {cartItem.qty}
                        </p>
                        <p className="text-[#a09070]" style={{ fontSize:11 }}>in cart</p>
                      </div>
                      <button
                        onClick={() => increaseQty(product._id)}
                        className="pd-qty-btn pd-qty-plus">
                        <Plus size={18}/>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Trust note */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <ShieldCheck size={12} className="text-[#2d6a35]"/>
                  <p className="text-[#7a6a58]" style={{ fontSize:11 }}>
                    Seller verifies order before confirming · Secure checkout
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;