import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdApproval } from "react-icons/md";
import { TbPlayerEject } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
  const limit = 10;

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const totalPages = Math.ceil(totalRequests / limit);

  // Fetch requests with pagination
  const fetchRequests = async () => {
    try {
      const res = await axiosSecure.get("/asset_requests", {
        params: { page, limit },
      });
      setRequests(res.data.requests || []);
      setTotalRequests(res.data.total || 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page]);

  // const handleApprove = async (reqId, req) => {
  //   if (!req.assetId || !req.email) {
  //     toast.error("Missing asset or employee info");
  //     return;
  //   }

  //   console.log("Approving request:", reqId, req.assetId, req.email, user.email);

  //   try {
  //     const approveInfo = {
  //       hrEmail: user.email,
  //       employeeEmail: req.email,
  //       assetId: req.assetId,
  //     };
  //     const res = await axiosSecure.put(
  //       `/asset_requests/${reqId}/approve`,
  //       approveInfo
  //     );

  //     if (res.data.success) {
  //       toast.success("Request approved!");
  //       // Update UI instantly without refetching all requests
  //       setRequests((prev) =>
  //         prev.map((r) =>
  //           r._id === reqId ? { ...r, status: "approved" } : r
  //         )
  //       );
  //     } else {
  //       toast.error(res.data.message || "Failed to approve request");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to approve request");
  //   }
  // };

  const handleApprove = async (reqId, req) => {
  try {
    const res = await axiosSecure.put(
      `/asset_requests/${reqId}/approve`,
      {
        hrEmail: user.email,
        employeeEmail: req.email,
        assetId: req.assetId,
      }
    );

    if (res.data.success) {
      toast.success("Request approved!");
      fetchRequests(); // ✅ reload issue fixed
    } else {
      toast.error(res.data.message || "Approve failed");
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to approve request");
  }
};


  const handleReject = async (reqId) => {
    try {
      const res = await axiosSecure.put(`/asset_requests/${reqId}/reject`);
      if (res.data.success) {
        toast.success("Request rejected!");
        setRequests((prev) =>
          prev.map((r) =>
            r._id === reqId ? { ...r, status: "rejected" } : r
          )
        );
      } else {
        toast.error(res.data.message || "Failed to reject request");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject request");
    }
  };

  const handleDelete = async (reqId) => {
    const confirmDelete = confirm("Are you sure you want to delete this request?");
    if (!confirmDelete) return;

    try {
      const res = await axiosSecure.delete(`/asset_requests/${reqId}`);
      if (res.data.deletedCount > 0) {
        toast.success("Request deleted!");
        setRequests((prev) => prev.filter((r) => r._id !== reqId));
      } else {
        toast.error("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete request");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Requests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Asset</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-500">
                  No requests found…
                </td>
              </tr>
            )}

            {requests.map((req, i) => (
              <tr key={req._id} className="hover:bg-white/10">
                <th className="sticky left-0 bg-white dark:bg-gray-900 z-10 px-4 py-2">
                  {(page - 1) * limit + i + 1}
                </th>
                <td>{req.userName}</td>
                <td>{req.email}</td>
                <td>{req.assetName}</td>
                <td>{req.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      req.status === "pending"
                        ? "badge-warning"
                        : req.status === "approved"
                        ? "badge-success"
                        : req.status === "returned"
                        ? "badge-info"
                        : "badge-error"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex justify-start items-center gap-3 whitespace-nowrap">
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(req._id, req)}
                          className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-black"
                        >
                          <MdApproval className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="btn btn-outline btn-square text-yellow-500 hover:bg-yellow-500 hover:text-black"
                        >
                          <TbPlayerEject className="text-lg" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-outline btn-square text-[#f87171] hover:bg-[#f87171] hover:text-black"
                    >
                      <IoTrashOutline className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllRequests;
