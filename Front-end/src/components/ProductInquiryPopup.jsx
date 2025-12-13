import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaTimes, FaArrowLeft, FaSpinner } from "react-icons/fa";

const ProductInquiryPopup = ({ isOpen, onClose, product, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    quantity: "",
    unit: "Piece",
    interestedIn: "",
    size: "",
    requirements: ""
  });

  const productCategories = [
    "Used Wooden Pallets",
    "Industrial Wooden Pallets", 
    "Pinewood Pallet",
    "Two Ways Wooden Pallet",
    "Four Way Wooden Pallets",
    "Rubber Wood Pallets"
  ];

  const sizeOptions = [
    "800mm X 1200mm",
    "1200mm X 1000mm", 
    "1000mm X 1000mm",
    "1100mm X 1100mm",
    "1200mm X 1200mm"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const inquiryData = {
        product: product,
        customer: {
          mobile: formData.mobile,
          quantity: formData.quantity,
          unit: formData.unit,
          interestedIn: formData.interestedIn,
          size: formData.size,
          requirements: formData.requirements
        },
        timestamp: new Date().toISOString()
      };
      
      await onSubmit(inquiryData);
      setFormData({
        mobile: "",
        quantity: "",
        unit: "Piece",
        interestedIn: "",
        size: "",
        requirements: ""
      });
      setCurrentStep(1);
      onClose();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = formData.mobile && formData.mobile.length >= 10;
  const isStep2Valid = formData.quantity && formData.interestedIn && formData.size;

  if (!isOpen) return null;

  
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto transform animate-slideIn transition-colors duration-300">
        
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-8 right-4 sm:right-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl sm:text-3xl hover:scale-110 transition-all duration-300 z-10 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg"
        >
          <FaTimes />
        </button>

        
        <div className="flex justify-center pt-4 sm:pt-8 pb-2 sm:pb-4 px-4">
          <div className="flex items-end justify-center gap-2 sm:gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-lg mb-2 ${
                  currentStep >= step 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                <span className={`text-xs sm:text-sm font-semibold text-center w-16 sm:w-20 ${
                  currentStep >= step ? 'text-teal-600' : 'text-gray-500'
                }`}>
                  {step === 1 ? 'Contact' : step === 2 ? 'Requirements' : 'Final'}
                </span>
              </div>
            ))}
          </div>
        </div>

       
        {currentStep === 1 && (
          <div className="px-4 sm:px-8 lg:px-12 pb-8 sm:pb-12">
            
            <div className="text-center mb-6 sm:mb-10">
              <div className="flex justify-center mb-4 sm:mb-6">
                <img 
                  src={product?.image || "/api/placeholder/400/250"} 
                  alt={product?.name}
                  className="w-48 sm:w-80 lg:w-96 h-32 sm:h-48 lg:h-64 object-cover rounded-lg sm:rounded-2xl shadow-xl"
                />
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">{product?.name}</h3>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600 mb-4">{product?.price}</div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg sm:rounded-2xl p-4 sm:p-6 mx-auto max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-lg">
                  <div className="text-gray-700 dark:text-gray-300">
                    <p><span className="font-semibold">Sold By:</span> H.K Enterprises</p>
                    <p><span className="font-semibold">Size (LxW):</span> {product?.size}</p>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p><span className="font-semibold">Shape:</span> {product?.shape || "Rectangular"}</p>
                    <p><span className="font-semibold">Wood Type:</span> {product?.woodType || "Soft Wood"}</p>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-lg"><span className="font-semibold">Capacity:</span> {product?.capacity || "500 kg"}</p>
                </div>
              </div>
            </div>

            
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3">
                  Get Best Quote
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-lg">
                  Get instant quotes and details from "H.K Enterprises" on your mobile
                </p>
              </div>

              
              <div className="mb-6 sm:mb-8">
                <label className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                  Mobile Number
                </label>
                <div className="flex shadow-lg rounded-lg sm:rounded-2xl overflow-hidden">
                  <div className="flex items-center px-3 sm:px-6 bg-gray-50 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600">
                    <img 
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 20'%3E%3Crect width='28' height='20' fill='%23FF9933'/%3E%3Crect y='13.33' width='28' height='6.67' fill='%23138808'/%3E%3Ccircle cx='14' cy='10' r='3' fill='%23000080'/%3E%3C/svg%3E"
                      alt="IN"
                      className="w-6 sm:w-8 h-4 sm:h-5 mr-2 sm:mr-3"
                    />
                    <span className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-semibold">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    placeholder="Enter your mobile number"
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-5 text-sm sm:text-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <p className="text-gray-500 dark:text-gray-400 mt-2 sm:mt-3 text-xs sm:text-lg text-center">
                  We will contact you on this number for the best quote
                </p>
              </div>

            
              <button
                onClick={handleNext}
                disabled={!isStep1Valid}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-4 sm:py-6 px-4 sm:px-8 rounded-lg sm:rounded-2xl text-sm sm:text-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Continue to Requirements →
              </button>
            </div>
          </div>
        )}

        
        {currentStep === 2 && (
          <div className="px-4 sm:px-8 lg:px-12 pb-8 sm:pb-12">
            {/* Product Summary */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-10 mx-auto max-w-4xl">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <img 
                  src={product?.image || "/api/placeholder/150/100"} 
                  alt={product?.name}
                  className="w-24 sm:w-32 h-20 sm:h-24 object-cover rounded-lg sm:rounded-xl shadow-lg"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">{product?.name}</h3>
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600">{product?.price}</div>
                  <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">Sold By - H.K Enterprises</p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3">
                  Product Requirements
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-lg">
                  Help us understand your specific needs for the best quote
                </p>
              </div>

              <div className="space-y-6 sm:space-y-10">
               
                <div>
                  <label className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                    Quantity Required:
                  </label>
                  <div className="flex gap-2 sm:gap-4 max-w-md flex-col sm:flex-row">
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-md"
                      placeholder="Enter quantity"
                    />
                    <select
                      value={formData.unit}
                      onChange={(e) => handleInputChange("unit", e.target.value)}
                      className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-md"
                    >
                      <option value="Piece">Piece</option>
                      <option value="Set">Set</option>
                      <option value="Box">Box</option>
                    </select>
                  </div>
                </div>

                
                <div>
                  <label className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                    I am interested in:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {productCategories.map((category) => (
                      <label key={category} className="flex items-center p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-lg sm:rounded-xl hover:border-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 cursor-pointer transition-all duration-200 shadow-md">
                        <input
                          type="radio"
                          name="interestedIn"
                          value={category}
                          checked={formData.interestedIn === category}
                          onChange={(e) => handleInputChange("interestedIn", e.target.value)}
                          className="mr-3 sm:mr-4 text-teal-600 focus:ring-teal-500 scale-125"
                        />
                        <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-lg">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                
                <div>
                  <label className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                    Size (Length × Width):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {sizeOptions.map((size) => (
                      <label key={size} className="flex items-center p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-lg sm:rounded-xl hover:border-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 cursor-pointer transition-all duration-200 shadow-md">
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={formData.size === size}
                          onChange={(e) => handleInputChange("size", e.target.value)}
                          className="mr-3 sm:mr-4 text-teal-600 focus:ring-teal-500 scale-125"
                        />
                        <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-lg">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

               
                <div className="flex gap-3 sm:gap-6 justify-center flex-col sm:flex-row pt-4 sm:pt-8">
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-lg sm:rounded-xl text-sm sm:text-xl font-semibold transition-all duration-300 shadow-lg order-2 sm:order-1"
                  >
                    <FaArrowLeft className="mr-2 sm:mr-3" />
                    Back
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                    className="px-6 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg sm:rounded-xl text-sm sm:text-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105 order-1 sm:order-2"
                  >
                    Continue to Final Step →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        
        {currentStep === 3 && (
          <div className="px-4 sm:px-8 lg:px-12 pb-8 sm:pb-12">
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-10 mx-auto max-w-4xl">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <img 
                  src={product?.image || "/api/placeholder/150/100"} 
                  alt={product?.name}
                  className="w-24 sm:w-32 h-20 sm:h-24 object-cover rounded-lg sm:rounded-xl shadow-lg"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">{product?.name}</h3>
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600">{product?.price}</div>
                  <p className="text-xs sm:text-lg text-gray-600 dark:text-gray-400">Quantity: {formData.quantity} {formData.unit} | Size: {formData.size}</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3">
                  🎉 Almost Done!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-lg">
                  Add any specific requirements to get the most accurate quote
                </p>
              </div>

              
              <div className="mb-6 sm:mb-10">
                <label className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                  Additional Requirements (Optional):
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  placeholder="📝 Describe your specific requirements, delivery location, timeline, or any other details..."
                  rows={4}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none shadow-lg"
                />
              </div>

              
              <div className="bg-teal-50 dark:bg-teal-900/30 border-2 border-teal-200 dark:border-teal-700 rounded-lg sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-teal-800 dark:text-teal-300 mb-3 sm:mb-4">Order Summary:</h3>
                <div className="space-y-2 text-xs sm:text-base text-teal-700 dark:text-teal-300">
                  <p><span className="font-semibold">Product:</span> {formData.interestedIn}</p>
                  <p><span className="font-semibold">Quantity:</span> {formData.quantity} {formData.unit}</p>
                  <p><span className="font-semibold">Size:</span> {formData.size}</p>
                  <p><span className="font-semibold">Contact:</span> +91 {formData.mobile}</p>
                </div>
              </div>

              
              <div className="flex gap-3 sm:gap-6 justify-center flex-col sm:flex-row">
                <button
                  onClick={handleBack}
                  className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-lg sm:rounded-xl text-sm sm:text-xl font-semibold transition-all duration-300 shadow-lg order-2 sm:order-1"
                >
                  <FaArrowLeft className="mr-2 sm:mr-3" />
                  Back
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 sm:px-16 py-3 sm:py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-lg sm:rounded-xl text-sm sm:text-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 order-1 sm:order-2"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin text-lg sm:text-xl" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>✨ Get My Quote Now</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-teal-600 dark:text-teal-400 italic text-xs sm:text-lg mt-4 sm:mt-6 font-medium">
                🚀 You're just one click away from getting the best quotes!
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>,
    document.body 
  );
};

export default ProductInquiryPopup;
