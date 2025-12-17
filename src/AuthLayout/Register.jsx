
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const role = watch("role");
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (data) => {
    try {
      // 1️⃣ Firebase Register
      await registerUser(data.email, data.password);

      // 2️⃣ Upload profile photo
      const imageAPI = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_photo_host_key
      }`;
      const profileForm = new FormData();
      profileForm.append("image", data.photo[0]);
      const profileRes = await axios.post(imageAPI, profileForm);
      const photoURL = profileRes.data.data.url;

      // 3️⃣ HR হলে company logo upload
      let companyLogoURL = null;
      if (data.role === "hr") {
        const companyForm = new FormData();
        companyForm.append("image", data.companyLogo[0]);
        const companyRes = await axios.post(imageAPI, companyForm);
        companyLogoURL = companyRes.data.data.url;
      }

      
      const userInfo = {
        name: data.name,
        email: data.email,
        role: data.role, 
        hrCode: data.hrCode || "", 
        photoURL,
        companyName: data.role === "hr" ? data.companyName : null,
        companyLogo: data.role === "hr" ? companyLogoURL : null,
        birthdate: data.birthdate,
      };

      // 5️⃣ Save user to DB
       const res = await axiosSecure.post("/users/post", userInfo);
       console.log("User registration response:", res.data);

      // 6️⃣ Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      toast.success("Registration successful!");
      navigate(location.state || "/");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  return (
    <div
      className="mx-4 max-w-md  dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-6 rounded-2xl 
     max-h-[80vh] overflow-y-auto"
    >
      <h2 className="text-2xl font-bold text-center">Create Account</h2>
      <p className="text-center my-2">Join AssetVerse</p>

      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset space-y-2">
          {/* Name */}
          <label className="label">Name</label>
          <input
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500">Name is required</p>}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          {/* Role */}
          <label className="label">Role</label>
          <select
            {...register("role", { required: true })}
            className="select w-full"
          >
            <option value="">Select Role</option>
            <option value="employee">Employee</option>
            <option value="hr">HR Manager</option>
          </select>
          {errors.role && <p className="text-red-500">Role is required</p>}

          {/* HR only fields */}
          {role === "hr" && (
            <>
              <label className="label">Company Name</label>
              <input
                {...register("companyName", { required: true })}
                className="input w-full"
                placeholder="Company Name"
              />

              <label className="label">Company Logo</label>
              <input
                type="file"
                {...register("companyLogo", { required: true })}
                className="file-input w-full"
              />

              {/* 🔐 HR Secret Code */}
              <label className="label">HR Secret Code</label>
              <input
                type="password"
                {...register("hrCode", { required: true })}
                className="input w-full"
                placeholder="Enter HR Secret Code"
              />
            </>
          )}

          {/* Profile Photo */}
          <label className="label">Profile Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
          />
          {errors.photo && <p className="text-red-500">Photo is required</p>}

          {/* Birthdate */}
          <label className="label">Birthdate</label>
          <input
            type="date"
            {...register("birthdate", { required: true })}
            className="input w-full"
          />
          {errors.birthdate && (
            <p className="text-red-500">Birthdate is required</p>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 8 })}
              className="input w-full"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-3"
            >
              {showPassword ? (
                <IoEyeOff className="text-xl text-green-600" />
              ) : (
                <IoEye className="text-xl text-red-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">
              Password must be at least 8 characters
            </p>
          )}

          <button className="btn btn-neutral w-full mt-4">Register</button>
        </fieldset>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
