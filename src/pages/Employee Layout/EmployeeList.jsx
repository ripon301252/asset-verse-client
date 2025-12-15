import React, { useEffect, useState } from "react";
import useRole from "../../Hooks/useRole";
import { IoTrashOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const { user } = useAuth();
  const axios = useAxios();
  const { role, isLoading: roleLoading } = useRole();
  const limit = 10;

  // Fetch employees ONLY from employeeAffiliations
  const fetchEmployees = async () => {
    if (role !== "hr") return;

    try {
      const res = await axios.get("/hr/employees", {
        params: { page, limit, search },
        headers: {
          hremail: user.email, // HR's secure email
        },
      });

      // Backend should return { employees: [...], total: number }
      setEmployees(res.data.employees);
      setTotalEmployees(res.data.total);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [role, page, search]);

  // Remove employee affiliation
  // const handleRemove = async (affiliationId) => {
  //   const confirmDelete = confirm(
  //     "Are you sure you want to remove this employee?"
  //   );
  //   if (!confirmDelete) return;

  //   try {
  //     const res = await axios.delete(`/affiliations/${affiliationId}`);
  //     if (res.data.success) {
  //       toast.success("Employee removed!");
  //       setEmployees((prev) =>
  //         prev.filter((emp) => emp.affiliationId !== affiliationId)
  //       );
  //     } else {
  //       toast.error(res.data.message || "Failed to remove employee");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to remove employee");
  //   }
  // };

  const handleRemove = async (affiliationId) => {
    const confirmDelete = confirm(
      "Are you sure you want to remove this employee?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`/affiliations/${affiliationId}`, {
        headers: { hremail: user.email }, // HR email পাঠানো লাগবে
      });

      if (res.data.success) {
        toast.success("Employee removed!");
        setEmployees((prev) =>
          prev.filter((emp) => emp.affiliationId !== affiliationId)
        );
      } else {
        toast.error(res.data.message || "Failed to remove employee");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove employee");
    }
  };

  const totalPages = Math.ceil(totalEmployees / limit);

  if (roleLoading) return <p className="text-center py-10">Loading...</p>;
  if (role !== "hr")
    return (
      <p className="text-center py-10 text-red-500">
        Access Denied. Only HR can see this.
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
              <th>Status</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <tr key={emp.affiliationId} className="hover:bg-white/10">
                <td className="sticky left-0 bg-white dark:bg-gray-900 z-10 px-4 py-2">
                  {(page - 1) * limit + i + 1}
                </td>
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
                <td>{emp.status}</td>
                <td>{new Date(emp.joinedAt).toLocaleDateString()}</td>
                <td>
                  <div
                    className="relative overflow-visible tooltip tooltip-bottom"
                    data-tip="Remove"
                  >
                    <button
                      onClick={() => handleRemove(emp.affiliationId)}
                      className="btn btn-outline btn-square text-red-400 hover:bg-red-400 hover:text-black"
                    >
                      <IoTrashOutline className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <p className="text-center py-10 text-gray-500">No employees found…</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4 items-center">
        <button
          className="btn"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>

        {/* Current page display */}
        <span className="text-gray-700 font-medium">
          {page}/{totalPages || 1} {/* যদি totalPages 0 হয়, 1 দেখাবে */}
        </span>

        <button
          className="btn"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
