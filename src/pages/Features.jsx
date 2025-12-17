import { FaUsers, FaCogs, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: FaUsers,
    title: "Team Management",
    description: "Easily manage and monitor all employees and their assigned assets.",
  },
  {
    icon: FaCogs,
    title: "Automation Tools",
    description: "Automate repetitive tasks and streamline workflows efficiently.",
  },
  {
    icon: FaShieldAlt,
    title: "Security First",
    description: "Keep sensitive company data safe with enterprise-grade security.",
  },
  {
    icon: FaChartLine,
    title: "Analytics & Reports",
    description: "Gain actionable insights with real-time analytics dashboards.",
  },
];

const Features = () => (
  <section className="py-28 bg-gray-700 text-white px-6 md:px-12">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl font-extrabold mb-4">Enterprise Features</h2>
      <p className="text-gray-300 text-lg sm:text-xl">
        Everything you need to manage your company assets, employees, and data efficiently.
      </p>
    </div>

    <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, i) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:border-indigo-500 transition-all duration-300"
          >
            <Icon className="text-indigo-500 text-5xl mb-4" />
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default Features;
