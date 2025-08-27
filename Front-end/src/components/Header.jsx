import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { assets } from "../assets/assets";
import { NavLink } from 'react-router-dom';
import QuickMessagePopup from './QuickMessagePopup'; 
import Swal from "sweetalert2";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [mobileAboutDropdown, setMobileAboutDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isProductPage = location.pathname === '/product';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleMessageSubmit = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact`, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        phone: formData.phone,
        message: formData.message,
      });

      if (response.status === 200) {
        Swal.fire({
            title: "✅ Message Sent!",
            html: `
              <p>We'll get back to you soon.</p>
            `,
            icon: "success",
            confirmButtonText: "Great!",
            confirmButtonColor: "#3085d6",
          });
      }
     
          
          

      
      



    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
      throw error;
    }
  };

  const handleMobileNavClick = (path) => {
    setMenuOpen(false);
    setTimeout(() => {
      navigate(path);
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <>
      <div className="sticky top-0 z-40 bg-white shadow-lg">
        <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="group">
                  <NavLink to='/' className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent hover:from-orange-600 hover:to-red-600 transition-all duration-500">
                    H.K Enterprises
                  </NavLink>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1 hover:text-orange-600 transition-colors duration-300">
                      <FaMapMarkerAlt className="text-orange-500" />
                      <span>Thane, Maharashtra</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-green-600 transition-colors duration-300">
                      <FaCheckCircle className="text-green-500" />
                      <span>
                        GST No.- <strong>27BJNPA8946A1Z7</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://trustseal.indiamart.com/members/hk-enterprisesnavimumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
              >
                <div className="hidden md:block relative group">
                  <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-500 blur-lg animate-pulse"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                      <FaShieldAlt className="text-white text-2xl" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-800">✓</span>
                    </div>
                    <div className="text-center mt-1">
                      <div className="text-xs font-bold text-gray-800">TRUST</div>
                      <div className="text-xs font-bold text-gray-800">SEAL</div>
                      <div className="text-xs text-orange-600 font-medium">
                        IndiaMART
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <div className="hidden md:flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-lg"></div>
                  <div className="relative bg-white border-2 border-gray-200 hover:border-green-400 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <FaPhone className="text-green-600 text-xl" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">
                          Call 07942667387
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          79% Response rate
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowMessagePopup(true)}
                  className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  <div className="relative flex items-center gap-2 font-semibold">
                    <FaEnvelope />
                    <span>Send Email</span>
                  </div>
                </button>
              </div>

              <button
                className="md:hidden relative text-gray-700 text-2xl p-2 rounded-xl hover:bg-orange-100 transition-all duration-300"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <FaBars
                    className={`absolute transition-all duration-500 ${
                      menuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                    }`}
                  />
                  <FaTimes
                    className={`absolute transition-all duration-500 ${
                      menuOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ${
          scrolled ? "bg-gray-800/95 backdrop-blur-lg" : "bg-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="hidden md:flex items-center">
              <NavLink to="/product" className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                <FaBars className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-semibold">Our Products</span>
              </NavLink>

              <nav className="flex items-center ml-8 gap-8">
                <NavLink
                  to="/"
                  className="text-white hover:text-orange-400 font-medium transition-all duration-300 hover:scale-105 relative group"
                >
                  Home
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></div>
                </NavLink>

                <div
                  className="relative"
                  onMouseEnter={() => setAboutDropdown(true)}
                  onMouseLeave={() => setAboutDropdown(false)}
                >
                  <button className="flex items-center gap-1 text-white hover:text-orange-400 font-medium transition-all duration-300 hover:scale-105 py-2">
                    About Us
                    <FaChevronDown
                      className={`transition-transform duration-300 ${
                        aboutDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {aboutDropdown && (
                    <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 transform transition-all duration-200 ease-out">
                      <a
                        href='/h_k_enterprises.pdf'
                        download
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 font-semibold"
                      >
                        Download Brochure
                      </a>
                    </div>
                  )}
                </div>

                <NavLink
                  to="/contact"
                  className="text-white hover:text-orange-400 font-medium transition-all duration-300 hover:scale-105 relative group"
                >
                  Contact Us
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></div>
                </NavLink>
              </nav>
            </div>

            
          </div>
        </div>
      </div>



      <div
        className={`md:hidden overflow-hidden transition-all duration-700 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="sticky bg-gray-800 px-6 py-6 space-y-4">
          

          <div className="space-y-3">
            <button 
              onClick={() => handleMobileNavClick('/product')}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full text-left"
            >
              <FaBars />
              <span className="font-semibold">Our Products</span>
            </button>
            <button
              onClick={() => handleMobileNavClick('/')}
              className="block text-white hover:text-orange-400 py-2 transition-colors duration-300 w-full text-left"
            >
              Home
            </button>
            
            <div>
              <button 
                onClick={() => setMobileAboutDropdown(!mobileAboutDropdown)}
                className="flex items-center gap-1 text-white hover:text-orange-400 font-medium transition-all duration-300 py-2 w-full text-left"
              >
                About Us
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    mobileAboutDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileAboutDropdown && (
                <div className="ml-4 mt-2">
                  <a
                    href='/h_k_enterprises.pdf'
                    download
                    onClick={() => {
                      setMobileAboutDropdown(false);
                      setMenuOpen(false);
                    }}
                    className="block text-orange-400 hover:text-orange-300 py-2 transition-colors duration-200 font-medium"
                  >
                    Download Brochure
                  </a>
                </div>
              )}
            </div>

            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:text-orange-400 py-2 transition-colors duration-300"
            >
              Contact Us
            </NavLink>
          </div>

          <div className="border-t border-gray-600 pt-4 space-y-3">
            <a 
              href="tel:07942667387" 
              className="flex items-center gap-2 text-white hover:text-green-400 transition-colors duration-300"
            >
              <FaPhone className="text-green-400" />
              <span>Call 07942667387</span>
            </a>
            <button
              onClick={() => {
                setShowMessagePopup(true);
                setMenuOpen(false);
              }}
              className="w-full bg-orange-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors duration-300"
            >
              <FaEnvelope />
              <span>Send Email</span>
            </button>
          </div>
        </div>
      </div>

      <QuickMessagePopup
        isOpen={showMessagePopup}
        onClose={() => setShowMessagePopup(false)}
        onSubmit={handleMessageSubmit}
      />

      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;
