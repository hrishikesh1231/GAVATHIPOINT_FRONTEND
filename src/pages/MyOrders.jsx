import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck, PackageCheck, Clock3, CircleCheckBig,
  CircleX, MessageCircle, Star, ShoppingBag,
  ChevronRight, MapPin,
} from "lucide-react";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Tiro+Devanagari+Marathi&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

    .mo { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    .mo-serif   { font-family: 'Playfair Display', serif; }
    .mo-marathi { font-family: 'Tiro Devanagari Marathi', serif; }

    .mo-bg {
      background:
        radial-gradient(ellipse 70% 55% at 90% 10%, rgba(45,106,53,0.09) 0%, transparent 60%),
        radial-gradient(ellipse 55% 50% at 5%  90%, rgba(201,144,12,0.07) 0%, transparent 60%),
        linear-gradient(158deg, #faf6ee 0%, #f1ead8 100%);
      min-height: 100vh;
    }
    .mo::before {
      content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E");
      background-size:180px 180px;
    }

    /* Glass card */
    .mo-card {
      background: rgba(255,255,255,0.88);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.75);
      box-shadow: 0 8px 32px rgba(26,61,31,0.10), 0 2px 8px rgba(0,0,0,0.04);
      border-radius: 24px;
      overflow: hidden;
    }

    .mo-info {
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(45,106,53,0.13);
      box-shadow: 0 4px 14px rgba(26,61,31,0.07);
    }

    .mo-badge {
      background: linear-gradient(135deg, rgba(45,106,53,0.11), rgba(201,144,12,0.09));
      border: 1px solid rgba(45,106,53,0.22);
      backdrop-filter: blur(8px);
    }

    /* Tabs */
    .mo-tab {
      padding: 10px 6px;
      border-radius: 14px;
      font-size: clamp(10px, 2.6vw, 13px);
      font-weight: 600;
      cursor: pointer;
      border: 1.5px solid rgba(45,106,53,0.16);
      background: rgba(255,255,255,0.80);
      color: #5c3a1e;
      backdrop-filter: blur(8px);
      transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
      text-align: center;
      white-space: nowrap;
    }
    .mo-tab:hover { border-color: rgba(45,106,53,0.35); color: #1a3d1f; }
    .mo-tab-active {
      background: linear-gradient(135deg, #1a3d1f 0%, #2d6a35 100%);
      border-color: #1a3d1f;
      color: #fff;
      box-shadow: 0 6px 18px rgba(26,61,31,0.28);
      transform: translateY(-1px);
    }

    /* Order card header gradient */
    .mo-card-header {
      background: linear-gradient(135deg, #0f2410 0%, #1a3d1f 60%, #2d6a35 100%);
      padding: clamp(16px,4vw,22px) clamp(16px,4vw,24px);
      position: relative;
      overflow: hidden;
    }
    .mo-card-header::before {
      content:'';
      position:absolute; top:-40px; right:-40px;
      width:140px; height:140px;
      border-radius:50%;
      background: rgba(255,255,255,0.04);
      pointer-events:none;
    }

    /* Status badge on card header */
    .mo-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: clamp(9px, 2.4vw, 11px);
      font-weight: 700;
      letter-spacing: 0.04em;
    }
    .mo-status-pending  { background: rgba(251,191,36,0.20); color: #fde68a; border: 1px solid rgba(251,191,36,0.35); }
    .mo-status-responded{ background: rgba(99,179,237,0.20); color: #bfdbfe; border: 1px solid rgba(99,179,237,0.35); }
    .mo-status-confirmed{ background: rgba(74,222,128,0.20); color: #bbf7d0; border: 1px solid rgba(74,222,128,0.35); }
    .mo-status-cancelled{ background: rgba(248,113,113,0.20); color: #fecaca; border: 1px solid rgba(248,113,113,0.35); }

    /* Product row */
    .mo-product-row {
      display: flex;
      align-items: center;
      gap: clamp(10px,3vw,16px);
      padding: clamp(12px,3vw,16px) 0;
      border-bottom: 1px solid rgba(45,106,53,0.08);
    }
    .mo-product-row:last-child { border-bottom: none; }

    /* Seller response card */
    .mo-response-card {
      background: rgba(240,253,244,0.80);
      border: 1px solid rgba(45,106,53,0.14);
      border-radius: 16px;
      padding: clamp(12px,3vw,16px);
    }

    /* Primary button */
    .mo-btn-primary {
      background: linear-gradient(135deg, #1a3d1f 0%, #2d6a35 100%);
      box-shadow: 0 6px 20px rgba(26,61,31,0.28), inset 0 1px 0 rgba(255,255,255,0.10);
      color: #fff;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
      display: flex; align-items: center; justify-content: center; gap: 8px;
      border-radius: 14px;
      padding: clamp(12px,3vw,14px) 20px;
      font-size: clamp(13px,3.2vw,15px);
      width: 100%;
      font-family: 'DM Sans', sans-serif;
    }
    .mo-btn-primary:hover  { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(26,61,31,0.36); }
    .mo-btn-primary:active { transform: scale(0.97); }

    .mo-btn-danger {
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
      box-shadow: 0 6px 20px rgba(220,38,38,0.26);
      color: #fff;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
      display: flex; align-items: center; justify-content: center; gap: 8px;
      border-radius: 14px;
      padding: clamp(12px,3vw,14px) 20px;
      font-size: clamp(13px,3.2vw,15px);
      width: 100%;
      font-family: 'DM Sans', sans-serif;
    }
    .mo-btn-danger:hover  { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(220,38,38,0.36); }
    .mo-btn-danger:active { transform: scale(0.97); }

    .mo-btn-gold {
      background: linear-gradient(135deg, #c9900c, #e6b830);
      box-shadow: 0 6px 20px rgba(201,144,12,0.28);
      color: #1a0a00;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
      display: flex; align-items: center; justify-content: center; gap: 8px;
      border-radius: 14px;
      padding: clamp(12px,3vw,14px) 20px;
      font-size: clamp(13px,3.2vw,15px);
      width: 100%;
      font-family: 'DM Sans', sans-serif;
    }
    .mo-btn-gold:hover  { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(201,144,12,0.36); }

    /* Delivery tracker */
    .mo-tracker-wrap {
      background: rgba(240,253,244,0.75);
      border: 1px solid rgba(45,106,53,0.14);
      border-radius: 20px;
      padding: clamp(16px,4vw,24px);
    }

    .mo-tracker-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      flex: 1;
      position: relative;
    }
    /* connector line between steps */
    .mo-tracker-step:not(:last-child)::after {
      content: '';
      position: absolute;
      top: clamp(20px,5vw,28px);
      left: 60%;
      width: 80%;
      height: 2px;
      background: rgba(45,106,53,0.15);
      border-radius: 2px;
    }
    .mo-tracker-step.done:not(:last-child)::after {
      background: linear-gradient(90deg, #2d6a35, rgba(45,106,53,0.30));
    }

    .mo-step-icon {
      width: clamp(44px,11vw,56px);
      height: clamp(44px,11vw,56px);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }
    .mo-step-inactive { background: rgba(0,0,0,0.06); color: #b0a898; }
    .mo-step-pending  { background: linear-gradient(135deg,#d97706,#fbbf24); color: #fff; box-shadow: 0 4px 14px rgba(217,119,6,0.30); }
    .mo-step-prepare  { background: linear-gradient(135deg,#2563eb,#60a5fa); color: #fff; box-shadow: 0 4px 14px rgba(37,99,235,0.30); }
    .mo-step-otw      { background: linear-gradient(135deg,#ea580c,#fb923c); color: #fff; box-shadow: 0 4px 14px rgba(234,88,12,0.30); }
    .mo-step-done     { background: linear-gradient(135deg,#1a3d1f,#2d6a35); color: #fff; box-shadow: 0 4px 14px rgba(26,61,31,0.30); }

    .mo-divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(45,106,53,0.15), transparent);
      margin: clamp(14px,3.5vw,20px) 0;
    }

    .mo-dot { width:4px; height:4px; border-radius:50%; background:#c9900c; display:inline-block; }
    .mo-leaf { position:absolute; opacity:0.05; pointer-events:none; }

    @keyframes spinSlow { to { transform: rotate(360deg); } }
    .mo-spin { animation: spinSlow 1.1s linear infinite; }

    @keyframes pulseG {
      0%,100% { box-shadow:0 0 0 0 rgba(45,106,53,0.35); }
      50%     { box-shadow:0 0 0 8px rgba(45,106,53,0); }
    }
    .mo-pulse { animation: pulseG 2.2s ease-in-out infinite; }

    /* Page top — matches Navbar height */
  .mo-page {
  padding-top: 72px;
}
  `}</style>
);

const fadeUp  = { hidden:{ opacity:0, y:20 }, show:{ opacity:1, y:0, transition:{ duration:0.48, ease:[0.25,0.46,0.45,0.94] } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.08 } } };
const cardAnim = {
  hidden: { opacity:0, y:24, scale:0.97 },
  show:   { opacity:1, y:0,  scale:1,  transition:{ duration:0.44 } },
  exit:   { opacity:0, scale:0.95, transition:{ duration:0.20 } },
};

const TABS = [
  { key:"Pending",    label:"Pending",    mr:"प्रतीक्षा", emoji:"⏳" },
  { key:"Preparing",  label:"Preparing",  mr:"तयार",     emoji:"📦" },
  { key:"On The Way", label:"On The Way", mr:"वाटेत",    emoji:"🚚" },
  { key:"Delivered",  label:"Delivered",  mr:"मिळाले",   emoji:"✅" },
];

const STATUS_MAP = {
  "Pending":           { pill:"mo-status-pending",   label:"Pending"    },
  "Seller Responded":  { pill:"mo-status-responded",  label:"Responded"  },
  "Confirmed":         { pill:"mo-status-confirmed",  label:"Confirmed"  },
  "Cancelled":         { pill:"mo-status-cancelled",  label:"Cancelled"  },
};

const MyOrders = () => {
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("gavathi_token");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/my-orders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerDecision = async (orderId, customerDecision) => {
    try {
      const token = localStorage.getItem("gavathi_token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/customer-response/${orderId}`,
        { customerDecision, paymentMethod: "COD" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(customerDecision === "Confirmed" ? "Order Confirmed 🌿" : "Order Cancelled");
      fetchOrders();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

const filteredOrders = orders.filter((order) => {

  switch (activeTab) {

    case "Pending":
      return (
        order.status === "Pending" ||
        order.status === "Seller Responded" ||
        (
          order.status === "Confirmed" &&
          order.deliveryStatus === "Pending"
        )
      );

    case "Preparing":
      return (
        order.status === "Confirmed" &&
        order.deliveryStatus === "Preparing"
      );

    case "On The Way":
      return (
        order.status === "Confirmed" &&
        order.deliveryStatus === "Out For Delivery"
      );

    case "Delivered":
      return order.deliveryStatus === "Delivered";

    default:
      return false;
  }
});

  const getDeliveryStep = (ds) => {
    if (ds === "Pending")          return 1;
    if (ds === "Preparing")        return 2;
    if (ds === "Out For Delivery") return 3;
    if (ds === "Delivered")        return 4;
    return 1;
  };

  // ── LOADING ──
  if (loading) return (
    <div className="mo mo-bg mo-page min-h-screen flex flex-col items-center justify-center gap-5">
      <FontStyle/>
      <div className="relative" style={{ width:60, height:60 }}>
        <div className="absolute inset-0 rounded-full" style={{ border:"3px solid rgba(45,106,53,0.12)" }}/>
        <div className="mo-spin absolute inset-0 rounded-full"
          style={{ border:"3px solid transparent", borderTopColor:"#1a3d1f" }}/>
        <span className="absolute inset-0 flex items-center justify-center" style={{ fontSize:20 }}>🌱</span>
      </div>
      <p className="mo-serif font-bold text-[#1a3d1f]" style={{ fontSize:20 }}>Loading Orders...</p>
      <p className="mo-marathi text-[#a09070]" style={{ fontSize:13 }}>तुमच्या ऑर्डर तपासत आहोत</p>
    </div>
  );

  return (
    <div
  className="mo mo-bg mo-page relative"
  style={{
    paddingBottom: "24px",
  }}
>
      <FontStyle/>

      {/* Deco leaves */}
      <svg className="mo-leaf" style={{ width:"clamp(180px,40vw,360px)", top:"-40px", right:"-40px" }}
        viewBox="0 0 400 400" fill="none">
        <path d="M200 10C350 60 390 200 200 390 10 200 50 60 200 10Z" fill="#1a3d1f"/>
      </svg>
      <svg className="mo-leaf" style={{ width:"clamp(100px,22vw,180px)", bottom:"8%", left:"-20px" }}
        viewBox="0 0 400 400" fill="none">
        <path d="M200 10C350 60 390 200 200 390 10 200 50 60 200 10Z" fill="#c9900c"/>
      </svg>

     <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ── PAGE HEADER ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="mb-8">

          <motion.div variants={fadeUp} className="mb-4">
            <span className="mo-badge inline-flex items-center gap-2 rounded-full"
              style={{ padding:"8px 16px" }}>
              <span className="mo-pulse rounded-full bg-emerald-500 inline-block" style={{ width:6, height:6 }}/>
              <span className="mo-serif font-semibold text-[#1a3d1f] uppercase tracking-widest"
                style={{ fontSize:"clamp(8px,2.2vw,11px)" }}>
                Order Tracking · ऑर्डर ट्रॅकिंग
              </span>
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp}
            className="mo-serif font-black leading-[1.05] text-[#1a3d1f]"
            style={{ fontSize:"clamp(28px,7vw,52px)" }}>
            My{" "}
            <span className="italic" style={{ color:"#2d6a35" }}>Orders</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="flex items-center gap-2 mt-2">
            <div className="h-px bg-gradient-to-r from-[#2d6a35] to-transparent w-8"/>
            <span className="mo-dot"/><span className="mo-dot" style={{ opacity:0.4 }}/>
          </motion.div>

          <motion.p variants={fadeUp}
            className="text-[#5c3a1e] mt-2" style={{ fontSize:"clamp(12px,3vw,14px)" }}>
            Track and manage all your Gavathi orders in one place.
          </motion.p>
        </motion.div>

        {/* ── TABS ── */}
        <motion.div
          initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.4, delay:0.2 }}
          className="grid grid-cols-4 gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`mo-tab ${activeTab === tab.key ? "mo-tab-active" : ""}`}
            >
              <span className="block" style={{ fontSize:"clamp(14px,3.5vw,18px)", marginBottom:2 }}>
                {tab.emoji}
              </span>
              <span className="block font-bold" style={{ fontSize:"clamp(10px,2.6vw,13px)" }}>
                {tab.label}
              </span>
              <span className="mo-marathi block" style={{ fontSize:"clamp(8px,2vw,10px)", opacity:0.7 }}>
                {tab.mr}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── NO ORDERS ── */}
        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
            className="mo-card relative overflow-hidden text-center"
            style={{ padding:"clamp(40px,10vw,72px) 20px" }}>
            <svg className="mo-leaf" style={{ width:140, top:-20, right:-20 }}
              viewBox="0 0 400 400" fill="none">
              <path d="M200 10C350 60 390 200 200 390 10 200 50 60 200 10Z" fill="#1a3d1f"/>
            </svg>
            <div style={{ fontSize:56, marginBottom:12 }}>🛒</div>
            <h2 className="mo-serif font-bold text-[#1a3d1f]" style={{ fontSize:"clamp(20px,5vw,28px)" }}>
              No Orders Found
            </h2>
            <p className="mo-marathi text-[#a09070] mt-1" style={{ fontSize:13 }}>
              या टॅबमध्ये ऑर्डर नाहीत
            </p>
          </motion.div>
        )}

        {/* ── ORDER CARDS ── */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order) => {
              const deliveryStep = getDeliveryStep(order.deliveryStatus);
              const statusInfo   = STATUS_MAP[order.status] || STATUS_MAP["Pending"];

              return (
                <motion.div
                  key={order._id}
                  variants={cardAnim}
                  exit={cardAnim.exit}
                  layout
                  className="mo-card"
                >

                  {/* ── CARD HEADER ── */}
                  <div className="mo-card-header">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Status pill */}
                        <span className={`mo-status-pill ${statusInfo.pill}`}>
                          <span style={{ width:6, height:6, borderRadius:"50%",
                            background:"currentColor", display:"inline-block", opacity:0.8 }}/>
                          {statusInfo.label}
                        </span>
                        <h2 className="mo-serif font-black text-white mt-2 leading-tight"
                          style={{ fontSize:"clamp(20px,5vw,28px)" }}>
                          {order.status}
                        </h2>
                        <div className="flex items-center gap-2 mt-1.5">
                          <MapPin size={12} className="text-emerald-300" style={{ flexShrink:0 }}/>
                          <p className="text-emerald-200 font-medium truncate"
                            style={{ fontSize:"clamp(11px,2.8vw,13px)" }}>
                            {order.deliveryStatus || "Pending"} · COD
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-emerald-200" style={{ fontSize:11, marginBottom:2 }}>Total</p>
                        <p className="mo-serif font-black"
                          style={{
                            fontSize:"clamp(22px,6vw,32px)",
                            background:"linear-gradient(135deg,#fbbf24,#f59e0b)",
                            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                          }}>
                          ₹{order.finalTotal || order.totalPrice}
                        </p>
                        <p className="text-emerald-300" style={{ fontSize:10 }}>
                          {order.products?.length} item{order.products?.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ── CARD BODY ── */}
                 <div style={{ padding:"clamp(16px,4vw,24px)" }}>

                    {/* Products list */}
                    <div>
                      {order.products.map((item, index) => (
                        <div key={index} className="mo-product-row">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover rounded-2xl flex-shrink-0"
                            style={{
                              width:"clamp(60px,15vw,80px)",
                              height:"clamp(60px,15vw,80px)",
                              border:"1.5px solid rgba(45,106,53,0.12)",
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="mo-serif font-bold text-[#1a3d1f] truncate"
                              style={{ fontSize:"clamp(14px,3.8vw,18px)" }}>
                              {item.name}
                            </h3>
                            <p className="text-[#7a6a58] mt-0.5" style={{ fontSize:"clamp(10px,2.6vw,12px)" }}>
                              Qty: <span className="font-semibold text-[#1a3d1f]">{item.quantity}</span>
                              <span className="mx-1.5 opacity-40">·</span>
                              <span className="mo-marathi" style={{ fontSize:"clamp(9px,2.4vw,11px)" }}>
                                गावठी उत्पादन
                              </span>
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <p className="font-black text-[#c9900c]"
                              style={{ fontSize:"clamp(14px,3.8vw,18px)" }}>
                              ₹{item.price}
                            </p>
                            <p className="text-[#a09070]" style={{ fontSize:10 }}>per unit</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ── SELLER RESPONSE ── */}
                   
                    {order.status !== "Pending" && (
                      <>
                        <div className="mo-divider" />

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div
                              className="rounded-lg bg-green-50 flex items-center justify-center"
                              style={{
                                width: 28,
                                height: 28,
                                border: "1px solid rgba(45,106,53,0.14)",
                              }}
                            >
                              <ChevronRight size={14} className="text-[#2d6a35]" />
                            </div>

                            <h3
                              className="mo-serif font-bold text-[#1a3d1f]"
                              style={{
                                fontSize: "clamp(14px,3.8vw,18px)",
                              }}
                            >
                              Seller Response
                            </h3>
                          </div>

                          {/* PRODUCT RESPONSES */}
                          <div className="space-y-3">
                            {Object.entries(order.sellerResponse || {}).map(
                              ([productId, response], index) => (
                                <div key={index} className="mo-response-card">
                                  <div className="flex items-center justify-between gap-3">
                                    <div>
                                      <p
                                        className="font-bold text-[#1a3d1f]"
                                        style={{
                                          fontSize: "clamp(12px,3vw,14px)",
                                        }}
                                      >
                                        Product {index + 1}
                                      </p>

                                      <p
                                        className="text-[#7a6a58] mt-1"
                                        style={{
                                          fontSize: "clamp(10px,2.6vw,12px)",
                                        }}
                                      >
                                        Available Qty :
                                        <span className="font-semibold text-[#1a3d1f] ml-1">
                                          {response.availableQty}
                                        </span>
                                      </p>

                                      <span
                                        className="inline-block mt-2 text-[#2d6a35] font-semibold"
                                        style={{
                                          fontSize: "clamp(9px,2.2vw,11px)",
                                          background: "rgba(45,106,53,0.08)",
                                          padding: "2px 8px",
                                          borderRadius: 999,
                                        }}
                                      >
                                        {response.availability}
                                      </span>
                                    </div>

                                    <div className="text-right">
                                      <p
                                        className="mo-serif font-black text-[#1a3d1f]"
                                        style={{
                                          fontSize: "clamp(16px,4.5vw,22px)",
                                        }}
                                      >
                                        ₹{response.finalPrice}
                                      </p>

                                      <p
                                        className="text-[#a09070]"
                                        style={{ fontSize: 10 }}
                                      >
                                        Product Price
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>

                          {/* ORDER SUMMARY FROM SELLER */}
                          <div className="mt-4 space-y-3">

                            <div className="mo-response-card">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#1a3d1f]">
                                  Delivery Charge
                                </span>

                                <span className="font-bold text-[#c9900c]">
                                  ₹{order.deliveryCharge || 0}
                                </span>
                              </div>
                            </div>

                            <div className="mo-response-card">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#1a3d1f]">
                                  Discount
                                </span>

                                <span className="font-bold text-green-700">
                                  ₹{order.discount || 0}
                                </span>
                              </div>
                            </div>

                            <div className="mo-response-card">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#1a3d1f]">
                                  Final Total
                                </span>

                                <span
                                  className="font-black text-[#1a3d1f]"
                                  style={{ fontSize: "20px" }}
                                >
                                  ₹{order.finalTotal || order.totalPrice}
                                </span>
                              </div>
                            </div>

                            <div className="mo-response-card">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#1a3d1f]">
                                  Expected Delivery
                                </span>

                                <span className="font-semibold text-[#1a3d1f]">
                                  {order.expectedDeliveryDate
                                    ? new Date(
                                        order.expectedDeliveryDate
                                      ).toLocaleDateString()
                                    : "Not Provided"}
                                </span>
                              </div>
                            </div>

                            {order.sellerMessage && (
                              <div className="mo-response-card">
                                <h4 className="font-bold text-[#1a3d1f] mb-2">
                                  Seller Message
                                </h4>

                                <p className="text-[#555]">
                                  {order.sellerMessage}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* ── CUSTOMER ACTION BUTTONS ── */}
                    {order.status === "Seller Responded" && (
                      <>
                        <div className="mo-divider"/>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            onClick={() => handleCustomerDecision(order._id, "Confirmed")}
                            className="mo-btn-primary">
                            <CircleCheckBig size={18}/> Confirm Order
                          </button>
                          <button
                            onClick={() => handleCustomerDecision(order._id, "Cancelled")}
                            className="mo-btn-danger">
                            <CircleX size={18}/> Cancel Order
                          </button>
                        </div>
                      </>
                    )}

                    {/* ── DELIVERY TRACKER ── */}
                    {order.status === "Confirmed" && (
                      <>
                        <div className="mo-divider"/>
                        <div className="mo-tracker-wrap">
                          <div className="flex items-center gap-2 mb-5">
                            <Truck size={15} className="text-[#2d6a35]"/>
                            <h3 className="mo-serif font-bold text-[#1a3d1f]"
                              style={{ fontSize:"clamp(14px,3.8vw,18px)" }}>
                              Delivery Tracking
                            </h3>
                          </div>

                          <div className="flex items-start justify-between">
                            {[
                              { label:"Pending",    mr:"प्रतीक्षा", Icon:Clock3,         step:1, cls:"mo-step-pending"  },
                              { label:"Preparing",  mr:"तयार",      Icon:PackageCheck,   step:2, cls:"mo-step-prepare"  },
                              { label:"On The Way", mr:"वाटेत",     Icon:Truck,          step:3, cls:"mo-step-otw"      },
                              { label:"Delivered",  mr:"मिळाले",    Icon:CircleCheckBig, step:4, cls:"mo-step-done"     },
                            ].map(({ label, mr, Icon, step, cls }) => (
                              <div key={label}
                                className={`mo-tracker-step ${deliveryStep >= step ? "done" : ""}`}>
                                <div className={`mo-step-icon ${deliveryStep >= step ? cls : "mo-step-inactive"}`}>
                                  <Icon size={deliveryStep >= step ? 20 : 18}/>
                                </div>
                                <p className="font-bold text-[#1a3d1f] text-center"
                                  style={{ fontSize:"clamp(8px,2.2vw,11px)", lineHeight:1.3 }}>
                                  {label}
                                </p>
                                <p className="mo-marathi text-[#a09070] text-center"
                                  style={{ fontSize:"clamp(7px,2vw,9px)" }}>
                                  {mr}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* ── HELP + FEEDBACK (Delivered) ── */}
                    {order.deliveryStatus === "Delivered" && (
                      <>
                        <div className="mo-divider"/>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="mo-btn-primary">
                            <MessageCircle size={16}/> Help
                          </button>
                          <button className="mo-btn-gold">
                            <Star size={16}/> Feedback
                          </button>
                        </div>
                      </>
                    )}

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MyOrders;