import React, { useState } from "react";
import { FaTimes, FaPaperPlane, FaSpinner } from "react-icons/fa";

const QuickMessagePopup = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      onClose();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full transform animate-slideIn transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl hover:scale-110 transition-all duration-300"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
              Send a quick message to the seller for more information
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-700 dark:text-white dark:bg-gray-700/50 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-300"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-700 dark:text-white dark:bg-gray-700/50 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-300"
            />
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-700 dark:text-white dark:bg-gray-700/50 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-300"
            />
            
            <input
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-700 dark:text-white dark:bg-gray-700/50 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-300"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your requirement in detail"
              rows={4}
              required
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300"
            />
            <button
              type="submit"
              disabled={
                !formData.name || !formData.email || !formData.message || isSubmitting
              }
              className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="group-hover:rotate-12 transition-transform duration-300" />
                  <span>Submit</span>
                </>
              )}
            </button>
            <p className="text-center text-sm text-blue-500 italic">
              You are just a click away from getting quotes
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuickMessagePopup;
