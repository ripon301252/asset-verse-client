import React from "react";
import {
  FaUserTie,
  FaCheckCircle,
  FaShieldAlt,
  FaChartLine,
  FaClipboardCheck,
  FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaCheckCircle className="text-indigo-500 mr-2" />,
    text: "Streamline approvals",
  },
  {
    icon: <FaShieldAlt className="text-indigo-500 mr-2" />,
    text: "Secure & compliant",
  },
  {
    icon: <FaChartLine className="text-indigo-500 mr-2" />,
    text: "Track assets easily",
  },
  {
    icon: <FaClipboardCheck className="text-indigo-500 mr-2" />,
    text: "Monitor requests in real-time",
  },
  {
    icon: <FaUsers className="text-indigo-500 mr-2" />,
    text: "Manage employee access",
  },
  {
    icon: <FaUserTie className="text-indigo-500 mr-2" />,
    text: "Assign roles and permissions",
  },
];

const JoinAsHR = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 py-28 px-6 md:px-12 text-white flex flex-col items-center">
      {/* Floating Shapes */}
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400 rounded-full opacity-30 filter blur-3xl"
        animate={{ y: [0, 20, 0], rotate: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute -bottom-16 -right-16 w-96 h-96 bg-indigo-500 rounded-full opacity-20 filter blur-3xl"
        animate={{ y: [0, -20, 0], rotate: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      <motion.div
        className="relative max-w-6xl mx-auto flex flex-col items-center z-10 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Icon + Heading */}
        <FaUserTie className="text-6xl mb-6 mx-auto text-white" />
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Join as <span className="text-yellow-300">HR</span> &{" "}
          <span className="text-indigo-300">Streamline Your Workflow</span>
        </h2>
        <p className="text-indigo-100 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
          Take control of your company’s assets and employees with AssetVerse.
          Approve requests, monitor assets, and boost productivity seamlessly.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 hover:scale-105 hover:bg-white/20 transition-all duration-300"
            >
              {f.icon}
              <span className="text-white font-medium">{f.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Illustration */}
        <motion.img
          src="https://picsum.photos/500/400"
          alt="HR Illustration"
          className="w-full max-w-lg rounded-2xl shadow-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </section>
  );
};

export default JoinAsHR;
