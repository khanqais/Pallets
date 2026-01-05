import React from "react";
import { FaFacebookF, FaLinkedinIn, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { NavLink, useNavigate } from 'react-router-dom';

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
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-gray-950 dark:via-gray-900 dark:to-black text-white overflow-hidden transition-colors duration-300">


      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="group">
            <div className="relative mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Company
              </h3>
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-500"></div>
            </div>
            <ul className="space-y-3">
              <li>
                <a href="/contact" className="text-gray-300 transition-all duration-300 inline-block">
                  Contact Us
                </a>
              </li>
              <li className="mt-6">
                <a 
                  href="https://maps.app.goo.gl/SEDxS4gSaJaejMdC9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-all duration-300 group/addr"
                >
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      
                      <div className="font-semibold">Shidhi vinayak street, Mumbra,</div>
                      <div> Panvel Hwy, Dahisar, Mumbra</div>
                      <div> Navi Mumbai, Maharashtra 400612</div>
                      {/* <div>Maharashtra, India</div> */}
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 group">
            <div className="relative mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Our Products
              </h3>
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-500"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                "CP Wooden Pallets",
                "Wooden Pallets", 
                "Pine Wood Pallet",
                "Industrial Pallet",
              ].map((product, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={handleProductClick}
                  className="text-gray-300 transition-all duration-300 inline-block p-2 rounded-lg backdrop-blur-sm"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {product}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="#"
                onClick={handleViewAllClick}
                className="group/link inline-flex items-center text-orange-400 font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500/10 to-red-500/10 px-4 py-2 rounded-full border border-orange-500/20"
              >
                View All Products
                <FaArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          <div className="group">
            <div className="relative mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Connect With Us
              </h3>
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-500"></div>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/sharer.php?u=https://www.hkwoodenpallets.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="group/social relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl transition-all duration-300 shadow-lg"
              >
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
                <FaFacebookF className="relative z-10" />
              </a>
              <a
                href="https://www.linkedin.com/cws/share?url=https://www.hkwoodenpallets.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="group/social relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-800 text-white rounded-xl transition-all duration-300 shadow-lg"
              >
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
                <FaLinkedinIn className="relative z-10" />
              </a>
              <a
                href="https://x.com/intent/post?url=https%3A%2F%2Fwww.hkwoodenpallets.com%2F"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
                className="group/social relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-800 to-black text-white rounded-xl transition-all duration-300 shadow-lg"
              >
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
                <FaXTwitter className="relative z-10" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative border-t border-gray-700/50 pt-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-3 rounded-full border border-gray-600/50 backdrop-blur-sm">
              <p className="text-gray-300 text-sm">
                © {new Date().getFullYear()} <span className="font-semibold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">HK Enterprises</span>. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
