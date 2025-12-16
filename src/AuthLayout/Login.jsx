
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router";
import GoogleLogin from "./GoogleLogin";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      // 1️⃣ Firebase login
      const result = await signInUser(data.email, data.password);
      console.log("Firebase login success:", result.user);

      // 2️⃣ Get user from backend
      const res = await axiosSecure.get(`/users/${data.email}`);
      const user = res.data;

      if (!user) {
        toast.error("User not found in backend");
        return;
      }

      // 3️⃣ Set HR info in localStorage
      if (user.role === "hr") {
        localStorage.setItem("companyName", user.companyName || "");
        localStorage.setItem("companyLogo", user.companyLogo || "");
        localStorage.setItem("packageLimit", user.packageLimit || 0);
      }

      // 4️⃣ Set Employee affiliations if needed
      if (user.role === "employee" && user.affiliations?.length > 0) {
        localStorage.setItem(
          "companyName",
          user.affiliations[0].companyName || ""
        );
      }

      toast.success("Login successful!");
      navigate(location.state || "/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password / backend error!");
    }
  };

  return (
    <div className="lg:ml-20 border dark:bg-gray-800  dark:text-gray-200 border-gray-300 p-6 rounded-2xl max-w-md mx-auto">
      <h3 className="text-center text-2xl font-bold">Welcome back</h3>
      <p className="text-center my-3">Please Login</p>

      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset space-y-3">
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          {/* Password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
              className="input w-full"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-3 cursor-pointer"
            >
              {showPassword ? (
                <IoEyeOff className="text-xl text-green-600" />
              ) : (
                <IoEye className="text-xl text-red-600" />
              )}
            </button>
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be at least 6 characters
            </p>
          )}

          <div>
            <Link
              to="/resetPassword"
              className="link link-hover cursor-pointer text-gray-500"
            >
              Forgot password?
            </Link>
          </div>

          <button className="btn btn-neutral mt-4 w-full">Login</button>
        </fieldset>
      </form>

      {/* <GoogleLogin /> */}

      <p className="mt-3 text-center">
        New to AssetVerse?{" "}
        <Link
          to="/register"
          state={location.state}
          className="text-blue-600 hover:underline font-semibold"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;

