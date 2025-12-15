// components/HRPackageUpgrade.jsx
import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";

const HRPackageUpgrade = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);

  // 🔹 Backend থেকে package গুলো আনা
  useEffect(() => {
    axios.get("/api/packages").then((res) => {
      setPackages(res.data);
    });
  }, [axios]);

  // 🔹 Upgrade handler
  const handleUpgrade = async (pkg) => {
    try {
      const res = await axios.post(
        "/api/stripe/create-checkout-session",
        {
          hrEmail: user.email,
          packageId: pkg._id,
        }
      );

      // Free package হলে redirect লাগবে না
      if (res.data.free) {
        alert("Package upgraded successfully!");
        return;
      }

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Stripe Checkout error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Upgrade Your Package
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>

            <p className="text-gray-600 dark:text-gray-300">
              Employee Limit: {pkg.employeeLimit}
            </p>

            <p className="text-lg font-bold mt-2">
              {pkg.price === 0 ? "Free" : `$${pkg.price}`}
            </p>

            <button
              onClick={() => handleUpgrade(pkg)}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg cursor-pointer"
            >
              Upgrade
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRPackageUpgrade;
