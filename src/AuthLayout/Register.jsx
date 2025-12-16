// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../Hooks/useAuth";
// import { Link, useLocation, useNavigate } from "react-router";
// import GoogleLogin from "./GoogleLogin";
// import axios from "axios";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
// import toast from "react-hot-toast";

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const { registerUser, updateUserProfile } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();

//   const [showPassword, setShowPassword] = useState(false);

//   const handleRegister = (data) => {
//     const profileImg = data.photo[0];

//     registerUser(data.email, data.password)
//       .then(() => {
//         const formData = new FormData();
//         formData.append("image", profileImg);

//         const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
//           import.meta.env.VITE_photo_host_key
//         }`;

//         axios
//           .post(image_API_URL, formData)
//           .then((res) => {
//             const photoURL = res.data.data.url;

//             const userInfo = {
//               email: data.email,
//               name: data.name,
//               displayName: data.name,
//               photoURL: photoURL,
//               role: "employee",
//             };

//             axiosSecure
//               .post("/users", userInfo)
//               .then((res) => {
//                 if (res.data.insertedId) {
//                   toast.success("User registered successfully!");
//                 }
//               })
//               .catch((err) => {
//                 console.error(err);
//                 toast.error("Failed to save user to database.");
//               });

//             const userProfile = { displayName: data.name, photoURL: photoURL };
//             updateUserProfile(userProfile)
//               .then(() => {
//                 navigate(location.state || "/");
//               })
//               .catch((err) => {
//                 console.error(err);
//                 toast.error("Failed to update user profile.");
//               });
//           })
//           .catch((err) => {
//             console.error(err);
//             toast.error("Failed to upload profile image.");
//           });
//       })
//       .catch((err) => {
//         console.error(err);
//         toast.error("Registration failed.");
//       });
//   };

//   const handleTogglePasswordShow = (e) => {
//     e.preventDefault();
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="lg:ml-20 mx-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 p-6 rounded-2xl">
//       <h3 className="text-center text-2xl font-bold">Welcome to Asset Verse</h3>
//       <p className=" text-center my-3">Please Register</p>
//       <form onSubmit={handleSubmit(handleRegister)}>
//         <fieldset className="fieldset">
//           {/* Name */}
//           <label className="label">Name</label>
//           <input
//             type="text"
//             {...register("name", { required: true })}
//             className="input w-full"
//             placeholder="Your Name"
//           />
//           {errors.name && <p className="text-red-500">Name is required.</p>}

//           {/* Photo */}
//           <label className="label">Photo</label>
//           <input
//             type="file"
//             {...register("photo", { required: true })}
//             className="file-input w-full"
//           />
//           {errors.photo && <p className="text-red-500">Photo is required.</p>}

//           {/* Email */}
//           <label className="label">Email</label>
//           <input
//             type="email"
//             {...register("email", { required: true })}
//             className="input w-full"
//             placeholder="Email"
//           />
//           {errors.email && <p className="text-red-500">Email is required.</p>}

//           {/* Password */}
//           <div>
//             <label className="label">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 {...register("password", {
//                   required: true,
//                   minLength: 8,
//                   pattern:
//                     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                 })}
//                 className="input w-full"
//                 placeholder="Password"
//               />
//               <button
//                 type="button"
//                 onClick={handleTogglePasswordShow}
//                 className="absolute top-2.5 right-3 transition-colors cursor-pointer"
//               >
//                 {showPassword ? (
//                   <IoEyeOff className="text-2xl text-green-600" />
//                 ) : (
//                   <IoEye className="text-2xl text-red-600" />
//                 )}
//               </button>

//               {errors.password?.type === "required" && (
//                 <p className="text-red-500">Password is required.</p>
//               )}
//               {errors.password?.type === "minLength" && (
//                 <p className="text-red-500">
//                   Password must be 8 characters or longer.
//                 </p>
//               )}
//               {errors.password?.type === "pattern" && (
//                 <p className="text-red-500">
//                   Password must include one uppercase, one lowercase, one
//                   number, and one special character.
//                 </p>
//               )}
//             </div>
//           </div>

//           <button className="btn btn-neutral mt-4">Register</button>
//         </fieldset>
//       </form>

//       <GoogleLogin />

//       <p className="mt-3 text-center">
//         Already registered?{" "}
//         <Link
//           state={location.state}
//           to={`/login`}
//           className="text-blue-600 hover:underline font-semibold cursor-pointer"
//         >
//           Login
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../Hooks/useAuth";
// import { Link, useLocation, useNavigate } from "react-router";
// import GoogleLogin from "./GoogleLogin";
// import axios from "axios";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
// import toast from "react-hot-toast";

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const role = watch("role");
//   const { registerUser, updateUserProfile } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleRegister = async (data) => {
//     try {
//       await registerUser(data.email, data.password);

