import React, { useState, useEffect } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard";
import ProductInquiryPopup from "./ProductInquiryPopup";
import { assets } from "../assets/assets";
import Swal from "sweetalert2";

const ProductRecommendations = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showInquiryPopup, setShowInquiryPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const recommendedProducts = [
    {
      id: 1,
      name: "CP Wooden PalletsHeat Treated Wooden Pallet",
      price: "₹850 / Piece",
      originalPrice: "₹1,000",
      size: "800 mm X 1200 mm",
      image: assets.wooden_1_1
    },
    {
      id: 2,
      name: "Industrial Pallet",
      price: "₹1,200",
      size: "1000mm x 1200mm",
      image: assets.wooden_2_1
    },
    {
      id: 3,
      name: "Pine Wood Pallet",
      price: "₹950",
      originalPrice: "₹1,100",
      size: "800mm x 600mm",
      image: assets.wooden_3_1
    },
    {
      id: 4,
      name: "Four Way Wooden Pallets",
      price: "₹1,450",
      size: "1200mm x 1000mm",
      image: assets.fourway
    },
    {
      id: 5,
      name: "Euro Pallets",
      price: "₹1,100",
      size: "1200mm x 800mm",
      image: assets.wooden_5_1
    },
    {
      id: 6,
      name: "Wooden Packaging Box",
      price: "₹650",
      size: "600mm x 400mm",
      image: assets.wooden_pakage
    }
  ];


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("product-recommendations");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleViewDetails = (product) => {
    console.log("View details for:", product);
  };

  const handleGetQuote = (product) => {
    setSelectedProduct(product);
    setShowInquiryPopup(true);
  };

  const handleInquirySubmit = async (inquiryData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product-inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      if (response.ok) {
  Swal.fire({
    title: "✅ Inquiry Sent!",
    html: `
      <p>Thank you for your interest in <b>${selectedProduct.name}</b>.</p>
      <p>Our team will contact you soon at <b>${inquiryData.customer.mobile}</b>.</p>
    `,
    icon: "success",
    confirmButtonText: "Great!",
    confirmButtonColor: "#3085d6",
  });
  console.log(`New inquiry: Customer ${inquiryData.customer.mobile} is interested in ${selectedProduct.name}`);
} else {
        throw new Error("Failed to submit inquiry");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Failed to submit inquiry. Please try again.");
      throw error;
    }
  };

  return (
    <>
      <section 
        id="product-recommendations" 
        className="relative py-16 bg-gradient-to-br from-white via-orange-50 to-red-50 overflow-hidden"
      >
       
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
         
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Recommended Products
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular wooden pallets and packaging solutions, carefully selected for quality and reliability.
            </p>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <ProductCard
                  product={product}
                  onViewDetails={() => handleViewDetails(product)}
                  onGetQuote={handleGetQuote} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <ProductInquiryPopup
        isOpen={showInquiryPopup}
        onClose={() => setShowInquiryPopup(false)}
        product={selectedProduct}
        onSubmit={handleInquirySubmit}
      />
    </>
  );
};

export default ProductRecommendations;


