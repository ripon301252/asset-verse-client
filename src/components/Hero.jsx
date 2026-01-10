import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowDownLong } from "react-icons/fa6";

const slides = [
  {
    title: "Smart Corporate Asset Management",
    desc: "Manage company assets, employees, and growth from one secure platform.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    title: "Track Assets Effortlessly",
    desc: "Monitor, assign, and manage assets in real-time with full transparency.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
  },
  {
    title: "Scale Your Business Confidently",
    desc: "Secure, scalable solutions designed for modern growing teams.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[75vh] sm:h-[65vh] w-full overflow-hidden">
      {/* Banner Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[index].image})` }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/70 to-pink-900/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 text-center">
        <div className="max-w-4xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6">
                {slides[index].title}
              </h1>

              <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
                {slides[index].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#packages"
              className="bg-white text-purple-700 font-semibold px-6 sm:px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition w-full sm:w-auto"
            >
              Get Started
            </a>
            <a
              href="#about"
              className="border border-white text-white font-semibold px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-purple-700 transition w-full sm:w-auto"
            >
              Learn More
            </a>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6 sm:mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#next-section"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
        className="
          absolute 
          bottom-3 sm:bottom-5 md:bottom-6
          left-1/2 -translate-x-1/2
          z-10
          flex items-center justify-center
          bg-purple-700 hover:bg-purple-600
          text-white
          rounded-full
          w-8 h-10
          sm:w-9 sm:h-12
          md:w-7 md:h-10
        "
      >
        <FaArrowDownLong className="text-sm sm:text-base md:text-lg" />
      </motion.a>
    </section>
  );
};

export default Hero;
