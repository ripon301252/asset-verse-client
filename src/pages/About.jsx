import { FaBuilding, FaShieldAlt, FaUsers, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    title: "Centralized Control",
    icon: <FaBuilding />,
    description: "Manage all company assets and employees from one central dashboard.",
  },
  {
    title: "Secure System",
    icon: <FaShieldAlt />,
    description: "Top-notch security to protect your company’s sensitive information.",
  },
  {
    title: "Employee Friendly",
    icon: <FaUsers />,
    description: "Intuitive interface designed for seamless employee management.",
  },
  {
    title: "Data Analytics",
    icon: <FaChartLine />,
    description: "Powerful analytics to track performance and make informed decisions.",
  },
];

const About = () => (
  <section id="next-section" className="bg-gray-700 text-white py-24 px-6 md:px-12">
    <div className="max-w-6xl mx-auto text-center mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
        Why Choose AssetVerse
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto text-lg sm:text-xl">
        A modern corporate asset management system that ensures efficiency, security, and insight.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, duration: 0.8 }}
          className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 flex flex-col items-center text-center"
        >
          <div className="text-indigo-500 text-4xl mb-4">{feature.icon}</div>
          <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
          <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default About;
