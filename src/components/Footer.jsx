import React from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Tiro+Devanagari+Marathi&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .ft { font-family:'DM Sans',sans-serif; }
        .ft-serif   { font-family:'Playfair Display',serif; }
        .ft-marathi { font-family:'Tiro Devanagari Marathi',serif; }
        .ft-root {
          background: linear-gradient(180deg,#0d220d 0%,#091509 100%);
          border-top: 1px solid rgba(255,255,255,0.07);
          position: relative; overflow: hidden;
        }
        .ft-root::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size:180px;
        }
        .ft-link {
          color:rgba(255,255,255,0.52); font-size:13px; font-weight:500;
          text-decoration:none; transition:color 0.18s ease; white-space:nowrap;
        }
        .ft-link:hover { color:#fbbf24; }
        .ft-divider { height:1px; background:linear-gradient(to right,transparent,rgba(255,255,255,0.08),transparent); }
      `}</style>

      <footer className="ft ft-root">
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">

          {/* ── MAIN ROW ── */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 py-10">

            {/* Brand */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2.5 mb-2">
                <div style={{
                  width:32, height:32, borderRadius:9, fontSize:16,
                  background:"linear-gradient(135deg,#1a3d1f,#2d6a35)",
                  border:"1px solid rgba(251,191,36,0.28)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"0 3px 10px rgba(0,0,0,0.28)", flexShrink:0,
                }}>🌿</div>
                <span className="ft-serif font-black text-white" style={{ fontSize:19 }}>
                  Gavathi<em style={{ fontStyle:"italic", color:"#fbbf24" }}>Point</em>
                </span>
              </div>
              <p className="ft-marathi" style={{ fontSize:11, color:"rgba(251,191,36,0.50)", letterSpacing:"0.10em" }}>
                आपल्या माणसाचा ब्रँड
              </p>
              <div className="flex items-center gap-1.5 mt-3"
                style={{ background:"rgba(45,106,53,0.16)", border:"1px solid rgba(45,106,53,0.26)",
                  borderRadius:999, padding:"4px 11px", width:"fit-content" }}>
                <MapPin size={10} className="text-emerald-400"/>
                <span className="ft-marathi text-emerald-300" style={{ fontSize:10, fontWeight:600 }}>
                  कोकण, महाराष्ट्र
                </span>
              </div>
            </div>

            {/* Links — two small columns */}
            <div className="flex gap-10 sm:gap-14">
              <div className="flex flex-col gap-2.5">
                <p className="ft-serif font-bold text-white mb-1" style={{ fontSize:13 }}>Navigate</p>
                {[
                  { to:"/",     label:"Home"  },
                  { to:"/shop", label:"Shop"  },
                  { to:"/about",label:"About" },
                ].map(({ to, label }) => (
                  <Link key={to} to={to} className="ft-link">{label}</Link>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                <p className="ft-serif font-bold text-white mb-1" style={{ fontSize:13 }}>Products</p>
                {["Grains 🌾","Fruits 🥭","Spices 🌶️","Pickles 🫙"].map((l) => (
                  <Link key={l} to="/shop" className="ft-link">{l}</Link>
                ))}
              </div>
            </div>

            {/* Tagline blurb */}
            <div className="hidden lg:block max-w-[200px]">
              <p style={{ color:"rgba(255,255,255,0.38)", fontSize:13, lineHeight:1.7 }}>
                Pure village products from Konkan — organically grown, traditionally prepared.
              </p>
            </div>

          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="ft-divider"/>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4">
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.26)" }}>
              © 2026{" "}
              <span className="ft-serif" style={{ color:"rgba(251,191,36,0.55)", fontWeight:700 }}>
                GavathiPoint
              </span>
              {" "}· All rights reserved
            </p>
            <div className="flex items-center gap-1" style={{ fontSize:11, color:"rgba(255,255,255,0.26)" }}>
              Made with <Heart size={10} className="text-red-400 mx-0.5"/> in Konkan
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;