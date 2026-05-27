import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, Leaf, MapPin } from "lucide-react";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Tiro+Devanagari+Marathi&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

    .hr { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    .hr-serif   { font-family: 'Playfair Display', serif; }
    .hr-marathi { font-family: 'Tiro Devanagari Marathi', serif; }

    .hr-bg {
      background:
        radial-gradient(ellipse 70% 55% at 90% 10%, rgba(45,106,53,0.10) 0%, transparent 60%),
        radial-gradient(ellipse 55% 50% at 5%  90%, rgba(201,144,12,0.08) 0%, transparent 60%),
        linear-gradient(158deg, #faf6ee 0%, #f1ead8 100%);
    }

    /* Grain */
    .hr::before {
      content:''; position:absolute; inset:0; pointer-events:none; z-index:0;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E");
      background-size:180px 180px;
    }

    .hr-badge {
      background: linear-gradient(135deg, rgba(45,106,53,0.11), rgba(201,144,12,0.09));
      border: 1px solid rgba(45,106,53,0.22);
      backdrop-filter: blur(8px);
    }

    .hr-btn-p {
      background: linear-gradient(135deg, #1a3d1f 0%, #2d6a35 100%);
      box-shadow: 0 8px 26px rgba(26,61,31,0.30), inset 0 1px 0 rgba(255,255,255,0.10);
      color: #fff;
      transition: all 0.28s cubic-bezier(0.34,1.56,0.64,1);
    }
    .hr-btn-p:hover  { transform:translateY(-2px) scale(1.02); box-shadow:0 14px 34px rgba(26,61,31,0.36); }
    .hr-btn-p:active { transform:scale(0.98); }

    .hr-btn-o {
      border: 1.5px solid #1a3d1f; color: #1a3d1f;
      background: transparent;
      transition: all 0.25s ease;
    }
    .hr-btn-o:hover  { background:#1a3d1f; color:#fff; transform:translateY(-2px); }
    .hr-btn-o:active { transform:scale(0.98); }

    /* Product card glass */
    .hr-card {
      background: rgba(255,255,255,0.82);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.80);
      box-shadow: 0 20px 56px rgba(26,61,31,0.14), 0 4px 14px rgba(0,0,0,0.06);
    }

    .hr-trust {
      background: rgba(255,255,255,0.82);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(45,106,53,0.13);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .hr-trust:hover { transform:translateY(-3px); box-shadow:0 12px 24px rgba(26,61,31,0.10); }

    .hr-chip {
      background: linear-gradient(135deg, rgba(45,106,53,0.09), rgba(201,144,12,0.06));
      border: 1px solid rgba(45,106,53,0.16);
      color: #1a3d1f; font-weight:600;
    }

    .hr-gold {
      background: linear-gradient(135deg,#c9900c,#e6b830);
      color:#fff;
      box-shadow: 0 3px 10px rgba(201,144,12,0.36);
    }

    .hr-info {
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(45,106,53,0.14);
      box-shadow: 0 6px 18px rgba(26,61,31,0.09);
    }

    .hr-dot { width:4px; height:4px; border-radius:50%; background:#c9900c; display:inline-block; }
    .hr-leaf { position:absolute; opacity:0.055; pointer-events:none; }

    @keyframes floatY {
      0%,100%{ transform:translateY(0px) rotate(0deg); }
      50%    { transform:translateY(-13px) rotate(0.7deg); }
    }
    @keyframes pulseG {
      0%,100%{ box-shadow:0 0 0 0   rgba(45,106,53,0.30); }
      50%    { box-shadow:0 0 0 10px rgba(45,106,53,0); }
    }

    .hr-float { animation: floatY 5s ease-in-out infinite; }
    .hr-pulse { animation: pulseG 2s ease-in-out infinite; }

    /* ── Desktop side floaters hidden on mobile/tablet ── */
    @media (max-width: 1023px) { .hr-side-floater { display:none !important; } }

    /* ── Mobile trust pills shown only on mobile ── */
    .hr-trust-mobile  { display:none; }
    .hr-trust-desktop { display:block; }
    @media (max-width: 639px) {
      .hr-trust-mobile  { display:flex !important; }
      .hr-trust-desktop { display:none !important; }
    }

    /* ── Mobile card: VERTICAL clean layout ── */
    /* On mobile the card stacks vertically - image on top, full clear content below */
    .hr-mobile-card-img {
      height: clamp(180px, 52vw, 230px);
      width: 100%;
      object-fit: cover;
      display: block;
      /* Sharp image — no blur */
      image-rendering: auto;
      filter: none;
    }

    /* Card browse button — solid, always visible */
    .hr-card-browse-btn {
      background: linear-gradient(135deg, #1a3d1f 0%, #2d6a35 100%);
      color: #fff !important;
      font-weight: 700;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      border-radius: 14px;
      padding: 13px 20px;
      font-size: clamp(13px, 3.5vw, 15px);
      box-shadow: 0 6px 20px rgba(26,61,31,0.30);
      transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
      cursor: pointer;
      text-decoration: none;
    }
    .hr-card-browse-btn:hover { transform:translateY(-2px); box-shadow:0 12px 28px rgba(26,61,31,0.36); }
    .hr-card-browse-btn:active { transform:scale(0.98); }
  `}</style>
);

const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.10 } } };
const fadeUp  = { hidden:{ opacity:0, y:26 }, show:{ opacity:1, y:0, transition:{ duration:0.62, ease:[0.25,0.46,0.45,0.94] } } };
const fadeIn  = { hidden:{ opacity:0 }, show:{ opacity:1, transition:{ duration:0.50 } } };

const STATS = [
  { num:"500+", label:"Products" },
  { num:"50+",  label:"Villages" },
  { num:"4.9★", label:"Rating"   },
];

const TRUST = [
  { icon:ShieldCheck, title:"100% Organic",    sub:"Certified natural" },
  { icon:Truck,       title:"Pan Maharashtra", sub:"Doorstep delivery" },
  { icon:Leaf,        title:"Village Sourced", sub:"50+ Konkan farms"  },
];

const CHIPS = ["गावठी तांदूळ", "काजू", "आंबा पापड", "कोकम"];

const Hero = () => (
  <section
    className="hr hr-bg relative overflow-hidden flex items-center"
    style={{ minHeight:"100svh", paddingTop:"clamp(88px,18vw,120px)", paddingBottom:"clamp(48px,8vw,80px)" }}
  >
    <FontStyle />

    {/* Deco leaves */}
    <svg className="hr-leaf" style={{ width:"clamp(240px,55vw,520px)", top:"-80px", right:"-60px" }} viewBox="0 0 400 400" fill="none">
      <path d="M200 10C350 60 390 200 200 390 10 200 50 60 200 10Z" fill="#1a3d1f"/>
    </svg>
    <svg className="hr-leaf" style={{ width:"clamp(140px,32vw,280px)", bottom:"0", left:"-40px" }} viewBox="0 0 400 400" fill="none">
      <path d="M200 10C350 60 390 200 200 390 10 200 50 60 200 10Z" fill="#c9900c"/>
    </svg>

    <div className="max-w-7xl mx-auto w-full relative z-10" style={{ padding:"0 clamp(16px,5vw,40px)" }}>

      {/* ═══ GRID ═══ */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">

        {/* ── LEFT ── */}
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="relative z-10 text-center lg:text-left">

          {/* Badge */}
          <motion.div variants={fadeIn} className="flex justify-center lg:justify-start mb-5">
            <span className="hr-badge inline-flex items-center gap-2 rounded-full" style={{ padding:"10px 18px" }}>
              <MapPin size={12} className="text-[#2d6a35]" />
              <span className="font-semibold text-[#1a3d1f] uppercase tracking-widest"
                style={{ fontSize:"clamp(9px,2.5vw,11px)" }}>
                कोकण · Organic · Trusted
              </span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={fadeUp}
            className="hr-serif font-black leading-[1.02] tracking-[-0.025em] text-[#1a3d1f]"
            style={{ fontSize:"clamp(36px,9.5vw,78px)" }}>
            Real{" "}
            <span className="italic" style={{ color:"#2d6a35" }}>Gavathi</span>
            <br />
            <span>Taste,</span>
            <br />
            <span style={{
              background:"linear-gradient(130deg,#1a3d1f 25%,#c9900c 100%)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
            }}>
              Fresh at Your Doorstep
            </span>
          </motion.h1>

          {/* Divider dots */}
          <motion.div variants={fadeIn}
            className="flex items-center gap-2.5 justify-center lg:justify-start"
            style={{ margin:"clamp(14px,4vw,22px) 0" }}>
            <div className="h-px bg-gradient-to-r from-[#2d6a35] to-transparent w-10"/>
            <span className="hr-dot"/>
            <span className="hr-dot" style={{ opacity:0.4 }}/>
          </motion.div>

          {/* Marathi subtext */}
          <motion.p variants={fadeUp}
            className="hr-marathi text-[#4a3728] leading-[1.9] max-w-[520px] mx-auto lg:mx-0"
            style={{ fontSize:"clamp(14px,3.8vw,18px)" }}>
            कोकणातील अस्सल घरगुती, सेंद्रिय आणि गावठी उत्पादने आता थेट तुमच्या घरापर्यंत.{" "}
            <span className="text-[#2d6a35] font-semibold">
              विश्वासू स्थानिक विक्रेत्यांकडून शुद्ध गुणवत्ता.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp}
            className="flex gap-3 justify-center lg:justify-start flex-wrap"
            style={{ marginTop:"clamp(22px,6vw,34px)" }}>
            <Link to="/shop">
              <button className="hr-btn-p flex items-center gap-2 font-semibold rounded-2xl group"
                style={{ padding:"clamp(12px,3vw,16px) clamp(22px,5vw,32px)", fontSize:"clamp(13px,3.5vw,15px)" }}>
                आत्ताच खरेदी करा
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200"/>
              </button>
            </Link>
            <button className="hr-btn-o font-semibold rounded-2xl"
              style={{ padding:"clamp(12px,3vw,16px) clamp(22px,5vw,32px)", fontSize:"clamp(13px,3.5vw,15px)" }}>
              Explore
            </button>
          </motion.div>

          {/* Mobile trust pills */}
          <motion.div variants={fadeIn}
            className="hr-trust-mobile flex-wrap items-center justify-center gap-2"
            style={{ marginTop:"clamp(16px,4vw,24px)" }}>
            {TRUST.map(({ icon:Icon, title }) => (
              <span key={title} className="hr-info inline-flex items-center gap-1.5 rounded-full"
                style={{ padding:"8px 14px" }}>
                <Icon size={13} className="text-[#2d6a35]"/>
                <span className="text-[11px] font-semibold text-[#1a3d1f]">{title}</span>
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeIn}
            className="flex items-center justify-center lg:justify-start gap-6 sm:gap-10 border-t border-[#1a3d1f]/10"
            style={{ marginTop:"clamp(18px,5vw,30px)", paddingTop:"clamp(16px,4vw,24px)" }}>
            {STATS.map(({ num, label }) => (
              <div key={label} className="text-center lg:text-left">
                <p className="hr-serif font-bold text-[#1a3d1f]"
                  style={{ fontSize:"clamp(18px,5vw,24px)" }}>{num}</p>
                <p className="font-bold text-[#5c3a1e] uppercase tracking-wider mt-0.5"
                  style={{ fontSize:"clamp(9px,2.2vw,11px)" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT — Product Card ── */}
        <motion.div
          initial={{ opacity:0, y:46 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.88, ease:[0.25,0.46,0.45,0.94], delay:0.18 }}
          className="relative flex justify-center items-center"
          style={{ marginTop:"clamp(4px,3vw,0px)" }}
        >
          {/* Glow */}
          <div className="absolute rounded-full pointer-events-none" style={{
            width:"clamp(240px,70vw,400px)", height:"clamp(240px,70vw,400px)",
            background:"radial-gradient(circle,rgba(45,106,53,0.15) 0%,transparent 70%)",
            filter:"blur(48px)",
          }}/>

          {/* ═══════════════════════════════════
              PRODUCT CARD — clean vertical layout
              Image sharp + full width on top
              Clear readable content below
          ═══════════════════════════════════ */}
          <div
            className="hr-float hr-card relative z-10 overflow-hidden"
            style={{ width:"min(92vw, 370px)", borderRadius:"clamp(22px,6vw,38px)" }}
          >
            {/* ── Image — NO blur, NO overlay on product ── */}
            <div className="relative overflow-hidden" style={{ borderRadius:"clamp(22px,6vw,38px) clamp(22px,6vw,38px) 0 0" }}>
              <motion.img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop"
                alt="Fresh Gavathi organic produce"
                className="hr-mobile-card-img"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {/* Soft bottom fade — very light, won't blur the product */}
              <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height:"50%", background:"linear-gradient(to top, rgba(26,61,31,0.32) 0%, transparent 100%)" }}/>

              {/* Rating badge — top right */}
              <div className="hr-gold absolute flex items-center gap-1 rounded-full font-bold"
                style={{ top:11, right:11, padding:"6px 12px", fontSize:"clamp(10px,2.5vw,12px)" }}>
                ⭐ 4.9
              </div>

              {/* Live badge — top left */}
              <div className="hr-info absolute flex items-center gap-1.5 rounded-full"
                style={{ top:11, left:11, padding:"6px 12px" }}>
                <span className="hr-pulse rounded-full bg-emerald-500 inline-block" style={{ width:7, height:7 }}/>
                <span className="font-semibold text-[#1a3d1f]" style={{ fontSize:"clamp(9px,2.3vw,11px)" }}>Live Orders</span>
              </div>
            </div>

            {/* ── Card Body — clean white/cream area ── */}
            <div style={{ background:"rgba(250,246,238,0.98)", padding:"clamp(14px,4vw,20px)" }}>

              {/* Title row */}
              <div className="flex justify-between items-center gap-2">
                <div>
                  <h2 className="hr-serif font-bold text-[#1a3d1f]"
                    style={{ fontSize:"clamp(16px,4.5vw,20px)" }}>
                    Gavathi Bazaar
                  </h2>
                  <p className="text-[#5c3a1e] mt-0.5"
                    style={{ fontSize:"clamp(10px,2.6vw,12px)" }}>
                    Homemade · Organic · Fresh
                  </p>
                </div>
                <span className="text-[#2d6a35] bg-green-50 border border-green-100 font-bold rounded-full flex-shrink-0"
                  style={{ fontSize:"clamp(9px,2.2vw,10px)", padding:"5px 10px" }}>
                  ✓ Verified
                </span>
              </div>

              {/* Product chips */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {CHIPS.map(item => (
                  <span key={item} className="hr-chip hr-marathi rounded-full"
                    style={{ padding:"5px 11px", fontSize:"clamp(10px,2.6vw,12px)" }}>
                    {item}
                  </span>
                ))}
              </div>

              {/* ── BROWSE BUTTON — always solid, always visible ── */}
              <div style={{ marginTop:"clamp(12px,3.5vw,16px)" }}>
                <Link to="/shop" className="hr-card-browse-btn">
                  Browse All Products
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Pure badge row below button */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                <ShieldCheck size={12} className="text-[#2d6a35]"/>
                <span className="text-[#2d6a35] font-semibold" style={{ fontSize:"clamp(9px,2.2vw,11px)" }}>
                  100% Pure · No Chemicals
                </span>
              </div>
            </div>
          </div>

          {/* Desktop-only side floaters */}
          <motion.div
            initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:1.0, duration:0.55 }}
            className="hr-side-floater hr-info absolute flex-col rounded-2xl"
            style={{ right:"-20px", bottom:"28%", padding:"14px 16px", width:130 }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Truck size={14} className="text-[#2d6a35]"/>
              <span className="font-bold text-[#1a3d1f]" style={{ fontSize:11 }}>Fast Delivery</span>
            </div>
            <p className="text-gray-500" style={{ fontSize:10 }}>Direct from Konkan</p>
          </motion.div>

          <motion.div
            initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:1.15, duration:0.55 }}
            className="hr-side-floater hr-info absolute flex-col rounded-2xl"
            style={{ left:"-20px", top:"30%", padding:"14px 16px", width:130 }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Leaf size={14} className="text-[#2d6a35]"/>
              <span className="font-bold text-[#1a3d1f]" style={{ fontSize:11 }}>50+ Villages</span>
            </div>
            <p className="text-gray-500" style={{ fontSize:10 }}>Konkan sourced farms</p>
          </motion.div>

        </motion.div>
      </div>

      {/* ═══ TRUST BAR — desktop/tablet ═══ */}
      <motion.div
        className="hr-trust-desktop"
        initial={{ opacity:0, y:26 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.90, duration:0.65 }}>
        <div className="border-t border-[#1a3d1f]/10"
          style={{ marginTop:"clamp(32px,7vw,60px)", paddingTop:"clamp(22px,5vw,30px)" }}>
          <p className="text-center font-semibold text-[#5c3a1e] uppercase tracking-[0.18em] mb-5"
            style={{ fontSize:"clamp(9px,2vw,11px)" }}>
            Trusted by families across Maharashtra
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md sm:max-w-lg mx-auto">
            {TRUST.map(({ icon:Icon, title, sub }) => (
              <div key={title} className="hr-trust rounded-2xl text-center"
                style={{ padding:"clamp(12px,3vw,18px) clamp(8px,2vw,16px)" }}>
                <div className="rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-2"
                  style={{ width:36, height:36 }}>
                  <Icon size={16} className="text-[#2d6a35]"/>
                </div>
                <h3 className="font-bold text-[#1a3d1f] leading-tight"
                  style={{ fontSize:"clamp(10px,2.5vw,13px)" }}>{title}</h3>
                <p className="text-gray-500 mt-0.5 leading-snug"
                  style={{ fontSize:"clamp(9px,2.2vw,11px)" }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  </section>
);

export default Hero;