import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#0e1726] text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <div className="flex items-center mb-3">
            <div className="bg-orange-500 text-white p-2 rounded-lg text-2xl font-bold mr-2">
              <span>📦</span>
            </div>
            <h2 className="text-xl font-semibold text-white">TradeHub</h2>
          </div>
          <p className="text-sm mb-4">
            Your trusted global marketplace for import and export solutions.
          </p>
          <div className="flex space-x-3">
            <a href="#" className="bg-gray-700 hover:bg-orange-500 p-2 rounded-full transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-orange-500 p-2 rounded-full transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-orange-500 p-2 rounded-full transition">
              <FaInstagram />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-orange-500 p-2 rounded-full transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-400 transition">All Products</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">My Exports</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">My Imports</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Add Product</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-400 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-400 transition">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MdEmail className="text-orange-400 text-lg" />
              info@tradehub.com
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-orange-400 text-lg" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-start gap-2">
              <MdLocationOn className="text-orange-400 text-lg mt-0.5" />
              123 Trade Street, Commerce City, NY 10001
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © 2025 <span className="text-white font-medium">TradeHub.</span> All rights reserved. | Built with passion for global trade.
      </div>
    </footer>
  );
};

export default Footer;
