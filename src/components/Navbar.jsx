import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import {
  ShoppingCart, Menu, X, User, Package,
  Heart, LogOut, LayoutDashboard,
  Home, Store, Grid, Compass, Info,
} from "lucide-react";

const NavStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');

    .nb { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }

    /* ── Bar — fixed height, never stretches ── */
    .nb-bar {
      background: rgba(10, 26, 10, 0.94);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      transition: background 0.3s ease, box-shadow 0.3s ease;
    }
    .nb-bar.scrolled {
      background: rgba(8, 20, 8, 0.98);
      box-shadow: 0 4px 24px rgba(0,0,0,0.36);
    }

    /* ── Inner row — fixed 56px tall on mobile, 64px desktop ── */
    .nb-inner {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      max-width: 1280px;
      margin: 0 auto;
    }
    @media (min-width: 640px) {
      .nb-inner { height: 64px; padding: 0 24px; }
    }
    @media (min-width: 1024px) {
      .nb-inner { padding: 0 40px; }
    }

    /* ── Logo — single line, never wraps ── */
    .nb-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      flex-shrink: 0;
      line-height: 1;
    }
    .nb-logo-icon {
      width: 32px; height: 32px;
      border-radius: 9px;
      background: linear-gradient(135deg, #1a3d1f, #2d6a35);
      border: 1px solid rgba(251,191,36,0.30);
      display: flex; align-items: center; justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
      box-shadow: 0 3px 10px rgba(0,0,0,0.25);
    }
    .nb-logo-text {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: clamp(16px, 4.5vw, 20px);
      color: #ffffff;
      letter-spacing: 0.01em;
      white-space: nowrap;
    }
    .nb-logo-text em {
      font-style: italic;
      color: #fbbf24;
    }

    /* ── Desktop nav links ── */
    .nb-link {
      position: relative;
      color: rgba(255,255,255,0.68);
      font-size: 14px;
      font-weight: 500;
      padding: 4px 0;
      text-decoration: none;
      transition: color 0.2s ease;
      white-space: nowrap;
    }
    .nb-link::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 0; height: 1.5px;
      background: linear-gradient(90deg, #f59e0b, #fbbf24);
      border-radius: 2px;
      transition: width 0.25s cubic-bezier(0.34,1.56,0.64,1);
    }
    .nb-link:hover        { color: #fde68a; }
    .nb-link:hover::after { width: 100%; }
    .nb-link.active       { color: #fbbf24; }
    .nb-link.active::after{ width: 100%; }

    /* ── Icon button (cart + hamburger) ── */
    .nb-icon-btn {
      width: 36px; height: 36px;
      border-radius: 10px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.10);
      display: flex; align-items: center; justify-content: center;
      color: rgba(255,255,255,0.80);
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      text-decoration: none;
      flex-shrink: 0;
    }
    .nb-icon-btn:hover {
      background: rgba(251,191,36,0.12);
      border-color: rgba(251,191,36,0.30);
      color: #fbbf24;
    }

    /* Cart badge */
    .nb-badge {
      position: absolute;
      top: -5px; right: -5px;
      background: #f59e0b;
      color: #000;
      font-size: 8px;
      font-weight: 800;
      min-width: 16px; height: 16px;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      padding: 0 3px;
      border: 1.5px solid rgba(8,20,8,0.95);
    }

    /* ── Login btn ── */
    .nb-login-btn {
      background: linear-gradient(135deg, #d97706, #fbbf24);
      color: #1a0a00;
      font-weight: 700;
      font-size: 13px;
      padding: 8px 18px;
      border-radius: 9px;
      border: none;
      cursor: pointer;
      box-shadow: 0 3px 12px rgba(245,158,11,0.28);
      transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .nb-login-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(245,158,11,0.38); }

    /* ── Avatar ── */
    .nb-avatar {
      width: 34px; height: 34px;
      border-radius: 9px;
      background: linear-gradient(135deg, #d97706, #fbbf24);
      color: #1a0a00;
      font-family: 'Playfair Display', serif;
      font-weight: 900;
      font-size: 14px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      border: 1.5px solid rgba(251,191,36,0.35);
      box-shadow: 0 3px 10px rgba(245,158,11,0.20);
      transition: transform 0.2s ease;
      user-select: none;
      flex-shrink: 0;
    }
    .nb-avatar:hover { transform: scale(1.07); }

    /* ── Dropdown ── */
    .nb-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 220px;
      background: #fff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 56px rgba(0,0,0,0.16), 0 4px 14px rgba(0,0,0,0.07);
      border: 1px solid rgba(0,0,0,0.05);
      z-index: 100;
    }
    .nb-drop-header {
      background: linear-gradient(135deg, #0f2410, #1a3d1f);
      padding: 15px 18px;
    }
    .nb-drop-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 18px;
      color: #374151;
      font-size: 13px;
      font-weight: 500;
      transition: background 0.14s ease;
      text-decoration: none;
      cursor: pointer;
      background: transparent;
      border: none;
      width: 100%;
      text-align: left;
      font-family: 'DM Sans', sans-serif;
    }
    .nb-drop-item:hover { background: #f9fafb; }
    .nb-drop-item .di   { color: #9ca3af; flex-shrink: 0; }
    .nb-drop-item.red   { color: #ef4444; }
    .nb-drop-item.red:hover { background: #fff5f5; }
    .nb-drop-item.grn   { color: #16a34a; font-weight: 600; }
    .nb-drop-item.grn:hover { background: #f0fdf4; }
    .nb-drop-sep { height: 1px; background: #f3f4f6; margin: 3px 0; }

    /* ══ MOBILE DRAWER ══ */
    .nb-drawer {
      background: #0d220d;
      border-top: 1px solid rgba(255,255,255,0.06);
      overflow: hidden;
    }
    .nb-drawer-inner {
      padding: 12px 14px 18px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* Account card inside drawer */
    .nb-acct-card {
      background: rgba(251,191,36,0.06);
      border: 1px solid rgba(251,191,36,0.14);
      border-radius: 14px;
      padding: 4px 4px 6px;
    }
    .nb-acct-head {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 11px 12px 10px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      margin-bottom: 2px;
    }
    .nb-acct-avatar {
      width: 36px; height: 36px;
      border-radius: 9px;
      background: linear-gradient(135deg, #d97706, #fbbf24);
      color: #1a0a00;
      font-family: 'Playfair Display', serif;
      font-weight: 900;
      font-size: 15px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    /* Mobile nav link */
    .nb-mob-link {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 9px 10px;
      border-radius: 10px;
      color: rgba(255,255,255,0.74);
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.18s ease;
      background: transparent;
      border: none;
      width: 100%;
      cursor: pointer;
      text-align: left;
      font-family: 'DM Sans', sans-serif;
    }
    .nb-mob-link:hover, .nb-mob-link.active {
      background: rgba(251,191,36,0.08);
      color: #fde68a;
    }
    .nb-mob-icon {
      width: 30px; height: 30px;
      border-radius: 8px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      color: rgba(255,255,255,0.50);
      transition: all 0.18s ease;
    }
    .nb-mob-link:hover .nb-mob-icon,
    .nb-mob-link.active .nb-mob-icon {
      background: rgba(251,191,36,0.12);
      border-color: rgba(251,191,36,0.22);
      color: #fbbf24;
    }

    /* Mobile login btn */
    .nb-mob-login-btn {
      width: 100%;
      background: linear-gradient(135deg, #d97706, #fbbf24);
      color: #1a0a00;
      font-weight: 700;
      font-size: 14px;
      padding: 12px;
      border-radius: 11px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(245,158,11,0.24);
      font-family: 'DM Sans', sans-serif;
    }

    .nb-sep { height:1px; background:rgba(255,255,255,0.07); margin: 2px 0; }

    .nb-tagline {
      text-align: center;
      color: rgba(255,255,255,0.20);
      font-size: 10px;
      letter-spacing: 0.15em;
      padding-top: 2px;
    }
  `}</style>
);

const NAV_LINKS = [
  { to: "/",           label: "Home",       icon: Home    },
  { to: "/shop",       label: "Shop",       icon: Store   },
  { to: "/categories", label: "Categories", icon: Grid    },
  { to: "/explore",    label: "Explore",    icon: Compass },
  { to: "/about",      label: "About",      icon: Info    },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef                 = useRef(null);
  const location                = useLocation();
  const { cartItems }           = useCart();

  const totalQty = cartItems.reduce((a, i) => a + i.qty, 0);
  const token    = localStorage.getItem("gavathi_token");

  let userInitial = "U", userRole = "", userName = "User";
  if (token) {
    try {
      const p = JSON.parse(atob(token.split(".")[1]));
      if (p?.name)  { userName = p.name; userInitial = p.name.charAt(0).toUpperCase(); }
      if (p?.role)  { userRole = p.role; }
    } catch {}
  }

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // Close everything on route change
  useEffect(() => { setMenuOpen(false); setDropOpen(false); }, [location]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLogout = () => { localStorage.removeItem("gavathi_token"); window.location.reload(); };
  const isActive = (p) => p === "/" ? location.pathname === "/" : location.pathname.startsWith(p);

  return (
    <>
      <NavStyles />
      <nav className={`nb fixed top-0 left-0 w-full z-50 nb-bar ${scrolled ? "scrolled" : ""}`}>

        {/* ── MAIN BAR ── */}
        <div className="nb-inner">

          {/* LOGO */}
          <Link to="/" className="nb-logo">
            <div className="nb-logo-icon">🌿</div>
            <span className="nb-logo-text">
              Gavathi<em>Point</em>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center" style={{ gap:"clamp(20px,3vw,34px)" }}>
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className={`nb-link ${isActive(to) ? "active" : ""}`}>
                {label}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">

            {/* Cart */}
            <Link to="/cart" className="nb-icon-btn">
              <ShoppingCart size={16} strokeWidth={2.2}/>
              <AnimatePresence>
                {totalQty > 0 && (
                  <motion.span
                    key="b"
                    className="nb-badge"
                    initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}
                    transition={{ type:"spring", stiffness:420, damping:14 }}
                  >
                    {totalQty > 9 ? "9+" : totalQty}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Desktop — avatar / login */}
            {token ? (
              <div className="relative hidden md:block" ref={dropRef}>
                <motion.button
                  className="nb-avatar"
                  onClick={() => setDropOpen(!dropOpen)}
                  whileTap={{ scale:0.92 }}
                >
                  {userInitial}
                </motion.button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      className="nb-dropdown"
                      initial={{ opacity:0, y:-8, scale:0.95 }}
                      animate={{ opacity:1, y:0, scale:1 }}
                      exit={{ opacity:0, y:-8, scale:0.95 }}
                      transition={{ duration:0.16 }}
                    >
                      <div className="nb-drop-header">
                        <p style={{ color:"rgba(187,247,208,0.70)", fontSize:11, marginBottom:2 }}>
                          Welcome back
                        </p>
                        <p style={{ color:"#fff", fontWeight:700, fontSize:15 }}>{userName}</p>
                      </div>
                      <div style={{ padding:"5px 0" }}>
                        <Link to="/profile" className="nb-drop-item"><User size={13} className="di"/> My Profile</Link>
                        <Link to="/orders"  className="nb-drop-item"><Package size={13} className="di"/> My Orders</Link>
                        <Link to="/wishlist" className="nb-drop-item"><Heart size={13} className="di"/> Wishlist</Link>
                        {userRole === "seller" && (
                          <>
                            <div className="nb-drop-sep"/>
                            <Link to="/seller/dashboard" className="nb-drop-item grn">
                              <LayoutDashboard size={13}/> Seller Dashboard
                            </Link>
                          </>
                        )}
                        <div className="nb-drop-sep"/>
                        <button className="nb-drop-item red" onClick={handleLogout}>
                          <LogOut size={13}/> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <button className="nb-login-btn">Login</button>
              </Link>
            )}

            {/* Hamburger — mobile only */}
            <motion.button
              className="nb-icon-btn md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale:0.88 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen
                  ? <motion.span key="x"
                      initial={{ rotate:-80, opacity:0 }} animate={{ rotate:0, opacity:1 }}
                      exit={{ rotate:80, opacity:0 }} transition={{ duration:0.14 }}>
                      <X size={16}/>
                    </motion.span>
                  : <motion.span key="m"
                      initial={{ rotate:80, opacity:0 }} animate={{ rotate:0, opacity:1 }}
                      exit={{ rotate:-80, opacity:0 }} transition={{ duration:0.14 }}>
                      <Menu size={16}/>
                    </motion.span>
                }
              </AnimatePresence>
            </motion.button>

          </div>
        </div>

        {/* ══ MOBILE DRAWER ══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="nb-drawer md:hidden"
              initial={{ height:0, opacity:0 }}
              animate={{ height:"auto", opacity:1 }}
              exit={{ height:0, opacity:0 }}
              transition={{ duration:0.28, ease:[0.25,0.46,0.45,0.94] }}
            >
              <div className="nb-drawer-inner">

                {/* Account card */}
                {token && (
                  <div className="nb-acct-card">
                    <div className="nb-acct-head">
                      <div className="nb-acct-avatar">{userInitial}</div>
                      <div>
                        <p style={{ color:"#fde68a", fontWeight:700, fontSize:14, lineHeight:1.2 }}>
                          {userName}
                        </p>
                        <p style={{ color:"rgba(255,255,255,0.38)", fontSize:11, marginTop:2 }}>
                          {userRole === "seller" ? "Seller Account" : "Customer"}
                        </p>
                      </div>
                    </div>
                    <Link to="/profile"  className="nb-mob-link"><span className="nb-mob-icon"><User size={13}/></span> My Profile</Link>
                    <Link to="/orders"   className="nb-mob-link"><span className="nb-mob-icon"><Package size={13}/></span> My Orders</Link>
                    <Link to="/wishlist" className="nb-mob-link"><span className="nb-mob-icon"><Heart size={13}/></span> Wishlist</Link>
                    {userRole === "seller" && (
                      <Link to="/seller/dashboard" className="nb-mob-link" style={{ color:"#4ade80" }}>
                        <span className="nb-mob-icon"><LayoutDashboard size={13}/></span> Seller Dashboard
                      </Link>
                    )}
                    <button className="nb-mob-link" onClick={handleLogout} style={{ color:"#f87171" }}>
                      <span className="nb-mob-icon"><LogOut size={13}/></span> Logout
                    </button>
                  </div>
                )}

                {/* Nav links */}
                <div>
                  {NAV_LINKS.map(({ to, label, icon:Icon }, i) => (
                    <motion.div
                      key={to}
                      initial={{ opacity:0, x:-12 }}
                      animate={{ opacity:1, x:0 }}
                      transition={{ delay:i * 0.04, duration:0.18 }}
                    >
                      <Link to={to} className={`nb-mob-link ${isActive(to) ? "active" : ""}`}>
                        <span className="nb-mob-icon"><Icon size={14}/></span>
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Login if not logged in */}
                {!token && (
                  <motion.div
                    initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                    transition={{ delay:0.20 }}
                  >
                    <Link to="/login">
                      <button className="nb-mob-login-btn">Login / Sign Up</button>
                    </Link>
                  </motion.div>
                )}

                <div className="nb-sep"/>
                <p className="nb-tagline">आपल्या माणसाचा · गावठी ब्रँड</p>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </>
  );
};

export default Navbar;