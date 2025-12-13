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
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact`,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">


      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 dark:from-orange-400 dark:via-orange-500 dark:to-red-500 bg-clip-text text-transparent mb-6 animate-fade-in">
              Get In Touch
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
              Have a question or need help? We'd love to hear from you. 
              <span className="font-semibold text-orange-600"> Send us a message</span> and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="relative">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 transition-colors duration-300">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                  Contact Information
                </h2>
              </div>

              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg transition-all duration-500 border border-white/50 dark:border-gray-700/50`}
                  style={{ animationDelay: item.delay }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.bgGradient} opacity-0 rounded-2xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg transition-transform duration-300`}>
                      <item.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white text-lg mb-1 transition-colors duration-300">{item.title}</p>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">{item.content}</p>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500"></div>
                </div>
              ))}

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

            <div className="relative">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/50 dark:border-gray-700/50 transition-colors duration-300">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2 transition-colors duration-300">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    Send Us a Message
                  </h2>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-xl flex items-center gap-2 animate-fade-in transition-colors duration-300">
                    <FaCheckCircle className="text-green-600 dark:text-green-400" />
                    <span className="text-green-800 dark:text-green-300 font-medium transition-colors duration-300">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl animate-fade-in transition-colors duration-300">
                    <span className="text-red-800 dark:text-red-300 font-medium transition-colors duration-300">Error sending message. Please try again.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        className={`w-full border-2 rounded-xl px-4 py-3 text-gray-800 dark:text-white dark:bg-gray-700/50 dark:placeholder-gray-400 placeholder-gray-500 transition-all duration-300 focus:outline-none bg-white/70 backdrop-blur-sm disabled:opacity-50 ${
                          focusedField === field.name
                            ? 'border-orange-400 shadow-lg shadow-orange-200 dark:shadow-orange-900/50 scale-105'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      />
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 opacity-0 transition-opacity duration-300 -z-10 blur-sm ${
                        focusedField === field.name ? 'opacity-20' : ''
                      }`}></div>
                    </div>
                  ))}

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
                      className={`w-full border-2 rounded-xl px-4 py-3 text-gray-800 dark:text-white dark:bg-gray-700/50 dark:placeholder-gray-400 placeholder-gray-500 transition-all duration-300 focus:outline-none bg-white/70 backdrop-blur-sm disabled:opacity-50 resize-none ${
                        focusedField === 'message'
                          ? 'border-orange-400 shadow-lg shadow-orange-200 dark:shadow-orange-900/50 scale-105'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    />
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 opacity-0 transition-opacity duration-300 -z-10 blur-sm ${
                      focusedField === 'message' ? 'opacity-20' : ''
                    }`}></div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white font-bold px-6 py-4 rounded-xl shadow-xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isSubmitting ? '' : 'hover:animate-pulse'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-700 skew-x-12"></div>
                    
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
