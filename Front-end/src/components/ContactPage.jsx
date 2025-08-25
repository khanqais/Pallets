import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaSpinner } from "react-icons/fa";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await axios.post("http://localhost:4000/contact",
        formData
      );
      if (res.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        
        
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaPhoneAlt,
      title: "Phone",
      content: "+91 7942667387",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      delay: "0ms"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      content: "info@hkenterprises.com",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      delay: "100ms"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      content: "Mumbra, Thane, Maharashtra, India",
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      delay: "200ms"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Animated Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Get In Touch
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Have a question or need help? We'd love to hear from you. 
              <span className="font-semibold text-orange-600"> Send us a message</span> and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info Section */}
            <div className="space-y-8">
              <div className="relative">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                  Contact Information
                </h2>
              </div>

              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`group relative bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/50`}
                  style={{ animationDelay: item.delay }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.bgGradient} opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg mb-1">{item.title}</p>
                      <p className="text-gray-600 leading-relaxed">{item.content}</p>
                    </div>
                  </div>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-500"></div>
                </div>
              ))}

              {/* Additional Info Card */}
              <div className="relative bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl shadow-xl text-white">
                <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Quick Response Guarantee</h3>
                  <p className="text-orange-100">We typically respond within 24 hours during business days.</p>
                  <div className="mt-4 flex items-center gap-2">
                    <FaCheckCircle className="text-green-300" />
                    <span className="text-sm font-medium">71% Response Rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/50">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    Send Us a Message
                  </h2>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 animate-fade-in">
                    <FaCheckCircle className="text-green-600" />
                    <span className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                    <span className="text-red-800 font-medium">Error sending message. Please try again.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form Fields */}
                  {[
                    { name: 'name', placeholder: 'Full Name', type: 'text' },
                    { name: 'email', placeholder: 'Email Address', type: 'email' },
                    { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                    { name: 'subject', placeholder: 'Subject', type: 'text' }
                  ].map((field, index) => (
                    <div key={field.name} className="relative group">
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        required
                        disabled={isSubmitting}
                        className={`w-full border-2 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none bg-white/70 backdrop-blur-sm disabled:opacity-50 ${
                          focusedField === field.name
                            ? 'border-orange-400 shadow-lg shadow-orange-200 scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      />
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 opacity-0 transition-opacity duration-300 -z-10 blur-sm ${
                        focusedField === field.name ? 'opacity-20' : ''
                      }`}></div>
                    </div>
                  ))}

                  {/* Message Textarea */}
                  <div className="relative group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows="4"
                      required
                      disabled={isSubmitting}
                      className={`w-full border-2 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none bg-white/70 backdrop-blur-sm disabled:opacity-50 resize-none ${
                        focusedField === 'message'
                          ? 'border-orange-400 shadow-lg shadow-orange-200 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    />
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 opacity-0 transition-opacity duration-300 -z-10 blur-sm ${
                      focusedField === 'message' ? 'opacity-20' : ''
                    }`}></div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white font-bold px-6 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 ${
                      isSubmitting ? '' : 'hover:animate-pulse'
                    }`}
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                    
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
