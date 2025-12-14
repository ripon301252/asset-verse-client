// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import useRole from "../../Hooks/useRole";
// import { IoTrashOutline } from "react-icons/io5";
// import { Link } from "react-router";
// import { FaRegEdit } from "react-icons/fa";
// import { AiOutlineUsergroupAdd } from "react-icons/ai";
// import toast from "react-hot-toast";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalEmployees, setTotalEmployees] = useState(0);

//   const axiosSecure = useAxiosSecure();
//   const { role, isLoading: roleLoading } = useRole();
//   const limit = 10;

//   const companyName = localStorage.getItem("companyName");

//   // Fetch employees
//   const fetchEmployees = async () => {
//     if (role !== "hr" || !companyName) return;

//     try {
//       const res = await axiosSecure.get("/employees", {
//         params: { company: companyName, page, limit, search },
//       });

//       setEmployees(res.data.employees);
//       setTotalEmployees(res.data.total);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch employees");
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, [role, page, search, companyName]);


//   // Remove employee affiliation
// const handleRemove = async (id) => {
//   const confirmDelete = confirm(
//     "Are you sure you want to remove this employee?"
//   );
//   if (!confirmDelete) return;

//   try {
//     const res = await axiosSecure.delete(`/affiliations/${id}`, {
//       data: { companyName }, // ✅ companyName পাঠাচ্ছি
//     });
//     if (res.data.success) {
//       toast.success("Employee removed!");
//       setEmployees((prev) => prev.filter((emp) => emp._id !== id));
//     } else {
//       toast.error(res.data.message || "Failed to remove employee");
//     }
//   } catch (err) {
//     console.error(err);
//     toast.error("Failed to remove employee");
//   }
// };

//   const totalPages = Math.ceil(totalEmployees / limit);

//   if (roleLoading) return <p className="text-center py-10">Loading...</p>;
//   if (role !== "hr" || !companyName)
//     return (
//       <p className="text-center py-10 text-red-500">
//         Access Denied or Company not found.
//       </p>
//     );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-4">Employee List</h2>

//       {/* Search */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           className="input input-bordered w-full max-w-sm"
//           value={search}
//           onChange={(e) => {
//             setPage(1);
//             setSearch(e.target.value);
//           }}
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr className="bg-base-200">
//               <th>#</th>
//               <th>Employee</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Joined Date</th>
//               {role === "hr" && <th>Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((emp, i) => {
//               const affiliation = emp.affiliations?.find(
//                 (a) => a.companyName === companyName
//               );
//               const joinedDate = affiliation
//                 ? new Date(affiliation.joinedAt).toLocaleDateString()
//                 : "N/A";

//               return (
//                 <tr key={emp._id} className="hover:bg-white/10">
//                   <td>{(page - 1) * limit + i + 1}</td>
//                   <td className="flex items-center gap-3">
//                     {emp.photoURL ? (
//                       <img
//                         src={emp.photoURL}
//                         alt={emp.name}
//                         className="w-14 h-14 rounded-md object-cover border"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-white">
//                         {emp.name?.[0]?.toUpperCase() || "U"}
//                       </div>
//                     )}
//                     <span>{emp.name}</span>
//                   </td>
//                   <td>{emp.email}</td>
//                   <td>{emp.role}</td>
//                   <td>{emp.status || "active"}</td>
//                   <td>{joinedDate}</td>
//                   {role === "hr" && (
//                     <td className="flex gap-3">
//                       <Link
//                         to={`/editEmployee/${emp._id}`}
//                         className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-black"
//                       >
//                         <FaRegEdit className="text-lg" />
//                       </Link>

//                       <Link
//                         to={`/addEmployee`}
//                         className="btn btn-outline btn-square text-green-500 hover:bg-green-500 hover:text-black"
//                       >
//                         <AiOutlineUsergroupAdd className="text-lg" />
//                       </Link>

