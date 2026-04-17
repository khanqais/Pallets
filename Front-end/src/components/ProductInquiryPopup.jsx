import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ArrowLeft, Send, X } from "lucide-react";

const productCategories = [
  "Used Wooden Pallets",
  "Industrial Wooden Pallets",
  "Pinewood Pallet",
  "Two Ways Wooden Pallet",
  "Four Way Wooden Pallets",
  "Rubber Wood Pallets",
];

const sizeOptions = [
  "800mm X 1200mm",
  "1200mm X 1000mm",
  "1000mm X 1000mm",
  "1100mm X 1100mm",
  "1200mm X 1200mm",
];

const ProductInquiryPopup = ({ isOpen, onClose, product, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    quantity: "",
    unit: "Piece",
    interestedIn: "",
    size: "",
    requirements: "",
  });

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await onSubmit({
        product,
        customer: {
          mobile: formData.mobile,
          quantity: formData.quantity,
          unit: formData.unit,
          interestedIn: formData.interestedIn,
          size: formData.size,
          requirements: formData.requirements,
        },
        timestamp: new Date().toISOString(),
      });

      setFormData({
        mobile: "",
        quantity: "",
        unit: "Piece",
        interestedIn: "",
        size: "",
        requirements: "",
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

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm">
      <div className="relative max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-[2.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 md:p-8">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 rounded-full border border-[#2E4036]/25 p-2 text-[#2E4036] transition hover:-translate-y-px dark:border-gray-600 dark:text-gray-200"
          aria-label="Close quote dialog"
        >
          <X size={18} />
        </button>

        <div className="mb-7 flex items-center justify-center gap-3">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border font-data text-xs ${
                  currentStep >= step
                    ? "border-[#CC5833] bg-[#CC5833] text-[#F2F0E9]"
                    : "border-[#2E4036]/20 bg-[#F2F0E9] text-[#2E4036]/70 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {step}
              </span>
              {step < 3 && <span className="h-px w-8 bg-[#2E4036]/20 dark:bg-gray-600" />}
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <div>
            <div className="mb-6 grid items-center gap-5 rounded-[1.8rem] border border-[#2E4036]/15 bg-[#1A1A1A] p-4 text-[#F2F0E9] md:grid-cols-[150px_1fr]">
              <img src={product?.image} alt={product?.name || "Selected product"} className="h-28 w-full rounded-[1.2rem] object-cover" />
              <div>
                <p className="font-data text-[11px] uppercase tracking-[0.16em] text-[#F2F0E9]/65">Selected Product</p>
                <p className="mt-1 font-heading text-xl font-bold tracking-tight">{product?.name || "Custom Pallet"}</p>
                <p className="mt-1 text-sm text-[#F2F0E9]/75">{product?.size} · {product?.capacity || "Load class on request"}</p>
                <p className="mt-1 font-heading text-lg text-[#CC5833]">{product?.price}</p>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-extrabold tracking-tight text-[#2E4036] dark:text-gray-100">Step 1 · Contact Number</h3>
            <p className="mt-2 text-sm text-[#1A1A1A]/70 dark:text-gray-300">Enter your mobile number so we can send your quote quickly.</p>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(event) => handleInputChange("mobile", event.target.value)}
              placeholder="Mobile Number"
              className="mt-5 w-full rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
            />

            <button
              onClick={() => setCurrentStep(2)}
              disabled={!isStep1Valid}
              className="magnetic-btn relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-[1.4rem] bg-[#CC5833] px-6 py-3 font-heading font-semibold text-[#F2F0E9] disabled:opacity-60"
            >
              <span className="magnetic-fill" aria-hidden="true" />
              <span className="relative z-10">Continue</span>
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="font-heading text-2xl font-extrabold tracking-tight text-[#2E4036] dark:text-gray-100">Step 2 · Requirements</h3>
            <p className="mt-2 text-sm text-[#1A1A1A]/70 dark:text-gray-300">Tell us quantity, category preference, and size.</p>

            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_160px]">
              <input
                type="number"
                value={formData.quantity}
                onChange={(event) => handleInputChange("quantity", event.target.value)}
                placeholder="Quantity"
                className="rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
              <select
                value={formData.unit}
                onChange={(event) => handleInputChange("unit", event.target.value)}
                className="rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="Piece">Piece</option>
                <option value="Set">Set</option>
                <option value="Box">Box</option>
              </select>
            </div>

            <p className="mt-5 font-data text-[11px] uppercase tracking-[0.16em] text-[#2E4036]/70 dark:text-gray-400">Interested In</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {productCategories.map((category) => (
                <label key={category} className="flex cursor-pointer items-center gap-2 rounded-[1rem] border border-[#2E4036]/20 px-3 py-2 text-sm text-[#1A1A1A] dark:border-gray-600 dark:text-gray-100">
                  <input type="radio" name="interestedIn" value={category} checked={formData.interestedIn === category} onChange={(event) => handleInputChange("interestedIn", event.target.value)} />
                  <span>{category}</span>
                </label>
              ))}
            </div>

            <p className="mt-5 font-data text-[11px] uppercase tracking-[0.16em] text-[#2E4036]/70 dark:text-gray-400">Size</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {sizeOptions.map((size) => (
                <label key={size} className="flex cursor-pointer items-center gap-2 rounded-[1rem] border border-[#2E4036]/20 px-3 py-2 text-sm text-[#1A1A1A] dark:border-gray-600 dark:text-gray-100">
                  <input type="radio" name="size" value={size} checked={formData.size === size} onChange={(event) => handleInputChange("size", event.target.value)} />
                  <span>{size}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setCurrentStep(1)} className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-[#2E4036]/25 px-5 py-3 font-heading font-semibold text-[#2E4036] dark:border-gray-600 dark:text-gray-100">
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!isStep2Valid}
                className="magnetic-btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-[1.2rem] bg-[#CC5833] px-5 py-3 font-heading font-semibold text-[#F2F0E9] disabled:opacity-60"
              >
                <span className="magnetic-fill" aria-hidden="true" />
                <span className="relative z-10">Continue</span>
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="font-heading text-2xl font-extrabold tracking-tight text-[#2E4036] dark:text-gray-100">Step 3 · Final Notes</h3>
            <p className="mt-2 text-sm text-[#1A1A1A]/70 dark:text-gray-300">Add any dispatch timeline, location, or handling requirement.</p>

            <textarea
              value={formData.requirements}
              onChange={(event) => handleInputChange("requirements", event.target.value)}
              placeholder="Optional additional requirements"
              rows={5}
              className="mt-5 w-full rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
            />

            <div className="mt-5 rounded-[1.2rem] border border-[#2E4036]/20 bg-[#2E4036]/7 p-4 text-sm text-[#1A1A1A] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
              <p><span className="font-semibold">Product:</span> {formData.interestedIn}</p>
              <p><span className="font-semibold">Quantity:</span> {formData.quantity} {formData.unit}</p>
              <p><span className="font-semibold">Size:</span> {formData.size}</p>
              <p><span className="font-semibold">Contact:</span> +91 {formData.mobile}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setCurrentStep(2)} className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-[#2E4036]/25 px-5 py-3 font-heading font-semibold text-[#2E4036] dark:border-gray-600 dark:text-gray-100">
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="magnetic-btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-[1.2rem] bg-[#CC5833] px-5 py-3 font-heading font-semibold text-[#F2F0E9] disabled:opacity-60"
              >
                <span className="magnetic-fill" aria-hidden="true" />
                <span className="relative z-10 inline-flex items-center gap-2">
                  {isSubmitting ? "Submitting..." : "Get My Quote"}
                  <Send size={15} />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ProductInquiryPopup;