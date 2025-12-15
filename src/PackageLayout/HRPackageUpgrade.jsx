// components/HRPackageUpgrade.jsx
import React from "react";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";


const HRPackageUpgrade = () => {
  const axios = useAxios()
  const {user} = useAuth()
  const handleUpgrade = async (packageType) => {
    let amount = packageType === "Standard" ? 20 : 50;

    try {
      const res = await axios.post("/api/stripe/create-checkout-session", {
        hrEmail: user.email,
        packageType,
        amount,
      });

      if (res.data.url) {
        window.location.href = res.data.url; // redirect to Stripe Checkout
      }
    } catch (err) {
      console.error("Stripe Checkout error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Upgrade Your Package
      </h2>

      <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
        <button
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-5 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer"
          onClick={() => handleUpgrade("Standard")}
        >
          Standard Package
          <span className="ml-2 text-sm">($20)</span>
        </button>

        <button
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-5 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer"
          onClick={() => handleUpgrade("Premium")}
        >
          Premium Package
          <span className="ml-2 text-sm">($50)</span>
        </button>
      </div>

      <p className="text-center mt-6 text-gray-500 dark:text-gray-300 text-sm">
        Choose a package to upgrade your HR account.
      </p>
    </div>
  );
};

export default HRPackageUpgrade;
