import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

import {
  ShoppingCart,
  MapPin,
  Phone,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  X,
} from "lucide-react";

const FontStyle = () => (
  <style>{`

    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Tiro+Devanagari+Marathi&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    html,
    body,
    #root {
      width: 100%;
      overflow-x: hidden;
    }

    * {
      min-width: 0;
      box-sizing: border-box;
    }

    .ct {
      font-family: 'DM Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    .ct-serif {
      font-family: 'Playfair Display', serif;
    }

    .ct-marathi {
      font-family: 'Tiro Devanagari Marathi', serif;
    }

    .ct-bg {
      background:
        radial-gradient(
          ellipse 70% 55% at 90% 10%,
          rgba(45,106,53,0.09) 0%,
          transparent 60%
        ),
        radial-gradient(
          ellipse 55% 50% at 5% 90%,
          rgba(201,144,12,0.07) 0%,
          transparent 60%
        ),
        linear-gradient(
          158deg,
          #faf6ee 0%,
          #f1ead8 100%
        );

      min-height: 100vh;
      width: 100%;
      overflow-x: hidden;
    }

    .ct::before {
      content:'';
      position:fixed;
      inset:0;
      pointer-events:none;
      z-index:0;

      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E");

      background-size:180px 180px;
    }

    .ct-glass {
      background: rgba(255,255,255,0.82);
      backdrop-filter: blur(24px);

      border: 1px solid rgba(255,255,255,0.80);

      box-shadow:
        0 20px 56px rgba(26,61,31,0.10),
        0 4px 14px rgba(0,0,0,0.04);
    }

    .ct-info {
      background: rgba(255,255,255,0.92);

      backdrop-filter: blur(12px);

      border: 1px solid rgba(45,106,53,0.13);

      box-shadow:
        0 6px 18px rgba(26,61,31,0.08);
    }

    .ct-badge {
      background:
        linear-gradient(
          135deg,
          rgba(45,106,53,0.11),
          rgba(201,144,12,0.09)
        );

      border: 1px solid rgba(45,106,53,0.22);

      backdrop-filter: blur(8px);
    }

    .ct-item {
      background: rgba(255,255,255,0.85);

      backdrop-filter: blur(20px);

      border: 1px solid rgba(255,255,255,0.75);

      box-shadow:
        0 8px 32px rgba(26,61,31,0.08),
        0 2px 8px rgba(0,0,0,0.04);

      transition:
        transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
        box-shadow 0.25s ease;
    }

    .ct-item:hover {
      transform: translateY(-3px);

      box-shadow:
        0 16px 44px rgba(26,61,31,0.13),
        0 4px 12px rgba(0,0,0,0.06);
    }

    .ct-input {
      width: 100%;

      background: rgba(250,246,238,0.80);

      border: 1.5px solid rgba(45,106,53,0.16);

      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      color: #1a3d1f;

      font-family: 'DM Sans', sans-serif;
    }

    .ct-input::placeholder {
      color: #b0a088;
    }

    .ct-input:focus {
      outline: none;

      border-color: rgba(45,106,53,0.50);

      box-shadow:
        0 0 0 3px rgba(45,106,53,0.10);
    }

    .ct-label {
      font-size: 12px;
      font-weight: 600;
      color: #5c3a1e;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .ct-btn {
      background:
        linear-gradient(
          135deg,
          #1a3d1f 0%,
          #2d6a35 100%
        );

      box-shadow:
        0 8px 26px rgba(26,61,31,0.28),
        inset 0 1px 0 rgba(255,255,255,0.10);

      color: #fff;

      transition:
        all 0.28s cubic-bezier(0.34,1.56,0.64,1);
    }

    .ct-btn:hover {
      transform:
        translateY(-2px)
        scale(1.01);

      box-shadow:
        0 14px 34px rgba(26,61,31,0.36);
    }

    .ct-btn:active {
      transform: scale(0.98);
    }

    .ct-qty-btn {
      transition:
        all 0.2s cubic-bezier(0.34,1.56,0.64,1);
    }

    .ct-qty-btn:hover {
      transform: scale(1.10);
    }

    .ct-total {
      background:
        linear-gradient(
          135deg,
          rgba(45,106,53,0.10),
          rgba(201,144,12,0.07)
        );

      border: 1px solid rgba(45,106,53,0.18);
    }

    .ct-gold {
      background:
        linear-gradient(
          135deg,
          #c9900c,
          #e6b830
        );

      color: #fff;

      box-shadow:
        0 3px 10px rgba(201,144,12,0.30);
    }

    .ct-divider {
      height: 1px;

      background:
        linear-gradient(
          to right,
          transparent,
          rgba(45,106,53,0.18),
          transparent
        );
    }

    @keyframes pulseG {

      0%,100% {
        box-shadow:
          0 0 0 0 rgba(45,106,53,0.35);
      }

      50% {
        box-shadow:
          0 0 0 8px rgba(45,106,53,0);
      }
    }

    .ct-pulse {
      animation: pulseG 2.2s ease-in-out infinite;
    }

    @keyframes popIn {

      from {
        opacity:0;
        transform:
          scale(0.92)
          translateY(16px);
      }

      to {
        opacity:1;
        transform:
          scale(1)
          translateY(0px);
      }
    }

    .ct-popup {
      animation:
        popIn 0.32s cubic-bezier(0.34,1.56,0.64,1) forwards;
    }

    @media (min-width: 1024px) {

      .ct-sidebar {
        position: sticky;
        top: 104px;
      }
    }

    @media (max-width: 640px) {

      .ct-item {
        border-radius: 22px;
      }

      .ct-glass {
        border-radius: 24px;
      }

      .ct-popup {
        width: 100%;
      }
    }

  `}</style>
);

