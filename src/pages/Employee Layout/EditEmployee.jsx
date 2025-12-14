// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import axios from "axios";
// import toast from "react-hot-toast";

// const EditEmployee = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();

//   const [employee, setEmployee] = useState({
//     name: "",
//     email: "",
//     role: "employee",
//     status: "active",
//     photoURL: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [newPhoto, setNewPhoto] = useState(null);

//   // ===========================
//   // Fetch Employee Data
//   // ===========================
// useEffect(() => {
//   if (!id) return;
//   let mounted = true;

//   const fetchEmployee = async () => {
//     try {
//       const res = await axiosSecure.get(`/users/${id}`);
//       console.log(id)
//       if (res.data && mounted) {
//         if (res.data.companyName) {
//           res.data.companyName = res.data.companyName.toLowerCase().trim();
//         }
//         setEmployee(res.data);
//       } else if (!res.data && mounted) {
//         toast.error("Employee not found");
//       }
//     } catch (err) {
//       if (mounted) {
//         console.error(err);
//         toast.error("Failed to fetch employee data");
//       }
//     } finally {
//       if (mounted) setLoading(false);
//     }
//   };

//   fetchEmployee();

//   return () => {
//     mounted = false; // cleanup to prevent double state update
//   };
// }, [id, axiosSecure]);



//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePhotoChange = (e) => {
//     setNewPhoto(e.target.files[0]);
//   };

//   // ===========================
//   // Submit Update
//   // ===========================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let updatedData = { ...employee };
//     let photoURL = employee.photoURL;

//     // যদি নতুন photo upload হয়
//     if (newPhoto) {
//       const formData = new FormData();
//       formData.append("image", newPhoto);

//       try {
//         const imgRes = await axios.post(
//           `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_host_key}`,
//           formData
//         );

//         if (imgRes.data?.data?.display_url) {
//           photoURL = imgRes.data.data.display_url;
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to upload photo");
//         return;
//       }
//     }

//     updatedData.photoURL = photoURL;

//     try {
//       const res = await axiosSecure.put(`/users/${id}`, updatedData);
//       if (res.data.modifiedCount > 0 || res.data.success) {
//         toast.success("Employee updated successfully!");
//         navigate("/employeeList");
//       } else {
//         toast("No changes made");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update employee");
//     }
//   };

//   if (loading) return <p className="text-center py-10">Loading...</p>;

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         {/* Name */}
//         <input
//           type="text"
//           name="name"
//           value={employee.name || ""}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="input input-bordered w-full"
//           required
//         />

//         {/* Email */}
//         <input
//           type="email"
//           name="email"
//           value={employee.email || ""}
//           onChange={handleChange}
//           placeholder="Email"
//           className="input input-bordered w-full"
//           required
//         />

//         {/* Role */}
//         <select
//           name="role"
//           value={employee.role || "employee"}
//           onChange={handleChange}
//           className="select select-bordered w-full"
//         >
//           <option value="employee">Employee</option>
//           <option value="hr">HR</option>
//         </select>

//         {/* Status */}
//         <select
//           name="status"
//           value={employee.status || "active"}
//           onChange={handleChange}
//           className="select select-bordered w-full"
//         >
//           <option value="active">Active</option>
//           <option value="inactive">Inactive</option>
//         </select>

//         {/* Old Photo Preview */}
//         {employee.photoURL && !newPhoto && (
//           <img
//             src={employee.photoURL}
//             alt={employee.name || "Employee"}
//             className="w-16 h-16 object-cover border rounded-md mx-auto"
//           />
//         )}

//         {/* New Photo Preview */}
//         {newPhoto && (
//           <img
//             src={URL.createObjectURL(newPhoto)}
//             alt="New Employee"
//             className="w-16 h-16 object-cover border rounded-md mx-auto"
//           />
//         )}

//         {/* Photo Upload */}
//         <input
//           type="file"
//           onChange={handlePhotoChange}
//           className="file-input file-input-bordered w-full"
//         />

//         <button type="submit" className="btn btn-primary w-full mt-2">
//           Update Employee
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditEmployee;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: "employee",
    status: "active",
    photoURL: "",
  });
  const [loading, setLoading] = useState(true);
  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    const fetchEmployee = async () => {
      try {
        const res = await axiosSecure.get(`/users/${id}`);
        if (res.data && mounted) {
          setEmployee(res.data);
        } else if (!res.data && mounted) {
          toast.error("Employee not found");
        }
      } catch (err) {
        if (mounted) {
          console.error(err);
          toast.error("Failed to fetch employee data");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchEmployee();
    return () => {
      mounted = false;
    };
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedData = { ...employee };
    let photoURL = employee.photoURL;

    if (newPhoto) {
      const formData = new FormData();
      formData.append("image", newPhoto);

      try {
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_host_key}`,
          formData
        );

        if (imgRes.data?.data?.display_url) {
          photoURL = imgRes.data.data.display_url;
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload photo");
        return;
      }
    }

    updatedData.photoURL = photoURL;

    try {
      const res = await axiosSecure.put(`/users/id/${id}`, updatedData);
      if (res.data.modifiedCount > 0 || res.data.success) {
        toast.success("Employee updated successfully!");
        navigate("/employeeList");
      } else {
        toast("No changes made");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update employee");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={employee.name || ""}
          onChange={handleChange}
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={employee.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />
        <select
          name="role"
          value={employee.role || "employee"}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
        </select>
        <select
          name="status"
          value={employee.status || "active"}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {employee.photoURL && !newPhoto && (
          <img
            src={employee.photoURL}
            alt={employee.name || "Employee"}
            className="w-16 h-16 object-cover border rounded-md mx-auto"
          />
        )}

        {newPhoto && (
          <img
            src={URL.createObjectURL(newPhoto)}
            alt="New Employee"
            className="w-16 h-16 object-cover border rounded-md mx-auto"
          />
        )}

        <input
          type="file"
          onChange={handlePhotoChange}
          className="file-input file-input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full mt-2">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;

