import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#0e1726] text-gray-300 py-12 ">
      <div className="w-10/12  mx-auto px-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <div className="flex items-center mb-3">
           <div className="w-10 hidden md:flex mr-2 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <BsBoxSeam className='text-white  text-2xl'/>
                           </div> 
            <h2 className="text-xl font-semibold text-white">TradeHub</h2>
          </div>
          <p className="text-sm mb-4">
            Your trusted global marketplace for import and export solutions.
          </p>
          <div className="flex space-x-3">
           
            <a href="https://x.com/Shahriar__Dipu" className="bg-gray-700 hover:bg-orange-500 p-2 rounded-full transition">
              <FaXTwitter />
            </a>
            <a href="https://github.com/ShahriarDipu" className="bg-gray-700 hover:bg-orange-500 p-2 rounded-full transition">
            <FaGithub></FaGithub>
            </a>
            <a href="https://www.linkedin.com/in/shahriar-ahmed-dipu" className="bg-gray-700 hover:bg-orange-500 p-2 rounded-full transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/allProducts" className="hover:text-orange-400 transition">All Products</a></li>
            <li><Link to="/myExports"><a className="hover:text-orange-400 transition">My Exports</a></Link></li>
            <li><Link to="/myImports"><a  className="hover:text-orange-400 transition">My Imports</a></Link></li>
            <li><Link to="/AddExports"><a className="hover:text-orange-400 transition">Add Product</a></Link></li>
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
              shahriardipuofficial@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-orange-400 text-lg" />
              +1 (647) 679-0882
            </li>
            <li className="flex items-start gap-2">
              <MdLocationOn className="text-orange-400 text-lg mt-0.5" />
              20 Jeanette street, Scarborough ,M1M 3G1
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
