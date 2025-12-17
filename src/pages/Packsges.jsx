import { motion } from "framer-motion";

const packages = [
  {
    name: "Basic",
    employeeLimit: 5,
    price: 5,
    features: ["Asset Tracking", "Employee Management", "Basic Support"],
  },
  {
    name: "Standard",
    employeeLimit: 10,
    price: 8,
    features: ["All Basic features", "Advanced Analytics", "Priority Support"],
    popular: true,
  },
  {
    name: "Premium",
    employeeLimit: 20,
    price: 15,
    features: ["All Standard features", "Custom Branding", "24/7 Support"],
  },
];

const Packages = () => (
  <section className="py-28 bg-gray-900 text-white">
    <div className="text-center mb-16 px-4">
      <h2 className="text-4xl font-extrabold mb-4">Our Packages</h2>
      <p className="text-gray-300 max-w-2xl mx-auto">
        Choose a plan that fits your company’s needs. Upgrade anytime as your business grows.
      </p>
    </div>

    <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 px-4">
      {packages.map((pkg, i) => (
        <motion.div
          key={pkg.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2, duration: 0.8 }}
          className={`flex flex-col justify-between p-8 rounded-2xl shadow-lg border ${
            pkg.popular
              ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-transparent"
              : "bg-gray-800 border-gray-700"
          } hover:scale-105 transition-transform duration-300`}
        >
          {pkg.popular && (
            <div className="text-sm font-semibold text-white uppercase mb-4 bg-indigo-700/80 rounded-full px-3 py-1 w-max mx-auto">
              Most Popular
            </div>
          )}

          <h3 className="text-2xl font-bold mb-2 text-center">{pkg.name}</h3>
          <p className="text-gray-300 text-center mb-6">Up to {pkg.employeeLimit} Employees</p>
          <p className="text-4xl font-extrabold mb-6 text-center">
            ${pkg.price}
            <span className="text-lg font-medium text-gray-300">/mo</span>
          </p>

          <ul className="space-y-2 mb-6">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-indigo-500 font-bold">•</span> {feature}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className={`text-center py-3 rounded-full font-semibold ${
              pkg.popular
                ? "bg-white text-purple-700 hover:bg-gray-100"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            } transition`}
          >
            Choose Plan
          </a>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Packages;
