import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleProductClick = (e) => {
    e.preventDefault();
    navigate('/product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllClick = (e) => {
    e.preventDefault();
    navigate('/product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="rounded-t-[4rem] bg-[#1A1A1A] px-6 py-14 text-[#F2F0E9] md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-heading text-2xl font-bold tracking-tight">H.K Enterprises</p>
          <p className="mt-3 max-w-md text-sm text-[#F2F0E9]/75">Engineered pallet systems built for strength, custom readiness, and quote speed.</p>
          <a
            href="https://maps.app.goo.gl/SEDxS4gSaJaejMdC9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-start gap-2 rounded-[1.2rem] border border-[#F2F0E9]/20 px-3 py-2 text-sm text-[#F2F0E9]/85 transition-transform duration-300 hover:-translate-y-px"
          >
            <MapPin size={16} className="mt-0.5 text-[#CC5833]" />
            <span>Shidhi Vinayak Street, Mumbra, Navi Mumbai, Maharashtra 400612</span>
          </a>
        </div>

        <div>
          <p className="font-data text-xs uppercase tracking-[0.16em] text-[#F2F0E9]/60">Navigation</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a href="/" className="transition-transform duration-300 hover:-translate-y-px">Home</a>
            <a href="/product" onClick={handleProductClick} className="transition-transform duration-300 hover:-translate-y-px">Products</a>
            <a href="/contact" className="transition-transform duration-300 hover:-translate-y-px">Contact</a>
          </div>
        </div>

        <div>
          <p className="font-data text-xs uppercase tracking-[0.16em] text-[#F2F0E9]/60">Catalog</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#F2F0E9]/85">
            <button onClick={handleProductClick} className="text-left transition-transform duration-300 hover:-translate-y-px">CP Wooden Pallets</button>
            <button onClick={handleProductClick} className="text-left transition-transform duration-300 hover:-translate-y-px">Wooden Pallets</button>
            <button onClick={handleProductClick} className="text-left transition-transform duration-300 hover:-translate-y-px">Pine Wood Pallet</button>
            <button onClick={handleProductClick} className="text-left transition-transform duration-300 hover:-translate-y-px">Industrial Pallet</button>
            <button onClick={handleViewAllClick} className="mt-2 inline-flex items-center gap-2 text-[#CC5833] transition-transform duration-300 hover:-translate-y-px">
              View All <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-[#F2F0E9]/15 pt-6 text-sm text-[#F2F0E9]/70">
        <p>© {new Date().getFullYear()} H.K Enterprises. All rights reserved.</p>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#F2F0E9]/20 px-3 py-1 font-data text-xs uppercase tracking-[0.12em]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#2ecc71]" /> System Operational
        </div>
      </div>
    </footer>
  );
};

export default Footer;
