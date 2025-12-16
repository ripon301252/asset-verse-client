// components/HRPackageUpgrade.jsx
import React, { useEffect, useRef, useState } from "react";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const HRPackageUpgrade = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);
  const calledRef = useRef(false);
  // 🔹 Backend থেকে package গুলো আনা
  useEffect(() => {
    axios.get("/api/packages").then((res) => {
      setPackages(res.data);
    });
  }, [axios]);



useEffect(() => {
  if (calledRef.current) return;
  calledRef.current = true;

  const params = new URLSearchParams(window.location.search);
  const session_id = params.get("session_id");
  const packageId = params.get("packageId");
  const hrEmail = params.get("hrEmail");

  console.log({ session_id, packageId, hrEmail });

  if (!session_id || !packageId || !hrEmail) return;

  axios.get(`/api/stripe/success?session_id=${session_id}&packageId=${packageId}&hrEmail=${hrEmail}`)
    .then(res => {
      console.log("SUCCESS RESPONSE:", res.data);

      if (res.data.success && res.data.packageName) {
        toast.success(`Package upgraded to ${res.data.packageName}`);
      } else {
        toast.error("Payment verification failed");
      }
    })
    .catch(() => toast.error("Upgrade failed"));
}, [axios]);


  const handleUpgrade = async (pkg) => {
    try {
      const res = await axios.post("/api/stripe/create-checkout-session", {
        hrEmail: user.email,
        packageId: pkg._id,
      });

      // Free package
      if (res.data.free) {
        toast.success("Package upgraded successfully!");
        return;
      }

      // Paid → redirect to Stripe
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
      toast.error("Upgrade failed");
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
            className="p-6  dark:bg-gray-800 rounded-xl shadow-lg"
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
