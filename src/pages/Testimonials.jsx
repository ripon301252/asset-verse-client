import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ripon",
    role: "HR Manager",
    message:
      "AssetVerse made tracking our company assets so simple and organized. Highly recommended!",
  },
  {
    name: "Amena",
    role: "Employee",
    message:
      "I can easily request and manage assets without any confusion. Love the smooth workflow!",
  },
  {
    name: "Mahfuzur Rahman",
    role: "HR",
    message:
      "Approving requests and keeping everything documented has never been easier.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 py-28 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          What Our Users Say
        </h2>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          Hear from people who use AssetVerse daily
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-6 md:px-12 ">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="  p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-500"
          >
            <p className="mb-6 italic ">
              "{testimonial.message}"
            </p>
            <h3 className="font-bold text-xl mb-1">{testimonial.name}</h3>
            <p className=" text-sm">{testimonial.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