//                       <button
//                         onClick={() => handleRemove(emp._id)}
//                         className="btn btn-outline btn-square text-red-400 hover:bg-red-400 hover:text-black"
//                       >
//                         <IoTrashOutline className="text-lg" />
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {employees.length === 0 && (
//           <p className="text-center py-10 text-gray-500">
//             No employees found…
//           </p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 gap-4">
//         <button
//           className="btn"
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//         >
//           Previous
//         </button>
//         <button
//           className="btn"
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmployeeList;

import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRole from "../../Hooks/useRole";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import toast from "react-hot-toast";
// import { doc, updateDoc, arrayRemove } from "firebase/firestore";
// import { db } from "../../firebase.init";


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
 

  const axiosSecure = useAxiosSecure();
  const { role, isLoading: roleLoading } = useRole();
  const limit = 10;

  const companyName = (localStorage.getItem("companyName") || "").trim();

  // Fetch employees
  const fetchEmployees = async () => {
    if (role !== "hr" || !companyName) return;

    try {
      const res = await axiosSecure.get("/employees", {
        params: { company: companyName, page, limit, search },
      });

      setEmployees(res.data.employees);
      setTotalEmployees(res.data.total);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [role, page, search, companyName]);

  // Remove employee affiliation
  const handleRemove = async (id) => {
  const confirmDelete = confirm(
    "Are you sure you want to remove this employee?"
  );
  if (!confirmDelete) return;

  try {
    const res = await axiosSecure.delete(`/affiliations/${id}`, {
      data: { companyName: companyName.toLowerCase().trim() }, // ✅ lowercase
    });

    if (res.data.success) {
      toast.success("Employee removed!");
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } else {
      toast.error(res.data.message || "Failed to remove employee");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to remove employee");
  }
};



//   const handleRemove = async (id, firebaseUid) => {
//   const confirmDelete = confirm(
//     "Are you sure you want to remove this employee?"
//   );
//   if (!confirmDelete) return;

//   try {
//     // 1️⃣ Remove from MongoDB
//     const res = await axiosSecure.delete(`/affiliations/${id}`, {
//       data: { companyName },
//     });
//     if (!res.data.success) throw new Error("MongoDB remove failed");

//     // 2️⃣ Remove affiliation from Firebase
//     if (firebaseUid) {
//       // Option A: update custom claims (role/affiliation) if using Firebase Auth
//       // Option B: update Firestore / RTDB document
//       const userDocRef = doc(db, "users", firebaseUid);
//       await updateDoc(userDocRef, {
//         affiliations: arrayRemove({ companyName }),
//       });
//     }

//     toast.success("Employee removed!");
//     setEmployees((prev) => prev.filter((emp) => emp._id !== id));
//   } catch (err) {
//     console.error(err);
//     toast.error("Failed to remove employee");
//   }
// };

  const totalPages = Math.ceil(totalEmployees / limit);

  if (roleLoading) return <p className="text-center py-10">Loading...</p>;
  if (role !== "hr" || !companyName)
    return (
      <p className="text-center py-10 text-red-500">
        Access Denied or Company not found.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Employee</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined Date</th>
              {role === "hr" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => {
              // Case-insensitive affiliation match
              const affiliation = emp.affiliations?.find(
                (a) =>
                  a.companyName?.toLowerCase().trim() ===
                  companyName.toLowerCase().trim()
              );

              const joinedDate = affiliation
                ? new Date(affiliation.joinedAt).toLocaleDateString()
                : "N/A";

              return (
                <tr key={emp._id} className="hover:bg-white/10">
                  <td>{(page - 1) * limit + i + 1}</td>
                  <td className="flex items-center gap-3">
                    {emp.photoURL ? (
                      <img
                        src={emp.photoURL}
                        alt={emp.name}
                        className="w-14 h-14 rounded-md object-cover border"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-white">
                        {emp.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <span>{emp.name}</span>
                  </td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.status || "active"}</td>
                  <td>{joinedDate}</td>
                  {role === "hr" && (
                    <td className="flex gap-3">
                      {/* <Link
                        to={`/editEmployee/${emp._id}`}
                        className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-black"
                      >
                        <FaRegEdit className="text-lg" />
                      </Link> */}

                      {/* <Link
                        to={`/addEmployee`}
                        className="btn btn-outline btn-square text-green-500 hover:bg-green-500 hover:text-black"
                      >
                        <AiOutlineUsergroupAdd className="text-lg" />
                      </Link> */}

                      <button
                        onClick={() => handleRemove(emp._id)}
                        className="btn btn-outline btn-square text-red-400 hover:bg-red-400 hover:text-black"
                      >
                        <IoTrashOutline className="text-lg" />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {employees.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No employees found…
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          className="btn"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <button
          className="btn"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;