const Field = ({ label, optional, children }) => (
  <div className="mb-4">

    <label className="ct-label flex items-center gap-2">

      {label}

      {optional && (
        <span
          className="
            normal-case
            font-normal
            text-[#b0a088]
            tracking-normal
          "
          style={{
            fontSize: 11,
          }}
        >
          (Optional)
        </span>
      )}
    </label>

    <div className="mt-2">
      {children}
    </div>
  </div>
);

const Cart = () => {

  const {
    cartItems,
    increaseQty,
    decreaseQty,
  } = useCart();

  const [showConfirmPopup, setShowConfirmPopup] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    taluka: "",
    district: "",
    pinCode: "",
    whatsappNumber: "",
    callingNumber: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.qty,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) =>
      acc + item.qty,
    0
  );

  const handlePlaceOrder = async () => {

    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.taluka.trim() ||
      !formData.district.trim() ||
      !formData.pinCode.trim() ||
      !formData.callingNumber.trim()
    ) {
      toast.error("All delivery fields are required");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(formData.callingNumber)) {
      toast.error(
        "Calling number must be exactly 10 digits"
      );
      return;
    }

    if (
      formData.whatsappNumber &&
      !phoneRegex.test(formData.whatsappNumber)
    ) {
      toast.error(
        "WhatsApp number must be exactly 10 digits"
      );
      return;
    }

    if (!/^[0-9]{6}$/.test(formData.pinCode)) {
      toast.error(
        "Pin code must be exactly 6 digits"
      );
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setShowConfirmPopup(true);
  };

  return (
    <div
      className="ct ct-bg relative"
      style={{
        paddingTop: "110px",
        paddingBottom: "80px",
      }}
    >
      <FontStyle />

      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
          mx-auto
          px-3
          sm:px-5
          md:px-6
          lg:px-8
          overflow-x-hidden
        "
      >

        <div className="mb-10">

          <div
            className="
              inline-flex
              items-center
              gap-2
              ct-badge
              rounded-full
              mb-5
            "
            style={{
              padding: "10px 18px",
            }}
          >

            <span
              className="
                ct-pulse
                rounded-full
                bg-emerald-500
                inline-block
              "
              style={{
                width: 7,
                height: 7,
              }}
            />

            <span
              className="
                ct-serif
                font-semibold
                text-[#1a3d1f]
                uppercase
                tracking-widest
              "
              style={{
                fontSize: "11px",
              }}
            >
              Your Cart · तुमची टोपली
            </span>
          </div>

          <h1
            className="
              ct-serif
              font-black
              text-[#1a3d1f]
            "
            style={{
              fontSize: "clamp(34px,8vw,62px)",
            }}
          >
            My{" "}

            <span
              className="italic"
              style={{
                color: "#2d6a35",
              }}
            >
              Cart
            </span>
          </h1>

          <p
            className="text-[#5c3a1e] mt-2"
            style={{
              fontSize: "14px",
            }}
          >
            Review your items and place your order
          </p>
        </div>

        {cartItems.length === 0 ? (

          <div
            className="
              ct-glass
              text-center
              rounded-[32px]
            "
            style={{
              padding: "80px 20px",
            }}
          >

            <div
              style={{
                fontSize: 60,
              }}
            >
              🛒
            </div>

            <h2
              className="
                ct-serif
                font-bold
                text-[#1a3d1f]
                mt-4
              "
              style={{
                fontSize: "30px",
              }}
            >
              Your Cart is Empty
            </h2>

            <p
              className="
                text-[#7a6a58]
                mt-2
              "
            >
              Add some fresh products
            </p>
          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-5
              lg:gap-8
              items-start
              w-full
            "
          >

            {/* LEFT */}

            <div className="lg:col-span-2">

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-5
                "
              >

                <div className="flex items-center gap-2">

                  <ShoppingCart
                    size={16}
                    className="text-[#2d6a35]"
                  />

                  <span
                    className="
                      font-bold
                      text-[#1a3d1f]
                    "
                    style={{
                      fontSize: 14,
                    }}
                  >
                    {totalItems} items in cart
                  </span>
                </div>

                <span
                  className="
                    ct-gold
                    rounded-full
                    font-bold
                  "
                  style={{
                    padding: "5px 14px",
                    fontSize: 12,
                  }}
                >
                  ₹{totalPrice} total
                </span>
              </div>

              <div className="space-y-4">

                {cartItems.map((item) => (

                  <div
                    key={item._id}

                    className="
                      ct-item
                      rounded-[24px]
                      p-3
                      sm:p-5
                      flex
                      items-center
                      gap-3
                      sm:gap-4
                      w-full
                      overflow-hidden
                    "
                  >

                    <div className="flex-shrink-0 relative">

                      <img
                        src={item.image}
                        alt={item.name}

                        className="
                          object-cover
                          rounded-2xl
                          shadow-md
                          w-[78px]
                          h-[78px]
                          sm:w-[100px]
                          sm:h-[100px]
                        "
                      />

                      <span
                        className="
                          absolute
                          -top-2
                          -right-2
                          ct-gold
                          rounded-full
                          font-bold
                          flex
                          items-center
                          justify-center
                        "
                        style={{
                          width: 22,
                          height: 22,
                          fontSize: 11,
                        }}
                      >
                        {item.qty}
                      </span>
                    </div>

                    <div
                      className="
                        flex-1
                        min-w-0
                        overflow-hidden
                      "
                    >

                      <h3
                        className="
                          ct-serif
                          font-bold
                          text-[#1a3d1f]
                          leading-tight
                        "
                        style={{
                          fontSize:
                            "clamp(14px,4vw,20px)",
                        }}
                      >
                        {item.name}
                      </h3>

                      <p
                        className="text-[#7a6a58] mt-1"
                        style={{
                          fontSize: 11,
                        }}
                      >
                        Fresh Organic · गावठी उत्पादन
                      </p>

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                          mt-2
                        "
                      >

                        <span
                          className="
                            font-bold
                            text-[#c9900c]
                          "
                          style={{
                            fontSize:
                              "clamp(15px,4vw,20px)",
                          }}
                        >
                          ₹{item.price}
                        </span>

                        <span
                          className="text-[#a09070]"
                          style={{
                            fontSize: 11,
                          }}
                        >
                          / unit
                        </span>
                      </div>
                    </div>

                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        gap-2
                      "
                    >

                      <button
                        onClick={() =>
                          increaseQty(item._id)
                        }

                        className="
                          ct-qty-btn
                          flex
                          items-center
                          justify-center
                          rounded-xl
                          text-white
                        "

                        style={{
                          width: 36,
                          height: 36,

                          background:
                            "linear-gradient(135deg,#1a3d1f,#2d6a35)",
                        }}
                      >
                        <Plus size={14} />
                      </button>

                      <span
                        className="
                          ct-serif
                          font-bold
                          text-[#1a3d1f]
                        "
                      >
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          decreaseQty(item._id)
                        }

                        className="
                          ct-qty-btn
                          flex
                          items-center
                          justify-center
                          rounded-xl
                        "

                        style={{
                          width: 36,
                          height: 36,

                          background:
                            "rgba(45,106,53,0.12)",
                        }}
                      >
                        <Minus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="
                  ct-total
                  rounded-2xl
                  flex
                  items-center
                  justify-between
                  gap-3
                  mt-6
                  px-4
                  sm:px-5
                  py-4
                "
              >

                <div>

                  <p
                    className="
                      font-semibold
                      text-[#5c3a1e]
                    "
                    style={{
                      fontSize: 13,
                    }}
                  >
                    {totalItems} items · Subtotal
                  </p>

                  <p
                    className="
                      ct-marathi
                      text-[#2d6a35]
                    "
                    style={{
                      fontSize: 11,
                    }}
                  >
                    एकूण किंमत
                  </p>
                </div>

                <p
                  className="
                    ct-serif
                    font-black
                    text-[#1a3d1f]
                  "
                  style={{
                    fontSize: "28px",
                  }}
                >
                  ₹{totalPrice}
                </p>
              </div>
            </div>

            {/* RIGHT */}

            <div className="ct-sidebar">

              <div
                className="
                  ct-glass
                  rounded-[28px]
                  overflow-hidden
                "
              >

                <div
                  style={{
                    background:
                      "linear-gradient(135deg,#1a3d1f 0%,#2d6a35 100%)",

                    padding: "20px 24px",
                  }}
                >

                  <div className="flex items-center gap-2">

                    <MapPin
                      size={16}
                      className="text-emerald-300"
                    />

                    <h2
                      className="
                        ct-serif
                        font-bold
                        text-white
                      "
                    >
                      Delivery Details
                    </h2>
                  </div>
                </div>

                <div className="p-4 sm:p-5 md:p-6">

                  <Field label="Full Name">

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"

                      className="
                        ct-input
                        rounded-xl
                        px-4
                        py-3
                      "
                    />
                  </Field>

                  <Field label="Delivery Address">

                    <textarea
                      rows={3}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House no, street, village..."

                      className="
                        ct-input
                        rounded-xl
                        px-4
                        py-3
                        resize-none
                      "
                    />
                  </Field>

                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      gap-3
                      mb-4
                    "
                  >

                    <div>

                      <label className="ct-label block mb-2">
                        Taluka
                      </label>

                      <input
                        type="text"
                        name="taluka"
                        value={formData.taluka}
                        onChange={handleChange}
                        placeholder="Taluka"

                        className="
                          ct-input
                          rounded-xl
                          px-3
                          py-3
                        "
                      />
                    </div>

                    <div>

                      <label className="ct-label block mb-2">
                        District
                      </label>

                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="District"

                        className="
                          ct-input
                          rounded-xl
                          px-3
                          py-3
                        "
                      />
                    </div>
                  </div>

                  <Field label="Pin Code">

                    <input
                      type="text"
                      name="pinCode"
                      maxLength={6}
                      value={formData.pinCode}
                      onChange={handleChange}
                      placeholder="6-digit pin code"

                      className="
                        ct-input
                        rounded-xl
                        px-4
                        py-3
                      "
                    />
                  </Field>

                  <div className="ct-divider my-4" />

                  <div className="flex items-center gap-2 mb-3">

                    <Phone
                      size={12}
                      className="text-[#2d6a35]"
                    />

                    <span className="ct-label">
                      Contact Numbers
                    </span>
                  </div>

                  <Field
                    label="WhatsApp Number"
                    optional
                  >

                    <input
                      type="text"
                      name="whatsappNumber"
                      maxLength={10}
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      placeholder="10-digit WhatsApp number"

                      className="
                        ct-input
                        rounded-xl
                        px-4
                        py-3
                      "
                    />
                  </Field>

                  <Field label="Calling Number">

                    <input
                      type="text"
                      name="callingNumber"
                      maxLength={10}
                      value={formData.callingNumber}
                      onChange={handleChange}
                      placeholder="10-digit calling number"

                      className="
                        ct-input
                        rounded-xl
                        px-4
                        py-3
                      "
                    />
                  </Field>

                  <div className="ct-divider my-5" />

                  <div
                    className="
                      ct-total
                      rounded-2xl
                      flex
                      items-center
                      justify-between
                      px-4
                      py-4
                      mb-5
                    "
                  >

                    <div>

                      <p
                        className="
                          font-semibold
                          text-[#5c3a1e]
                        "
                      >
                        Total Amount
                      </p>

                      <p
                        className="
                          ct-marathi
                          text-[#2d6a35]
                        "
                        style={{
                          fontSize: 11,
                        }}
                      >
                        एकूण रक्कम
                      </p>
                    </div>

                    <p
                      className="
                        ct-serif
                        font-black
                        text-[#1a3d1f]
                      "
                      style={{
                        fontSize: "28px",
                      }}
                    >
                      ₹{totalPrice}
                    </p>
                  </div>

                  <button
                    onClick={handlePlaceOrder}

                    className="
                      ct-btn
                      w-full
                      rounded-2xl
                      font-bold
                      flex
                      items-center
                      justify-center
                      gap-2
                    "

                    style={{
                      padding: "15px 20px",
                    }}
                  >
                    Proceed to Order

                    <ArrowRight size={16} />
                  </button>

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      mt-4
                    "
                  >

                    <ShieldCheck
                      size={12}
                      className="text-[#2d6a35]"
                    />

                    <p
                      className="
                        text-[#7a6a58]
                        text-center
                      "
                      style={{
                        fontSize: 11,
                      }}
                    >
                      Seller verifies availability before confirming
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>

        {showConfirmPopup && (

          <motion.div
            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            className="
              fixed
              inset-0
              z-[999]
              flex
              items-center
              justify-center
              px-4
            "

            style={{
              background:
                "rgba(15,25,15,0.55)",

              backdropFilter:
                "blur(8px)",
            }}
          >

            <div
              className="
                ct-popup
                ct-glass
                w-full
                max-w-md
                relative
                overflow-hidden
                mx-auto
              "

              style={{
                borderRadius:
                  "clamp(24px,6vw,40px)",

                padding:
                  "clamp(28px,6vw,40px)",
              }}
            >

              <button
                onClick={() =>
                  setShowConfirmPopup(false)
                }

                className="
                  absolute
                  top-4
                  right-4
                  ct-info
                  rounded-full
                  flex
                  items-center
                  justify-center
                "

                style={{
                  width: 32,
                  height: 32,
                }}
              >
                <X size={14} />
              </button>

              <div className="flex justify-center mb-5">

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    rounded-full
                  "

                  style={{
                    width: 72,
                    height: 72,

                    background:
                      "linear-gradient(135deg,#1a3d1f,#2d6a35)",
                  }}
                >
                  🌿
                </div>
              </div>

              <h2
                className="
                  ct-serif
                  font-black
                  text-center
                  text-[#1a3d1f]
                "

                style={{
                  fontSize: "28px",
                }}
              >
                Confirm Your Order
              </h2>

              <div className="ct-divider my-5" />

              <div className="space-y-3">

                {[
                  "Order forwarded securely to seller",
                  "Seller verifies product availability",
                  "Delivery timeline confirmed",
                  "Seller responds within 24 hours",
                ].map((item) => (

                  <div
                    key={item}

                    className="
                      ct-info
                      rounded-xl
                      flex
                      items-center
                      gap-3
                    "

                    style={{
                      padding: "10px 14px",
                    }}
                  >

                    ✅

                    <span
                      className="text-[#4a3728]"
                      style={{
                        fontSize: 13,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="
                  ct-total
                  rounded-2xl
                  flex
                  items-center
                  justify-between
                  mt-5
                  px-5
                  py-4
                "
              >

                <div>

                  <p
                    className="
                      font-semibold
                      text-[#5c3a1e]
                    "
                  >
                    Order Total
                  </p>

                  <p
                    className="
                      ct-marathi
                      text-[#2d6a35]
                    "
                    style={{
                      fontSize: 11,
                    }}
                  >
                    एकूण रक्कम
                  </p>
                </div>

                <p
                  className="
                    ct-serif
                    font-black
                    text-[#1a3d1f]
                  "
                  style={{
                    fontSize: "30px",
                  }}
                >
                  ₹{totalPrice}
                </p>
              </div>

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                  mt-5
                "
              >

                <button
                  onClick={() =>
                    setShowConfirmPopup(false)
                  }

                  className="
                    flex-1
                    ct-info
                    rounded-2xl
                    font-semibold
                    text-[#5c3a1e]
                  "

                  style={{
                    padding: "14px 20px",
                  }}
                >
                  Cancel
                </button>

                <button
              onClick={async () => {

                try {

                  const token = localStorage.getItem("gavathi_token");
//                   console.log(cartItems[0]);
// console.log(cartItems[0]?.seller);

                  const orderData = {

                    customer: {
                      name: formData.name,
                      address: formData.address,
                      taluka: formData.taluka,
                      district: formData.district,
                      pinCode: formData.pinCode,
                      whatsappNumber: formData.whatsappNumber,
                      callingNumber: formData.callingNumber,
                    },

                    products: cartItems.map((item) => ({
                      productId: item._id,
                      name: item.name,
                      image: item.image,
                      price: item.price,
                      quantity: item.qty,
                    })),

                    totalPrice,

                    seller: cartItems[0]?.seller._id,
                  };

                  const { data } = await axios.post(

                    `${import.meta.env.VITE_API_URL}/api/orders/create`,

                    orderData,

                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  if (data.success) {

                    setShowConfirmPopup(false);

                    toast.success(
                      "Order placed successfully 🌿"
                    );

                    localStorage.removeItem("cartItems");

                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }

                } catch (error) {

                  console.log(error);

                  toast.error(
                    error.response?.data?.message ||
                    "Failed to place order"
                  );
                }
              }}

              className="
                ct-btn
                flex-1
                rounded-2xl
                font-bold
                flex
                items-center
                justify-center
                gap-2
              "

              style={{
                padding: "14px 20px",
              }}
            >
              Place Order

              <ArrowRight size={14} />
            </button>
              </div>

              <p
                className="
                  text-center
                  mt-4
                  text-[#a09070]
                "

                style={{
                  fontSize: 11,
                }}
              >
                Thank you for choosing{" "}

                <span
                  className="
                    ct-serif
                    font-bold
                    text-[#1a3d1f]
                  "
                >
                  Gavathi 💚
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;