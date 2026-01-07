import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Globe
} from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@tradehub.com",
      subDetails: "support@tradehub.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (647) 679-0882",
      subDetails: "Mon–Fri 9AM–6PM EST",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "20 Jeanete st",
      subDetails: "Toronto City, Canada",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Globe,
      title: "Global Presence",
      details: "50+ Countries",
      subDetails: "24/7 Support",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    toast.loading("Sending message...", { id: "contact" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message sent successfully!", { id: "contact" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message", { id: "contact" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-4"
        >
          <MessageSquare className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-orange-100">
            Have questions? We're here to help anytime.
          </p>
        </motion.div>
      </section>

      {/* Contact Info */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {contactInfo.map((info, i) => (
            <motion.div
            key={info.title}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.15 }}
           
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow hover:shadow-xl transition text-center"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center`}
              >
                <info.icon className="text-white w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">
                {info.title}
              </h3>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                {info.details}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {info.subDetails}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Office Info */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {["name", "email", "subject"].map((field, idx) => (
                <div key={idx}>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {field} *
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    required
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={`Enter your ${field}`}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell us more..."
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Office Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow">
              <h3 className="flex items-center gap-2 text-xl font-bold mb-4 text-gray-900 dark:text-white">
                <Clock className="text-orange-500" /> Office Hours
              </h3>
              <p className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Mon–Fri</span><span>9AM–6PM</span>
              </p>
              <p className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Saturday</span><span>10AM–4PM</span>
              </p>
              <p className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Sunday</span><span>Closed</span>
              </p>
            </div>

            <div className="rounded-xl overflow-hidden shadow border border-gray-200 dark:border-gray-700">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                alt="Office"
                className="w-full h-64 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
