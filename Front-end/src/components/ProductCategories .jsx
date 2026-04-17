import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductInquiryPopup from "./ProductInquiryPopup";
import { assets } from "../assets/assets";

const ProductCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("CP Wooden Pallets");
  const [showInquiryPopup, setShowInquiryPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);


  const productData = {
    "CP Wooden Pallets": [
      {
        id: 1,
        name: "CP 1 Wooden Pallet",
        price: "₹800",
        image: assets.CP_1_1,
        size: "1200mm x 1000mm",
        shape: "Rectangular",
        woodType: "Soft Wood",
        capacity: "1 Ton"
      },
      {
        id: 2,
        name: "CP 2 Wooden Pallet",
        price: "₹500",
        image: assets.CP_1_2,
        size: "1200mm x 800mm",
        shape: "Rectangular",
        woodType: "Brown",
        capacity: "1 Ton"
      },
      {
        id: 3,
        name: "CP 5 Wooden Pallet",
        price: "₹600 ",
        image: assets.CP_1_3,
        size: "1200mm X 1000mm",
        shape: "Rectangular",
        woodType: "Soft Wood",
        capacity: "2 Ton"
      },
      {
        id: 4,
        name: "CP 6 Wooden Pallet",
        price: "₹750  ",
        image: assets.CP_1_4,
        size: "1200mm X 1000mm",
        shape: "Rectangular",
        woodType: "Soft Wood",
        capacity: "2 Ton"
      },
      {
        id: 5,
        name: "CP 4 Wooden Pallet",
        price: "₹800  ",
        image: assets.CP_1_5,
        size: "1100mm X 1100mm",
        shape: "Rectangular",
        woodType: "Soft Wood",
        capacity: "2 Ton"
      }
    ],
    "Wooden Pallets": [
      {
        id: 1,
        name: "Heat Treated Wooden Pallet", //yes
        price: "₹850 / Piece",
        size: "800 mm X 1200 mm",
        capacity: "500 kg",
        woodType: "Soft Wood",
        entryType: "4 Way",
        nails: "Plain Nails",
        weight: "15 kg",
        description: "Discover the durability and reliability of our Heat Treated Wooden Pallet, expertly designed to withstand the rigors of shipping and storage. This pallet undergoes a specialized heat treatment process that eliminates pests and moisture, ensuring a safe and sturdy platform for your goods. Ideal for both industrial and commercial use, its robust construction provides excellent support for heavy loads while maintaining compliance with international shipping standards. Upgrade your logistics with our Heat Treated Wooden Pallet and experience enhanced efficiency and peace of mind.",
        image: assets.wooden_1_1
      },
      {
        id: 2,
        name: "Molded Presswood Pallet", //yes
        price: "₹500 / Piece",
        size: "1000mm X 1000mm",
        color: "Brown",
        shape: "Rectangular",
        woodType: "Soft Wood",
        entryType: "4 Way",
        nails: "Screw Nails, Ring Nails",
        capacity: "1 Ton",
        minOrderQty: 20,
        description:
          "Discover the versatility and strength of our Molded Presswood Pallet, designed to meet the demands of modern logistics and storage solutions. Crafted from high-quality, eco-friendly materials, this pallet offers exceptional durability while being lightweight for easy handling. Its molded design ensures a secure and stable base for transporting goods, making it an ideal choice for warehouses, retail environments, and shipping operations. Upgrade your material handling with this reliable and sustainable option that not only enhances efficiency but also supports your commitment to environmental responsibility.",
        image: assets.wooden_2_1
      },
      {
        id: 3,
        name: "Molded Wooden Pallet", //yes
        price: "₹500 / Piece",
        size: "1100mm X 1100mm",
        shape: "Rectangular",
        woodType: "Soft Wood",
        entryType: "2 Way",
        nails: "Standard Nails",
        capacity: "500 kg ",
        minOrderQty: 20,
        description:
          "Discover the versatility and durability of our Molded Wooden Pallet, expertly crafted to meet all your storage and transportation needs. Made from high-quality wood, this pallet offers exceptional strength and stability, ensuring your goods are securely held in place. Its molded design provides a smooth surface for easy handling and minimizes the risk of damage during transit. Ideal for warehouses, retail environments, or home use, this pallet is a reliable solution for efficient organization and logistics. Upgrade your storage solutions today with our Molded Wooden Pallet and experience the perfect blend of functionality and quality",
        image: assets.wooden_3_1
      },
      {
        id: 4,
        name: "Compressed Wooden Pallet", //yes
        price: "500  / Piece",
        size: "1100 mm X 1100 mm",
        color: "Brown",
        shape: "Rectangular",
        woodType: "Pine Wood",
        entryType: "4 Way",
        minOrderQty: 8,
        description:
          "Discover the versatility and strength of our Molded Presswood Pallet, designed to meet the demands of modern logistics and storage solutions. Crafted from high-quality, eco-friendly materials, this pallet offers exceptional durability while being lightweight for easy handling. Its molded design ensures a secure and stable base for transporting goods, making it an ideal choice for warehouses, retail environments, and shipping operations. Upgrade your material handling with this reliable and sustainable option that not only enhances efficiency but also supports your commitment to environmental responsibility.",
        image: assets.wooden_4_1
      },
      {
        id: 5,
        name: "Pine Wood Pallet Collar", //yes
        price: "₹850 / Piece",
        size: "1200 x 800 mm",
        color: "Brown",
        shape: "Square",
        woodType: "Mixed Hard Wood",
        entryType: "4 Way",
        nails: "Screw Nails",
        capacity: "1.5 Ton",
        weight: "",
        minOrderQty: 10,
        description:
          "Extra large wooden pallet designed for industrial machinery transport. Built with reinforced wood.",
        image: assets.wooden_5_1
      },
      {
        id: 6,
        name: "",
        price: "₹ 980/ Piece",
        size: "800mm X 1200mm",
        color: "Natural",
        shape: "Rectangular",
        woodType: "Pinewood",
        entryType: "2 Way",
        nails: "Standard Nails",
        capacity: "900 Kg",
        minOrderQty: 6,
        description:
          "Versatile pallet suitable for warehouse and export shipping. Economical and reusable option.",
        image: assets.wooden_6_1
      }
    ],
    "Pine Wood Pallet": [
      {
        id: 7,
        name: "3 Ton Pinewood Pallet",
        price: "₹1050",
        image: assets.Ton_1_1,
        size: "1200mm X 1000mm",
        shape: "Rectangular",
        woodType: "Pine Wood",
        capacity: "3 Ton"
      },
      {
        id: 8,
        name: "2 Ton Pinewood Pallet",
        price: "₹1,000",
        image: assets.Ton_2_1,
        size: "800mm X 1200mm",
        shape: "Rectangular",
        woodType: "Pine Wood",
        capacity: "2 Ton"
      },
      {
        id: 9,
        name: "1 Ton Pinewood Pallet",
        price: "₹850 ",
        image: assets.Ton_3_1,
        size: "1200 mm X 1000 mm",
        shape: "Rectangular",
        woodType: "Pine Wood",
        capacity: "1 Ton"
      },
      {
        id: 10,
        name: "0.5 Ton Pinewood Pallet",
        price: "₹500  ",
        image: assets.Ton_4_1,
        size: "1200 mm X 1000 mm",
        shape: "Rectangular",
        woodType: "Pine Wood",
        capacity: "1 Ton"
      }
    ],
    "Industrial Pallet": [
      {
        id: 10,
        name: "Industrial Wooden Pallet",
        price: "₹750",
        image: assets.Indus_1,
        size: "1200mm X 1000mm",
        shape: "Rectangular",
        woodType: "Soft Wood",
        capacity: "2.5 Ton"
      },
      {
        id: 11,
        name: "Packaging Wooden Pallet",
        price: "₹600 ",
        image: assets.Indus_2,
        size: "1300mm X 1100mm",
        shape: "Rectangular",
        woodType: "Soft Wood",
        capacity: "1 Ton"
      },
      {
        id: 12,
        name: "Export Wooden Pallet",
        price: "₹800",
        image: assets.Indus_3,
        size: "1100mm X 1100mm",
        shape: "Square",
        woodType: "Heat Treated Wood",
        capacity: "1 Ton"
      },
      {
        id: 12,
        name: "Export Wooden Pallet",
        price: "₹800",
        image: assets.Indus_4,
        size: "800 mm X 1200 mm",
        shape: "Square",
        woodType: "Soft Wood",
        capacity: "1 Ton"
      }
    ]
  };


  const categories = Object.keys(productData);


  const handleGetQuote = (product) => {
    setSelectedProduct(product);
    setShowInquiryPopup(true);
  };

  const handleViewDetails = (product) => {
    console.log("View details for:", product);

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
        alert(`Thank you! We received your inquiry for ${selectedProduct.name}.`);
      } else {
        throw new Error("Failed to submit inquiry");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Failed to submit inquiry. Please try again.");
      throw error;
    }
  };


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("product-categories");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="product-categories"
        className="relative overflow-hidden bg-transparent px-4 py-16 transition-colors duration-300 md:px-8"
      >
        <div className="relative z-10 mx-auto max-w-7xl">

          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#2E4036] dark:text-gray-100 md:text-5xl">
              Our Product Categories
            </h2>
            <div className="mx-auto mb-4 mt-4 h-1 w-24 rounded-full bg-[#CC5833]"></div>
            <p className="mx-auto max-w-2xl text-sm text-[#1A1A1A]/70 dark:text-gray-300 md:text-base">
              Explore our comprehensive range of wooden pallets designed for various industrial and commercial applications.
            </p>
          </div>


          <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            {/* Desktop Tabs */}
            <div className="mb-8 hidden flex-wrap justify-center gap-3 md:flex">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-[1.4rem] border px-5 py-3 font-heading text-sm font-semibold tracking-tight transition-all duration-300 ${selectedCategory === category
                      ? 'scale-[1.02] border-[#CC5833] bg-[#CC5833] text-[#F2F0E9] shadow-[0_10px_30px_rgba(204,88,51,0.35)]'
                      : 'border-[#2E4036]/20 bg-[#F2F0E9] text-[#2E4036] hover:-translate-y-px hover:border-[#2E4036]/35 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-500'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden mb-8">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-[1.4rem] border border-[#2E4036]/25 bg-[#F2F0E9] px-4 py-3 font-heading text-sm font-semibold text-[#2E4036] focus:outline-none focus:ring-2 focus:ring-[#CC5833] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid using your existing ProductCard */}
          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productData[selectedCategory].map((product, index) => (
                <div
                  key={product.id}
                  className="transition-all duration-700"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
                  }}
                >
                  <ProductCard
                    product={{ ...product, name: product.name || 'Pinewood Pallet' }}
                    onViewDetails={() => handleViewDetails(product)}
                    onGetQuote={handleGetQuote}
                  />
                </div>
              ))}
            </div>

            {/* Empty state when no products */}
            {productData[selectedCategory].length === 0 && (
              <div className="text-center py-16">
                <div className="mb-4 text-6xl text-[#2E4036]/35">📦</div>
                <h3 className="mb-2 font-heading text-xl font-semibold text-[#2E4036]">No Products Available</h3>
                <p className="text-[#1A1A1A]/70">Products for this category will be available soon.</p>
              </div>
            )}
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

export default ProductCategories;




