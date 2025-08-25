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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto transform animate-slideIn">
        
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 text-3xl hover:scale-110 transition-all duration-300 z-10 bg-white rounded-full p-2 shadow-lg"
        >
          <FaTimes />
        </button>

        
        <div className="flex justify-center pt-8 pb-4">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                  currentStep >= step 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 rounded ${
                    currentStep > step ? 'bg-teal-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        
        <div className="flex justify-center pb-8">
          <div className="flex justify-between w-80 text-sm">
            <span className={currentStep >= 1 ? 'text-teal-600 font-semibold' : 'text-gray-500'}>
              Contact Info
            </span>
            <span className={currentStep >= 2 ? 'text-teal-600 font-semibold' : 'text-gray-500'}>
              Requirements
            </span>
            <span className={currentStep >= 3 ? 'text-teal-600 font-semibold' : 'text-gray-500'}>
              Final Details
            </span>
          </div>
        </div>

       
        {currentStep === 1 && (
          <div className="px-12 pb-12">
            
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <img 
                  src={product?.image || "/api/placeholder/400/250"} 
                  alt={product?.name}
                  className="w-96 h-64 object-cover rounded-2xl shadow-xl"
                />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-3">{product?.name}</h3>
              <div className="text-4xl font-bold text-orange-600 mb-4">{product?.price}</div>
              
              <div className="bg-gray-50 rounded-2xl p-6 mx-auto max-w-2xl">
                <div className="grid grid-cols-2 gap-6 text-lg">
                  <div className="text-gray-700">
                    <p><span className="font-semibold">Sold By:</span> H.K Enterprises</p>
                    <p><span className="font-semibold">Size (LxW):</span> {product?.size}</p>
                  </div>
                  <div className="text-gray-700">
                    <p><span className="font-semibold">Shape:</span> {product?.shape || "Rectangular"}</p>
                    <p><span className="font-semibold">Wood Type:</span> {product?.woodType || "Soft Wood"}</p>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <p className="text-gray-700 text-lg"><span className="font-semibold">Capacity:</span> {product?.capacity || "500 kg"}</p>
                </div>
              </div>
            </div>

            
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                  Get Best Quote
                </h2>
                <p className="text-gray-600 text-xl">
                  Get instant quotes and details from "H.K Enterprises" on your mobile
                </p>
              </div>

              
              <div className="mb-8">
                <label className="block text-xl font-semibold text-gray-700 mb-4">
                  Mobile Number
                </label>
                <div className="flex shadow-lg rounded-2xl overflow-hidden">
                  <div className="flex items-center px-6 bg-gray-50 border border-r-0 border-gray-300">
                    <img 
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 20'%3E%3Crect width='28' height='20' fill='%23FF9933'/%3E%3Crect y='13.33' width='28' height='6.67' fill='%23138808'/%3E%3Ccircle cx='14' cy='10' r='3' fill='%23000080'/%3E%3C/svg%3E"
                      alt="IN"
                      className="w-8 h-5 mr-3"
                    />
                    <span className="text-xl text-gray-700 font-semibold">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    placeholder="Enter your mobile number"
                    className="flex-1 px-6 py-5 text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <p className="text-gray-500 mt-3 text-lg text-center">
                  We will contact you on this number for the best quote
                </p>
              </div>

            
              <button
                onClick={handleNext}
                disabled={!isStep1Valid}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-6 px-8 rounded-2xl text-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Continue to Requirements →
              </button>
            </div>
          </div>
        )}

        
        {currentStep === 2 && (
          <div className="px-12 pb-12">
            {/* Product Summary */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-10 mx-auto max-w-4xl">
              <div className="flex items-center justify-center gap-8">
                <img 
                  src={product?.image || "/api/placeholder/150/100"} 
                  alt={product?.name}
                  className="w-32 h-24 object-cover rounded-xl shadow-lg"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800">{product?.name}</h3>
                  <div className="text-3xl font-bold text-orange-600">{product?.price}</div>
                  <p className="text-gray-600 text-lg">Sold By - H.K Enterprises</p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                  Product Requirements
                </h2>
                <p className="text-gray-600 text-xl">
                  Help us understand your specific needs for the best quote
                </p>
              </div>

              <div className="space-y-10">
               
                <div>
                  <label className="block text-xl font-semibold text-gray-700 mb-4">
                    Quantity Required:
                  </label>
                  <div className="flex gap-4 max-w-md">
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      className="flex-1 px-6 py-4 text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-md"
                      placeholder="Enter quantity"
                    />
                    <select
                      value={formData.unit}
                      onChange={(e) => handleInputChange("unit", e.target.value)}
                      className="px-6 py-4 text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-md"
                    >
                      <option value="Piece">Piece</option>
                      <option value="Set">Set</option>
                      <option value="Box">Box</option>
                    </select>
                  </div>
                </div>

                
                <div>
                  <label className="block text-xl font-semibold text-gray-700 mb-4">
                    I am interested in:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {productCategories.map((category) => (
                      <label key={category} className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 cursor-pointer transition-all duration-200 shadow-md">
                        <input
                          type="radio"
                          name="interestedIn"
                          value={category}
                          checked={formData.interestedIn === category}
                          onChange={(e) => handleInputChange("interestedIn", e.target.value)}
                          className="mr-4 text-teal-600 focus:ring-teal-500 scale-150"
                        />
                        <span className="text-gray-700 text-lg">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                
                <div>
                  <label className="block text-xl font-semibold text-gray-700 mb-4">
                    Size (Length × Width):
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {sizeOptions.map((size) => (
                      <label key={size} className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 cursor-pointer transition-all duration-200 shadow-md">
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={formData.size === size}
                          onChange={(e) => handleInputChange("size", e.target.value)}
                          className="mr-4 text-teal-600 focus:ring-teal-500 scale-150"
                        />
                        <span className="text-gray-700 text-lg">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

               
                <div className="flex gap-6 justify-center pt-8">
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xl font-semibold transition-all duration-300 shadow-lg"
                  >
                    <FaArrowLeft className="mr-3" />
                    Back
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                    className="px-12 py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl text-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    Continue to Final Step →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        
        {currentStep === 3 && (
          <div className="px-12 pb-12">
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-10 mx-auto max-w-4xl">
              <div className="flex items-center justify-center gap-8">
                <img 
                  src={product?.image || "/api/placeholder/150/100"} 
                  alt={product?.name}
                  className="w-32 h-24 object-cover rounded-xl shadow-lg"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800">{product?.name}</h3>
                  <div className="text-3xl font-bold text-orange-600">{product?.price}</div>
                  <p className="text-gray-600 text-lg">Quantity: {formData.quantity} {formData.unit} | Size: {formData.size}</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                  🎉 Almost Done!
                </h2>
                <p className="text-gray-600 text-xl">
                  Add any specific requirements to get the most accurate quote
                </p>
              </div>

              
              <div className="mb-10">
                <label className="block text-xl font-semibold text-gray-700 mb-4">
                  Additional Requirements (Optional):
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  placeholder="📝 Describe your specific requirements, delivery location, timeline, or any other details..."
                  rows={6}
                  className="w-full px-6 py-4 text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none shadow-lg"
                />
              </div>

              
              <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-teal-800 mb-4">Order Summary:</h3>
                <div className="space-y-2 text-teal-700">
                  <p><span className="font-semibold">Product:</span> {formData.interestedIn}</p>
                  <p><span className="font-semibold">Quantity:</span> {formData.quantity} {formData.unit}</p>
                  <p><span className="font-semibold">Size:</span> {formData.size}</p>
                  <p><span className="font-semibold">Contact:</span> +91 {formData.mobile}</p>
                </div>
              </div>

              
              <div className="flex gap-6 justify-center">
                <button
                  onClick={handleBack}
                  className="flex items-center justify-center px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xl font-semibold transition-all duration-300 shadow-lg"
                >
                  <FaArrowLeft className="mr-3" />
                  Back
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-16 py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl text-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin text-xl" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>✨ Get My Quote Now</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-teal-600 italic text-xl mt-6 font-medium">
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
