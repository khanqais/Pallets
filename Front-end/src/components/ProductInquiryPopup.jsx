import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ArrowLeft, Send, X, Mail, ShieldCheck, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

// ─── Step label config ────────────────────────────────────────────────────────
const STEPS = [
  { num: 1, label: "Email" },
  { num: 2, label: "Verify" },
  { num: 3, label: "Details" },
  { num: 4, label: "Review" },
];

const ProductInquiryPopup = ({ isOpen, onClose, product, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    mobile: "",
    quantity: "",
    unit: "Piece",
    interestedIn: "",
    size: "",
    requirements: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "email") setEmailError("");
    if (field === "otp") setOtpError("");
  };

  const handleClose = () => {
    setCurrentStep(1);
    setOtpError("");
    setEmailError("");
    setFormData({ email: "", otp: "", mobile: "", quantity: "", unit: "Piece", interestedIn: "", size: "", requirements: "" });
    onClose();
  };

  // ── Step 1 → Send OTP ───────────────────────────────────────────────────────
  const handleSendOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsSendingOtp(true);
    setEmailError("");
    try {
      const res = await fetch(`${BACKEND_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      setCurrentStep(2);
      // 30-second resend cooldown
      setResendCooldown(30);
      const timer = setInterval(() => {
        setResendCooldown((c) => {
          if (c <= 1) { clearInterval(timer); return 0; }
          return c - 1;
        });
      }, 1000);
    } catch (err) {
      setEmailError(err.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  // ── Step 2 → Verify OTP ────────────────────────────────────────────────────
  const handleVerifyOtp = async () => {
    if (formData.otp.length !== 6) {
      setOtpError("Please enter the 6-digit code.");
      return;
    }
    setIsVerifyingOtp(true);
    setOtpError("");
    try {
      const res = await fetch(`${BACKEND_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");
      setCurrentStep(3);
    } catch (err) {
      setOtpError(err.message);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // ── Step 4 → Submit inquiry ────────────────────────────────────────────────
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const inquiryPayload = {
        product,
        customer: {
          email: formData.email,
          mobile: formData.mobile,
          quantity: formData.quantity,
          unit: formData.unit,
          interestedIn: formData.interestedIn,
          size: formData.size,
          requirements: formData.requirements,
        },
        timestamp: new Date().toISOString(),
      };

      const res = await fetch(`${BACKEND_URL}/product-inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      // Success — close popup first, then show alert
      setFormData({ email: "", otp: "", mobile: "", quantity: "", unit: "Piece", interestedIn: "", size: "", requirements: "" });
      setCurrentStep(1);
      onClose();

      await Swal.fire({
        title: "✅ Inquiry Sent!",
        html: `
          <p>Thank you for your interest in <b>${product?.name || "our product"}</b>.</p>
          <p>Our team will contact you soon at <b>${formData.email}</b>.</p>
        `,
        icon: "success",
        confirmButtonText: "Great!",
        confirmButtonColor: "#CC5833",
      });

    } catch (error) {
      console.error("Error submitting inquiry:", error);
      Swal.fire({
        title: "❌ Submission Failed",
        text: error.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#CC5833",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep3Valid = formData.mobile && formData.mobile.length === 10 && formData.quantity && formData.interestedIn && formData.size;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm">
      <div className="relative max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-[2.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 md:p-8">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 rounded-full border border-[#2E4036]/25 p-2 text-[#2E4036] transition hover:-translate-y-px dark:border-gray-600 dark:text-gray-200"
          aria-label="Close quote dialog"
        >
          <X size={18} />
        </button>

        {/* Step indicator */}
        <div className="mb-7 flex items-center justify-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border font-data text-xs transition-all duration-300 ${
                    currentStep > s.num
                      ? "border-[#CC5833] bg-[#CC5833] text-[#F2F0E9]"
                      : currentStep === s.num
                      ? "border-[#CC5833] bg-[#CC5833] text-[#F2F0E9] ring-2 ring-[#CC5833]/30"
                      : "border-[#2E4036]/20 bg-[#F2F0E9] text-[#2E4036]/70 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {currentStep > s.num ? "✓" : s.num}
                </span>
                <span className={`mt-1 hidden text-[10px] sm:block ${currentStep >= s.num ? "text-[#CC5833]" : "text-[#2E4036]/40 dark:text-gray-500"}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span className={`mb-4 h-px w-8 transition-colors duration-300 ${currentStep > s.num ? "bg-[#CC5833]" : "bg-[#2E4036]/20 dark:bg-gray-600"}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── STEP 1 · Email ───────────────────────────────────────────────── */}
        {currentStep === 1 && (
          <div>
            {/* Product preview */}
            <div className="mb-6 grid items-center gap-5 rounded-[1.8rem] border border-[#2E4036]/15 bg-[#1A1A1A] p-4 text-[#F2F0E9] md:grid-cols-[150px_1fr]">
              <img src={product?.image} alt={product?.name || "Selected product"} className="h-28 w-full rounded-[1.2rem] object-cover" />
              <div>
                <p className="font-data text-[11px] uppercase tracking-[0.16em] text-[#F2F0E9]/65">Selected Product</p>
                <p className="mt-1 font-heading text-xl font-bold tracking-tight">{product?.name || "Custom Pallet"}</p>
                <p className="mt-1 text-sm text-[#F2F0E9]/75">{product?.size} · {product?.capacity || "Load class on request"}</p>
                <p className="mt-1 font-heading text-lg text-[#CC5833]">{product?.price}</p>
              </div>
            </div>

            <div className="mb-1 flex items-center gap-2">
              <Mail size={18} className="text-[#CC5833]" />
              <h3 className="font-heading text-2xl font-extrabold tracking-tight text-[#2E4036] dark:text-gray-100">Step 1 · Your Email</h3>
            </div>
            <p className="mt-2 text-sm text-[#1A1A1A]/70 dark:text-gray-300">Enter your email address. We'll send a 6-digit verification code.</p>

            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
              placeholder="you@example.com"
              className="mt-5 w-full rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
            />
            {emailError && <p className="mt-2 text-sm text-red-500">{emailError}</p>}

            <button
              onClick={handleSendOtp}
              disabled={!formData.email || isSendingOtp}
              className="magnetic-btn relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[1.4rem] bg-[#CC5833] px-6 py-3 font-heading font-semibold text-[#F2F0E9] disabled:opacity-60"
            >
              <span className="magnetic-fill" aria-hidden="true" />
              <span className="relative z-10 inline-flex items-center gap-2">
                {isSendingOtp ? <><Loader2 size={16} className="animate-spin" /> Sending Code...</> : <><Mail size={16} /> Send Verification Code</>}
              </span>
            </button>
          </div>
        )}

        {/* ── STEP 2 · OTP Verification ───────────────────────────────────── */}
        {currentStep === 2 && (
          <div>
            <div className="mb-1 flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#CC5833]" />
              <h3 className="font-heading text-2xl font-extrabold tracking-tight text-[#2E4036] dark:text-gray-100">Step 2 · Verify Email</h3>
            </div>
            <p className="mt-2 text-sm text-[#1A1A1A]/70 dark:text-gray-300">
              We sent a 6-digit code to <strong className="text-[#CC5833]">{formData.email}</strong>. Check your inbox (and spam folder).
            </p>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={formData.otp}
              onChange={(e) => handleInputChange("otp", e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
              placeholder="Enter 6-digit code"
              className="mt-5 w-full rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
            {otpError && <p className="mt-2 text-center text-sm text-red-500">{otpError}</p>}

            <button
              onClick={handleVerifyOtp}
              disabled={formData.otp.length !== 6 || isVerifyingOtp}
              className="magnetic-btn relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[1.4rem] bg-[#CC5833] px-6 py-3 font-heading font-semibold text-[#F2F0E9] disabled:opacity-60"
            >
              <span className="magnetic-fill" aria-hidden="true" />
              <span className="relative z-10 inline-flex items-center gap-2">
                {isVerifyingOtp ? <><Loader2 size={16} className="animate-spin" /> Verifying...</> : <><ShieldCheck size={16} /> Verify & Continue</>}
              </span>
            </button>

            <div className="mt-4 flex items-center justify-between">
              <button onClick={() => setCurrentStep(1)} className="inline-flex items-center gap-1 text-sm text-[#2E4036]/70 hover:text-[#CC5833] dark:text-gray-400">
                <ArrowLeft size={14} /> Change email
              </button>
              <button
                onClick={handleSendOtp}
                disabled={resendCooldown > 0 || isSendingOtp}
                className="text-sm text-[#CC5833] disabled:text-[#2E4036]/40 dark:disabled:text-gray-500"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 · Requirements ───────────────────────────────────────── */}
        {currentStep === 3 && (
          <div>
            <h3 className="font-heading text-2xl font-extrabold tracking-tight text-[#2E4036] dark:text-gray-100">Step 3 · Requirements</h3>
            <p className="mt-2 text-sm text-[#1A1A1A]/70 dark:text-gray-300">Tell us your mobile, quantity, category preference, and size.</p>

            {/* Mobile */}
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10-digit Mobile Number"
              className="mt-5 w-full rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
            />

            {/* Quantity + Unit */}
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_160px]">
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                placeholder="Quantity"
                className="rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              />
              <select
                value={formData.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                className="rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="Piece">Piece</option>
                <option value="Set">Set</option>
                <option value="Box">Box</option>
              </select>
            </div>

            {/* Category */}
            <p className="mt-5 font-data text-[11px] uppercase tracking-[0.16em] text-[#2E4036]/70 dark:text-gray-400">Interested In</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {productCategories.map((category) => (
                <label key={category} className="flex cursor-pointer items-center gap-2 rounded-[1rem] border border-[#2E4036]/20 px-3 py-2 text-sm text-[#1A1A1A] dark:border-gray-600 dark:text-gray-100">
                  <input type="radio" name="interestedIn" value={category} checked={formData.interestedIn === category} onChange={(e) => handleInputChange("interestedIn", e.target.value)} />
                  <span>{category}</span>
                </label>
              ))}
            </div>

            {/* Size */}
            <p className="mt-5 font-data text-[11px] uppercase tracking-[0.16em] text-[#2E4036]/70 dark:text-gray-400">Size</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {sizeOptions.map((size) => (
                <label key={size} className="flex cursor-pointer items-center gap-2 rounded-[1rem] border border-[#2E4036]/20 px-3 py-2 text-sm text-[#1A1A1A] dark:border-gray-600 dark:text-gray-100">
                  <input type="radio" name="size" value={size} checked={formData.size === size} onChange={(e) => handleInputChange("size", e.target.value)} />
                  <span>{size}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setCurrentStep(2)} className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-[#2E4036]/25 px-5 py-3 font-heading font-semibold text-[#2E4036] dark:border-gray-600 dark:text-gray-100">
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                disabled={!isStep3Valid}
                className="magnetic-btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-[1.2rem] bg-[#CC5833] px-5 py-3 font-heading font-semibold text-[#F2F0E9] disabled:opacity-60"
              >
                <span className="magnetic-fill" aria-hidden="true" />
                <span className="relative z-10">Continue</span>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4 · Review & Submit ────────────────────────────────────── */}
        {currentStep === 4 && (
          <div>
            <h3 className="font-heading text-2xl font-extrabold tracking-tight text-[#2E4036] dark:text-gray-100">Step 4 · Final Notes & Review</h3>
            <p className="mt-2 text-sm text-[#1A1A1A]/70 dark:text-gray-300">Add any dispatch timeline, location, or handling requirement.</p>

            <textarea
              value={formData.requirements}
              onChange={(e) => handleInputChange("requirements", e.target.value)}
              placeholder="Optional additional requirements"
              rows={4}
              className="mt-5 w-full rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
            />

            {/* Summary */}
            <div className="mt-5 rounded-[1.2rem] border border-[#2E4036]/20 bg-[#2E4036]/5 p-4 text-sm text-[#1A1A1A] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
              <p><span className="font-semibold">Email:</span> {formData.email}</p>
              <p><span className="font-semibold">Mobile:</span> +91 {formData.mobile}</p>
              <p><span className="font-semibold">Product:</span> {formData.interestedIn}</p>
              <p><span className="font-semibold">Quantity:</span> {formData.quantity} {formData.unit}</p>
              <p><span className="font-semibold">Size:</span> {formData.size}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setCurrentStep(3)} className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-[#2E4036]/25 px-5 py-3 font-heading font-semibold text-[#2E4036] dark:border-gray-600 dark:text-gray-100">
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="magnetic-btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-[1.2rem] bg-[#CC5833] px-5 py-3 font-heading font-semibold text-[#F2F0E9] disabled:opacity-60"
              >
                <span className="magnetic-fill" aria-hidden="true" />
                <span className="relative z-10 inline-flex items-center gap-2">
                  {isSubmitting ? <><Loader2 size={15} className="animate-spin" /> Submitting...</> : <>Get My Quote <Send size={15} /></>}
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