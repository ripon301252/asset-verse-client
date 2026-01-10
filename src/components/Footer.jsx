import React, { useState } from "react";
import Img from "../assets/logo.png";
import { toast } from "react-hot-toast";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    console.log("Subscribed email:", email);
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-16 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-12"
      >
        {/* Logo & About */}
        <div>
          <div className="flex items-center mb-4">
            <img
              src={Img}
              alt="AssetVerse logo"
              className="w-12 h-12 md:w-14 md:h-14 -ml-4"
            />
            <h1 className="text-2xl md:text-3xl font-bold ml-2">
              Asset<span className="text-orange-500">Verse</span>
            </h1>
          </div>

          <p className="mb-5 max-w-xs text-sm leading-relaxed">
            AssetVerse helps businesses track, manage, and grow their digital
            assets with ease.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-xl">
            {[
              {
                icon: <FaFacebookF />,
                link: "https://facebook.com",
                label: "Facebook",
              },
              {
                icon: <FaLinkedinIn />,
                link: "https://linkedin.com",
                label: "LinkedIn",
              },
              {
                icon: <FaYoutube />,
                link: "https://youtube.com",
                label: "YouTube",
              },
              {
                icon: <FaInstagram />,
                link: "https://instagram.com",
                label: "Instagram",
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                whileHover={{ scale: 1.2 }}
                className="hover:text-indigo-600 transition-colors"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/joinEmployee" className="hover:underline">
                Join as Employee
              </Link>
            </li>
            <li>
              <Link to="/joinHr" className="hover:underline">
                Join as HR
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">
                Terms & Privacy
              </Link>
            </li>
          </ul>
        </div>

        {/* Subscribe & Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>

          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="email"
              aria-label="Email address"
              placeholder="Enter your email"
              className="py-2 px-3 rounded-md outline-none border border-gray-400 dark:border-gray-600 w-full text-gray-800 dark:text-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-2 rounded-md hover:scale-105 transition"
            >
              Subscribe
            </button>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm leading-6">
            <strong>Contact</strong>
            <br />
            <span>Email : </span>
            <a
              href={`mailto:ripon301252@gmail.com`}
              className="hover:underline text-indigo-600"
            >
              {" "}
              ripon301252@gmail.com
            </a>
          </p>
          <p>Phone : +880 1626 607121</p>
        </div>
      </motion.div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 text-center py-4 text-xs">
        © {new Date().getFullYear()} AssetVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
