import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "+91 7942667387",
    href: "tel:+917942667387",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@hkenterprises.com",
    href: "mailto:info@hkenterprises.com",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "Mumbra, Thane, Maharashtra, India",
    href: "https://maps.app.goo.gl/TGrDPwFup993fTww8",
  },
];

const ContactPage = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-animate",
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact`, formData);
      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 4500);
    }
  };

  return (
    <section ref={sectionRef} className="bg-transparent px-6 py-6 transition-colors duration-300 md:px-10 md:py-8 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.1fr]">
        <aside className="contact-animate rounded-[3rem] border border-[#2E4036]/15 bg-[#1A1A1A] p-6 text-[#F2F0E9] shadow-[0_20px_60px_rgba(26,26,26,0.2)] md:p-7">
          <p className="font-data text-xs uppercase tracking-[0.18em] text-[#F2F0E9]/70">Contact Information</p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold leading-[0.95] tracking-tight md:text-4xl">Get in touch with our operations desk.</h2>
          <p className="mt-3 text-sm text-[#F2F0E9]/80 md:text-base">Share load requirements, dimensions, and volume. We usually respond within 24 business hours.</p>

          <div className="mt-6 space-y-3">
            {contactInfo.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.title === "Address" ? "_blank" : undefined}
                rel={item.title === "Address" ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-4 rounded-[1.4rem] border border-[#F2F0E9]/15 bg-[#F2F0E9]/5 p-3 transition-all duration-300 hover:-translate-y-px"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CC5833] text-[#F2F0E9]">
                  <item.icon size={18} />
                </span>
                <span>
                  <p className="font-data text-[11px] uppercase tracking-[0.16em] text-[#F2F0E9]/65">{item.title}</p>
                  <p className="mt-1 font-heading text-base font-semibold text-[#F2F0E9]">{item.content}</p>
                </span>
              </a>
            ))}
          </div>
{/* 
          <div className="mt-6 rounded-[1.4rem] border border-[#F2F0E9]/15 bg-[#F2F0E9]/5 p-4">
            <p className="font-data text-xs uppercase tracking-[0.14em] text-[#F2F0E9]/65">Tax Profile</p>
            <p className="mt-2 text-sm text-[#F2F0E9]/85">GST No.: <span className="font-data">27BJNPA8946A1Z7</span></p>
          </div> */}
        </aside>

        <div className="contact-animate rounded-[3rem] border border-[#2E4036]/15 bg-[#F2F0E9] p-6 shadow-[0_20px_60px_rgba(26,26,26,0.08)] transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800 md:p-7">
          <p className="font-data text-xs uppercase tracking-[0.18em] text-[#2E4036]/65 dark:text-gray-400">Send Message</p>
          <h3 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-[#2E4036] dark:text-gray-100 md:text-3xl">Tell us what you need.</h3>

          {submitStatus === "success" && (
            <div className="mt-6 flex items-center gap-2 rounded-[1.2rem] border border-[#2E4036]/25 bg-[#2E4036]/8 px-4 py-3 text-sm text-[#2E4036] dark:border-green-700/60 dark:bg-green-900/20 dark:text-green-200">
              <CheckCircle2 size={16} className="text-[#CC5833]" /> Message sent successfully.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mt-6 rounded-[1.2rem] border border-[#CC5833]/35 bg-[#CC5833]/10 px-4 py-3 text-sm text-[#1A1A1A] dark:text-gray-100">
              Unable to send message right now. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
            <div className="grid gap-3 md:grid-cols-2">
              <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} className="rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-sm text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
              <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required disabled={isSubmitting} className="rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-sm text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required disabled={isSubmitting} className="rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-sm text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
              <input name="subject" type="text" placeholder="Subject" value={formData.subject} onChange={handleChange} required disabled={isSubmitting} className="rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-sm text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />
            </div>
            <textarea name="message" rows="7" placeholder="Share dimensions, quantity, and timeline" value={formData.message} onChange={handleChange} required disabled={isSubmitting} className="rounded-[1.2rem] border border-[#2E4036]/20 bg-[#F2F0E9] px-4 py-3 text-sm text-[#1A1A1A] outline-none transition focus:border-[#CC5833] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="magnetic-btn relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-[1.4rem] bg-[#CC5833] px-6 py-3 font-heading font-semibold text-[#F2F0E9] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="magnetic-fill" aria-hidden="true" />
              <span className="relative z-10 inline-flex items-center gap-2">
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;