//       // upload profile image
//       const formData = new FormData();
//       formData.append("image", data.photo[0]);

//       const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_host_key}`;
//       const imgRes = await axios.post(imageAPI, formData);
//       const photoURL = imgRes.data.data.url;

//       // HR logo upload
//       let companyLogoURL = null;
//       if (data.role === "hr") {
//         const companyForm = new FormData();
//         companyForm.append("image", data.companyLogo[0]);
//         const companyRes = await axios.post(imageAPI, companyForm);
//         companyLogoURL = companyRes.data.data.url;
//       }

//       const userInfo = {
//         email: data.email,
//         name: data.name,
//         displayName: data.name,
//         photoURL,
//         role: data.role,
//         companyName: data.role === "hr" ? data.companyName : null,
//         companyLogo: data.role === "hr" ? companyLogoURL : null,
//         packageLimit: data.role === "hr" ? 5 : null,
//       };

//       await axiosSecure.post("/users", userInfo);
//       await updateUserProfile({ displayName: data.name, photoURL });

//       toast.success("Registration successful!");
//       navigate(location.state || "/");
//     } catch (err) {
//       console.error(err);
//       toast.error("Registration failed");
//     }
//   };

//   return (
//     <div className="lg:ml-10 mx-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
//   border border-gray-300 dark:border-gray-700
//   p-6 rounded-2xl max-w-md
//   max-h-[90vh] overflow-y-auto">
//       <h3 className="text-center text-2xl font-bold">Welcome to AssetVerse</h3>
//       <p className="text-center my-3">Create your account</p>

//       <form onSubmit={handleSubmit(handleRegister)}>
//         <fieldset className="fieldset space-y-1">

//           {/* Name */}
//           <label className="label">Name</label>
//           <input
//             {...register("name", { required: true })}
//             className="input w-full"
//             placeholder="Your Name"
//           />
//           {errors.name && <p className="text-red-500">Name is required</p>}

//           {/* Email */}
//           <label className="label">Email</label>
//           <input
//             {...register("email", { required: true })}
//             className="input w-full"
//             placeholder="Email"
//           />
//           {errors.email && <p className="text-red-500">Email is required</p>}

//           {/* Role */}
//           <label className="label">Role</label>
//           <select
//             {...register("role", { required: true })}
//             className="select w-full"
//           >
//             <option value="">Select Role</option>
//             <option value="employee">Employee</option>
//             <option value="hr">HR Manager</option>
//           </select>
//           {errors.role && <p className="text-red-500">Role is required</p>}

//           {/* HR Fields */}
//           {role === "hr" && (
//             <>
//               <label className="label">Company Name</label>
//               <input
//                 {...register("companyName", { required: true })}
//                 className="input w-full"
//                 placeholder="Company Name"
//               />

//               <label className="label">Company Logo</label>
//               <input
//                 type="file"
//                 {...register("companyLogo", { required: true })}
//                 className="file-input w-full"
//               />
//             </>
//           )}

//           {/* Photo */}
//           <label className="label">Profile Photo</label>
//           <input
//             type="file"
//             {...register("photo", { required: true })}
//             className="file-input w-full"
//           />
//           {errors.photo && <p className="text-red-500">Photo is required</p>}

//           {/* Password */}
//           <label className="label">Password</label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               {...register("password", { required: true, minLength: 8 })}
//               className="input w-full"
//               placeholder="Password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute top-2.5 right-3 cursor-pointer"
//             >
//               {showPassword ? (
//                 <IoEyeOff className="text-xl text-green-600" />
//               ) : (
//                 <IoEye className="text-xl text-red-600" />
//               )}
//             </button>
//           </div>
//           {errors.password && (
//             <p className="text-red-500">
//               Password must be at least 8 characters
//             </p>
//           )}

//           <button className="btn btn-neutral w-full mt-4">
//             Register
//           </button>
//         </fieldset>
//       </form>

//       {/* <GoogleLogin /> */}

//       <p className="mt-3 text-center">
//         Already have an account?{" "}
//         <Link
//           to="/login"
//           state={location.state}
//           className="text-blue-600 hover:underline font-semibold"
//         >
//           Login
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Register;

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

      // 4️⃣ User info (NO package / packageLimit here)
      const userInfo = {
        name: data.name,
        email: data.email,
        role: data.role, // backend verify করবে
        hrCode: data.hrCode || "", // 🔐 secret code
        photoURL,
        companyName: data.role === "hr" ? data.companyName : null,
        companyLogo: data.role === "hr" ? companyLogoURL : null,
        birthdate: data.birthdate,
      };

      // 5️⃣ Save user to DB
       const res = await axiosSecure.post("/users", userInfo);
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
