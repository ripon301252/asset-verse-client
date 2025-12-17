import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Is AssetVerse secure?",
    answer:
      "Yes! AssetVerse uses enterprise-grade security protocols to ensure all company data and assets are fully protected.",
  },
  {
    question: "Can I upgrade my package later?",
    answer:
      "Absolutely! You can upgrade your plan anytime as your company grows.",
  },
  {
    question: "Is it easy for employees to request assets?",
    answer:
      "Yes, the system is designed to be user-friendly for both employees and HR managers.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-28 bg-gray-900 text-white px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-300 text-lg sm:text-xl">
          Answers to common questions about AssetVerse
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg cursor-pointer"
            onClick={() => toggleFAQ(i)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              {openIndex === i ? (
                <FaChevronUp className="text-indigo-500" />
              ) : (
                <FaChevronDown className="text-indigo-500" />
              )}
            </div>
            <AnimatePresence>
              {openIndex === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-gray-300"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
