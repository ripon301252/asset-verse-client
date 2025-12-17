import React from "react";
import { FaUser, FaClipboardCheck, FaBoxOpen } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: FaUser,
    title: "Register / Login",
    description: "Create an account as Employee or HR to get started.",
  },
  {
    icon: FaClipboardCheck,
    title: "Manage Requests",
    description: "Employees can request assets, HR can approve or reject them.",
  },
  {
    icon: FaBoxOpen,
    title: "Track Assets",
    description: "Keep track of all assigned assets, requests, and approvals.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-700 text-white py-28 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          How AssetVerse Works
        </h2>
        <p className="text-gray-300 text-lg sm:text-xl">
          Follow these simple steps to manage your assets efficiently.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 flex flex-col items-center text-center"
            >
              <Icon className="text-indigo-500 text-6xl mb-6" />
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-300 text-base">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
