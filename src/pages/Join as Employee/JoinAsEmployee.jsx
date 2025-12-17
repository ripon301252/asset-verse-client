import React from "react";
import { FaLaptopCode, FaUsers, FaChartLine, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

const positions = [
  "Frontend Developer",
  "Backend Developer",
  "Blockchain Developer",
  "UI/UX Designer",
  "Marketing / Community Manager",
];

const JoinEmployee = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-28 px-6 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          Join the AssetVerse Team
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          Be part of a cutting-edge digital asset management platform. Help
          companies manage their assets efficiently!
        </p>
      </section>

      {/* Job Openings */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center border-b-2 inline-block">
          Available Positions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {positions.map((pos, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <FaLaptopCode className="text-indigo-500 text-3xl mr-3" />
                <h3 className="text-xl font-semibold">{pos}</h3>
              </div>
              <p className="mb-2">Department: AssetVerse Team</p>
              <p className="mb-4">Location: Remote / Flexible</p>
              <div className="text-center text-indigo-600 font-medium border border-indigo-600 rounded-full py-2 cursor-pointer hover:bg-indigo-600 hover:text-white transition">
                Apply Now
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Culture */}
      <section className="bg-white dark:bg-gray-700 py-20 px-6 mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Work With Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <FaUsers />,
                text: "Collaborative Team",
                gradient: "from-indigo-500 to-purple-500",
              },
              {
                icon: <FaChartLine />,
                text: "Growth Opportunities",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: <FaAward />,
                text: "Perks & Bonuses",
                gradient: "from-pink-500 to-indigo-500",
              },
              {
                icon: <FaLaptopCode />,
                text: "Cutting-Edge Tech",
                gradient: "from-indigo-500 to-purple-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  type: "spring",
                }}
                className={`p-6 bg-gradient-to-r ${item.gradient} rounded-2xl shadow-lg text-white`}
              >
                <div className="text-4xl mb-3 mx-auto">{item.icon}</div>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default JoinEmployee;
