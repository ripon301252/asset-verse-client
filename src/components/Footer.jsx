import React, { useState } from "react";
import Img from "../assets/logo.png";
import { toast } from "react-hot-toast";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return toast.error("Please enter your email");
    // Backend integration placeholder
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-10">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center mb-4 hover:scale-105 transition-transform duration-300">
            <img src={Img} alt="AssetVerse Logo" className="w-12 h-12 md:w-14 md:h-14" />
            <h1 className="text-2xl md:text-3xl font-bold ml-2">
              Asset<span className="text-orange-500">Verse</span>
            </h1>
          </div>
          <p className="mb-4 max-w-xs">
            AssetVerse – Connect, track, and grow. Simplifying digital asset management for businesses.
          </p>
          <div className="flex items-center gap-4 text-2xl">
            <a href="#" className="hover:text-blue-600 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-500 transition-colors"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-red-600 transition-colors"><FaYoutube /></a>
            <a href="#" className="hover:text-pink-600 transition-colors"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/joinEmployee" className="hover:underline">Join as Employee</a></li>
            <li><a href="/joinHr" className="hover:underline">Join as HR</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
            <li><a href="#terms" className="hover:underline">Terms & Privacy</a></li>
          </ul>
        </div>

        {/* Subscribe / Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="py-2 px-3 rounded-md outline-none border border-gray-400 dark:border-gray-600 w-full text-gray-800 dark:text-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-2 rounded-md hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Contact: <br />
            Email: hr@assetverse.com <br />
            Phone: +880 1234 567890
          </p>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} AssetVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
