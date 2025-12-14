import React, { useState, useEffect } from "react";
import {
  FaHandshake,
  FaUsers,
  FaBuilding,
  FaBalanceScale,
  FaChartLine,
  FaIdCard,
  FaShieldAlt,
  FaEye,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import TextType from './TextType';
import GlowingEffect from './GlowingEffect';

const BusinessInfoSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("business-info");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const businessData = [
    {
      icon: FaHandshake,
      title: "Nature of Business",
      value: "Trader - Wholesaler/Distributor",
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      delay: "0ms"
    },
    {
      icon: FaUsers,
      title: "Total Number of Employees",
      value: "Upto 10 People",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      delay: "100ms"
    },
    {
      icon: FaBuilding,
      title: "GST Registration Date",
      value: "04-03-2022",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      delay: "200ms"
    },
    {
      icon: FaBalanceScale,
      title: "Legal Status of Firm",
      value: "Proprietorship",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      delay: "300ms"
    },
    {
      icon: FaChartLine,
      title: "Annual Turnover",
      value: "₹40 L - 1.5 Cr",
      gradient: "from-teal-500 to-cyan-600",
      bgGradient: "from-teal-50 to-cyan-50",
      delay: "400ms"
    },
    {
      icon: FaIdCard,
      title: "GST No.",
      value: "27BJNPA8946A1Z7",
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      delay: "500ms"
    }
  ];

  return (
    <section 
      id="business-info" 
      className="relative py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-300"
    >
      


      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-lg md:text-xl uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3 font-semibold transition-colors duration-300">
              WELCOME TO
            </h2>
            
            <div className="text-4xl md:text-6xl font-bold mb-4 min-h-[4rem] md:min-h-[6rem] flex items-center justify-center">
              <TextType 
                text={[
                  "H.K Enterprises",
                  "Quality Wooden Pallets",
                  "Trusted Packaging Solutions",
                  "Premium Industrial Pallets"
                ]}
                typingSpeed={100}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="|"
                className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 dark:from-orange-400 dark:via-orange-500 dark:to-red-500 bg-clip-text text-transparent"
                cursorClassName="text-orange-600 dark:text-orange-500 animate-pulse"
              />
            </div>
            
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full"></div>
            
            
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 dark:text-white leading-relaxed mb-4">
                GET IN TOUCH WITH US FOR BEST DEALS
              </p>
              
              {expanded && (
                <div className="text-lg text-gray-600 dark:text-gray-200 space-y-2 animate-fadeIn">
                  <p>We are a leading trader and wholesaler/distributor specializing in high-quality wooden pallets and packaging solutions.</p>
                  <p>With years of experience in the industry, we provide reliable products that meet international standards.</p>
                </div>
              )}
              
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-orange-600 font-semibold flex items-center gap-2 mx-auto mt-3 transition-colors duration-300"
              >
                {expanded ? 'Read Less...' : 'Read More...'}
                {expanded ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessData.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg transition-all duration-500 border border-white/50 dark:border-gray-700/50 overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                animationDelay: item.delay,
                transitionDelay: item.delay 
              }}
            >
              <GlowingEffect
                blur={10}
                spread={30}
                inactiveZone={0.5}
                proximity={100}
                variant="default"
                glow={true}
                movementDuration={2}
                borderWidth={2}
              />
              
              <div className={`absolute inset-0 bg-gradient-to-r ${item.bgGradient} opacity-0 rounded-2xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg transition-transform duration-300 flex items-center justify-center mb-4`}>
                  <item.icon className="text-white text-xl" />
                </div>

               
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2 transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed transition-colors duration-300">{item.value}</p>
                </div>
              </div>

              
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500"></div>
            </div>
          ))}
        </div>

        
        <div className="mt-12 text-center">
          <div  style={{ transitionDelay: '600ms' }}>
            {/* <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gray-800">✓</span>
              </div>
            </div> */}
            {/* <div className="text-left">
              <a
                href="https://trustseal.indiamart.com/members/hk-enterprisesnavimumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
              >
                <div className="text-xl font-bold text-gray-800">Trustseal Verified</div>
              </a>
              
              <div className="text-orange-600 font-semibold">IndiaMART Certified</div>
            </div> */}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default BusinessInfoSection;
