import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 py-28 px-6 md:px-12 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Ready to Simplify Asset Management?
        </h2>
        <p className="text-lg sm:text-xl mb-10 text-indigo-100">
          Join AssetVerse today and manage your assets efficiently!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="/joinEmployee"
            className="bg-white text-purple-700 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Join as Employee
          </Link>

          <Link
            to="/joinHr"
            className="border-2 border-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-purple-700 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Join as HR
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
