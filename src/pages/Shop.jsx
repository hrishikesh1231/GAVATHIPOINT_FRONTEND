import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
  X,
  SlidersHorizontal,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Tiro+Devanagari+Marathi&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

    * {
      box-sizing: border-box;
    }

    html,
    body,
    #root {
      width: 100%;
      overflow-x: hidden;
    }

    .sp {
      font-family: 'DM Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
      width: 100%;
      overflow-x: hidden;
    }

    .sp * {
      max-width: 100%;
    }

    .sp-serif {
      font-family: 'Playfair Display', serif;
    }

    .sp-marathi {
      font-family: 'Tiro Devanagari Marathi', serif;
    }

    .sp-bg {
      background:
        radial-gradient(ellipse 70% 55% at 90% 10%, rgba(45,106,53,0.09) 0%, transparent 60%),
        radial-gradient(ellipse 55% 50% at 5% 90%, rgba(201,144,12,0.07) 0%, transparent 60%),
        linear-gradient(158deg, #faf6ee 0%, #f1ead8 100%);
      min-height: 100vh;
      width: 100%;
      overflow-x: hidden;
    }

    .sp::before {
      content:'';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E");
      background-size: 180px 180px;
    }

    .sp-badge {
      background: linear-gradient(
        135deg,
        rgba(45,106,53,0.11),
        rgba(201,144,12,0.09)
      );
      border: 1px solid rgba(45,106,53,0.22);
      backdrop-filter: blur(8px);
    }

    .sp-glass {
      background: rgba(255,255,255,0.82);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.80);
      box-shadow:
        0 20px 56px rgba(26,61,31,0.12),
        0 4px 14px rgba(0,0,0,0.05);
    }

    .sp-info {
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(45,106,53,0.14);
      box-shadow: 0 6px 18px rgba(26,61,31,0.09);
    }

    .sp-pill {
      background: rgba(255,255,255,0.75);
      border: 1px solid rgba(45,106,53,0.18);
      color: #1a3d1f;
      font-weight: 600;
      transition: all 0.22s ease;
      cursor: pointer;
      backdrop-filter: blur(8px);
      white-space: nowrap;
    }

    .sp-pill:hover {
      background: rgba(45,106,53,0.10);
      border-color: rgba(45,106,53,0.35);
    }

    .sp-pill-active {
      background: linear-gradient(135deg, #1a3d1f 0%, #2d6a35 100%) !important;
      border-color: #1a3d1f !important;
      color: #fff !important;
      box-shadow: 0 6px 18px rgba(26,61,31,0.28);
      transform: translateY(-1px);
    }

    .sp-btn {
      background: linear-gradient(135deg, #1a3d1f 0%, #2d6a35 100%);
      box-shadow:
        0 8px 26px rgba(26,61,31,0.30),
        inset 0 1px 0 rgba(255,255,255,0.10);
      color: #fff;
      transition: all 0.28s cubic-bezier(0.34,1.56,0.64,1);
    }

    .sp-btn:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 14px 34px rgba(26,61,31,0.36);
    }

    .sp-btn:active {
      transform: scale(0.98);
    }

    .sp-search {
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(16px);
      border: 1.5px solid rgba(45,106,53,0.18);
      box-shadow: 0 4px 20px rgba(26,61,31,0.08);
      transition: all 0.22s ease;
      width: 100%;
      overflow: hidden;
    }

    .sp-search:focus-within {
      border-color: rgba(45,106,53,0.45);
      box-shadow: 0 4px 24px rgba(26,61,31,0.15);
    }

    .sp-search input {
      min-width: 0;
      width: 100%;
    }

    .sp-divider {
      height: 1px;
      background: linear-gradient(
        to right,
        transparent,
        rgba(45,106,53,0.18),
        transparent
      );
    }

    .sp-gold {
      background: linear-gradient(135deg, #c9900c, #e6b830);
      color: #fff;
      box-shadow: 0 3px 10px rgba(201,144,12,0.30);
    }

    .sp-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #c9900c;
      display: inline-block;
    }

    .sp-leaf {
      position: absolute;
      opacity: 0.05;
      pointer-events: none;
    }

    @keyframes pulseG {
      0%,100% {
        box-shadow: 0 0 0 0 rgba(45,106,53,0.35);
      }
      50% {
        box-shadow: 0 0 0 8px rgba(45,106,53,0);
      }
    }

    .sp-pulse {
      animation: pulseG 2.2s ease-in-out infinite;
    }

    @keyframes spinSlow {
      to {
        transform: rotate(360deg);
      }
    }

    .sp-spin {
      animation: spinSlow 1.1s linear infinite;
    }

    .sp-cats {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      width: 100%;
    }

    @media (max-width: 640px) {
      .sp-cats {
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: 6px;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }

      .sp-cats::-webkit-scrollbar {
        display: none;
      }
    }
  `}</style>
);

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardAnim = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: {
      duration: 0.2,
    },
  },
};

const CATEGORIES = [
  { key: "All", label: "All", sub: "सर्व", emoji: "🌿" },
  { key: "Grains", label: "Grains", sub: "धान्य", emoji: "🌾" },
  { key: "Fruits", label: "Fruits", sub: "फळे", emoji: "🥭" },
  { key: "Pickles", label: "Pickles", sub: "लोणचे", emoji: "🫙" },
  { key: "Spices", label: "Spices", sub: "मसाले", emoji: "🌶️" },
  { key: "Oils", label: "Oils", sub: "तेल", emoji: "🫒" },
];

const TRUST = [
  {
    icon: ShieldCheck,
    en: "100% Organic",
    mr: "सेंद्रिय",
  },
  {
    icon: Truck,
    en: "Pan Maharashtra",
    mr: "डिलिव्हरी",
  },
  {
    icon: Leaf,
    en: "Village Sourced",
    mr: "गावठी",
  },
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setCategory] = useState("All");
  const [searchQuery, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );

        const formatted = res.data.products.map((p) => ({
          ...p,
          image: p.images?.[0] || "https://via.placeholder.com/300",
          images: p.images || [],
        }));

        setProducts(formatted);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchCat =
      activeCategory === "All" ||
      p.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchSrch = p.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchCat && matchSrch;
  });

  return (
    <div
      className="sp sp-bg relative"
      style={{
        paddingTop: "clamp(88px,18vw,110px)",
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      <FontStyle />

      {/* Leaves */}
      <svg
        className="sp-leaf"
        style={{
          width: "clamp(200px,45vw,420px)",
          top: "-60px",
          right: "-50px",
        }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M200 10C350 60 390 200 200 390 10 200 50 60 200 10Z"
          fill="#1a3d1f"
        />
      </svg>

      <svg
        className="sp-leaf"
        style={{
          width: "clamp(120px,28vw,220px)",
          bottom: "10%",
          left: "-30px",
        }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M200 10C350 60 390 200 200 390 10 200 50 60 200 10Z"
          fill="#c9900c"
        />
      </svg>

      {/* HEADER */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-8 sm:pb-10 overflow-hidden">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 w-full"
        >
          {/* LEFT */}
          <div className="w-full min-w-0">
            <motion.div variants={fadeUp} className="mb-5">
              <span
                className="sp-badge inline-flex items-center gap-2 rounded-full"
                style={{ padding: "10px 18px" }}
              >
                <span
                  className="sp-pulse rounded-full bg-emerald-500 inline-block"
                  style={{ width: 7, height: 7 }}
                />

                <span
                  className="sp-serif font-semibold text-[#1a3d1f] uppercase tracking-widest"
                  style={{
                    fontSize: "clamp(9px,2.4vw,11px)",
                  }}
                >
                  Konkan · Organic · Trusted
                </span>
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="sp-serif font-black leading-[1.03] tracking-[-0.02em] text-[#1a3d1f]"
              style={{
                fontSize: "clamp(34px,8.5vw,68px)",
              }}
            >
              Shop{" "}
              <span
                className="italic"
                style={{
                  color: "#2d6a35",
                }}
              >
                Gavathi
              </span>

              <br />

              <span
                style={{
                  background:
                    "linear-gradient(130deg,#1a3d1f 30%,#c9900c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Products
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="sp-marathi text-[#4a3728] mt-1"
              style={{
                fontSize: "clamp(13px,3vw,15px)",
                opacity: 0.75,
              }}
            >
              कोकणातील ताजी, घरगुती उत्पादने
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2.5"
              style={{
                margin: "16px 0 12px",
              }}
            >
              <div className="h-px bg-gradient-to-r from-[#2d6a35] to-transparent w-10" />

              <span className="sp-dot" />

              <span
                className="sp-dot"
                style={{
                  opacity: 0.4,
                }}
              />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-[#4a3728] leading-relaxed max-w-[500px]"
              style={{
                fontSize: "clamp(13px,3.2vw,15px)",
              }}
            >
              Fresh homemade village products directly from Konkan sellers.
              Organically grown, traditionally prepared — delivered to your
              doorstep.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-2 mt-5"
            >
              {TRUST.map(({ icon: Icon, en, mr }) => (
                <span
                  key={en}
                  className="sp-info inline-flex items-center gap-2 rounded-full"
                  style={{
                    padding: "8px 14px",
                  }}
                >
                  <Icon
                    size={12}
                    className="text-[#2d6a35]"
                  />

                  <span
                    className="font-semibold text-[#1a3d1f]"
                    style={{
                      fontSize: "clamp(10px,2.5vw,12px)",
                    }}
                  >
                    {en}
                  </span>

                  <span
                    className="sp-marathi text-[#2d6a35]"
                    style={{
                      fontSize: "clamp(9px,2.2vw,11px)",
                      opacity: 0.8,
                    }}
                  >
                    · {mr}
                  </span>
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-6 sm:gap-8 border-t border-[#1a3d1f]/10 mt-6 pt-5 flex-wrap"
            >
              {[
                {
                  num: "500+",
                  label: "Products",
                  mr: "उत्पादने",
                },
                {
                  num: "50+",
                  label: "Villages",
                  mr: "गावे",
                },
                {
                  num: "4.9★",
                  label: "Rating",
                  mr: "रेटिंग",
                },
              ].map(({ num, label, mr }) => (
                <div key={label}>
                  <p
                    className="sp-serif font-bold text-[#1a3d1f]"
                    style={{
                      fontSize: "clamp(18px,4.5vw,24px)",
                    }}
                  >
                    {num}
                  </p>

                  <p
                    className="font-semibold text-[#5c3a1e]"
                    style={{
                      fontSize: "clamp(9px,2vw,11px)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {label}

                    <span
                      className="sp-marathi ml-1 text-[#2d6a35]"
                      style={{
                        fontWeight: 400,
                      }}
                    >
                      · {mr}
                    </span>
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            variants={fadeUp}
            className="w-full lg:w-[360px] max-w-full flex-shrink-0 space-y-3"
          >
            <div className="sp-search rounded-2xl flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3">
              <Search
                size={16}
                className="text-[#2d6a35] flex-shrink-0"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent outline-none text-[#1a3d1f] placeholder-[#b0a088]"
                style={{
                  fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />

              {searchQuery && (
                <button
                  onClick={() => setSearch("")}
                  className="text-[#b0a088] hover:text-[#1a3d1f] transition flex-shrink-0"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="sp-info rounded-2xl flex items-center justify-between px-5 py-4">
              <div>
                <p
                  className="sp-serif font-bold text-[#1a3d1f]"
                  style={{
                    fontSize: "clamp(22px,5vw,28px)",
                    lineHeight: 1,
                  }}
                >
                  {loading ? "—" : filtered.length}
                </p>

                <p
                  className="text-[#5c3a1e] font-semibold mt-1"
                  style={{
                    fontSize: 12,
                  }}
                >
                  Products available{" "}
                  <span
                    className="sp-marathi text-[#2d6a35]"
                    style={{
                      fontWeight: 400,
                    }}
                  >
                    · उपलब्ध
                  </span>
                </p>
              </div>

              <div
                className="rounded-2xl bg-[#f0fdf4] border border-green-100 flex items-center justify-center flex-shrink-0"
                style={{
                  width: 46,
                  height: 46,
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                  }}
                >
                  🌿
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="sp-divider" />
      </div>

      {/* CATEGORY */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 overflow-hidden">
        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.28,
          }}
          className="flex items-center gap-2.5 mb-4"
        >
          <SlidersHorizontal
            size={13}
            className="text-[#2d6a35]"
          />

          <span
            className="font-bold text-[#1a3d1f] uppercase tracking-widest"
            style={{
              fontSize: 11,
            }}
          >
            Filter by Category
          </span>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.35,
          }}
          className="sp-cats"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`sp-pill inline-flex items-center gap-2 rounded-full flex-shrink-0 ${
                activeCategory === cat.key
                  ? "sp-pill-active"
                  : ""
              }`}
              style={{
                padding: "9px 16px",
                fontSize: 13,
              }}
            >
              <span
                style={{
                  fontSize: 15,
                }}
              >
                {cat.emoji}
              </span>

              <span>{cat.label}</span>

              <span
                className="sp-marathi"
                style={{
                  fontSize: 11,
                  opacity: 0.65,
                }}
              >
                {cat.sub}
              </span>
            </button>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="sp-divider" />
      </div>

      {/* PRODUCTS */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 pb-24 sm:pb-28 overflow-hidden">
        {(activeCategory !== "All" || searchQuery) && !loading && (
          <motion.div
            initial={{
              opacity: 0,
              y: -6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span
              className="font-semibold text-[#5c3a1e]"
              style={{
                fontSize: 12,
              }}
            >
              Active filters:
            </span>

            <span
              className="text-[#2d6a35] font-semibold"
              style={{
                fontSize: 12,
              }}
            >
              — {filtered.length} result
              {filtered.length !== 1 ? "s" : ""}
            </span>
          </motion.div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-36 gap-5">
            <div
              className="relative"
              style={{
                width: 60,
                height: 60,
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "3px solid rgba(45,106,53,0.12)",
                }}
              />

              <div
                className="sp-spin absolute inset-0 rounded-full"
                style={{
                  border: "3px solid transparent",
                  borderTopColor: "#1a3d1f",
                }}
              />

              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  fontSize: 20,
                }}
              >
                🌱
              </span>
            </div>

            <p
              className="sp-serif font-bold text-[#1a3d1f]"
              style={{
                fontSize: "clamp(16px,4vw,20px)",
              }}
            >
              Loading fresh products...
            </p>

            <p
              className="sp-marathi text-[#a09070]"
              style={{
                fontSize: 13,
              }}
            >
              कोकणातील शेतांमधून थेट तुमच्यासाठी
            </p>
          </div>
        ) : filtered.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 w-full"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product._id}
                  variants={cardAnim}
                  exit={cardAnim.exit}
                  layout
                  className="h-full w-full min-w-0"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="sp-glass relative overflow-hidden text-center"
            style={{
              borderRadius: "clamp(24px,6vw,40px)",
              padding: "clamp(48px,10vw,88px) 24px",
            }}
          >
            <svg
              className="sp-leaf"
              style={{
                width: 180,
                top: -30,
                right: -30,
              }}
              viewBox="0 0 400 400"
              fill="none"
            >
              <path
                d="M200 10C350 60 390 200 200 390 10 200 50 60 200 10Z"
                fill="#1a3d1f"
              />
            </svg>

            <div
              style={{
                fontSize: 60,
                marginBottom: 14,
              }}
            >
              🌾
            </div>

            <h2
              className="sp-serif font-bold text-[#1a3d1f]"
              style={{
                fontSize: "clamp(22px,5vw,32px)",
              }}
            >
              No Products Found
            </h2>

            <p
              className="sp-marathi text-[#a09070] mt-1"
              style={{
                fontSize: 14,
              }}
            >
              उत्पादन सापडले नाही
            </p>

            <p
              className="text-[#7a6a58] mt-3 max-w-xs mx-auto"
              style={{
                fontSize: 13,
              }}
            >
              Try a different category or clear your search.
            </p>

            <button
              onClick={() => {
                setCategory("All");
                setSearch("");
              }}
              className="sp-btn inline-flex items-center gap-2 rounded-2xl font-bold mt-7"
              style={{
                padding: "13px 26px",
                fontSize: 14,
              }}
            >
              Show All Products
              <ArrowRight size={15} />
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Shop;