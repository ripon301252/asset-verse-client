import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoTrashOutline } from "react-icons/io5";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { PiKeyReturnBold } from "react-icons/pi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import { Link } from "react-router";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [myAssets, setMyAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  // Fetch assets
  useEffect(() => {
    if (!user) return;

    const fetchMyAssets = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/asset_requests?email=${user.email}`);
        const requests = res.data.requests || [];

        const assetsWithDetails = await Promise.all(
          requests.map(async (req) => {
            if (!req.assetId) return req;

            try {
              const assetRes = await axiosSecure.get(`/assets/${req.assetId}`);
              const assetDetails = assetRes.data;

              return {
                ...req,
                assetName: assetDetails.name || req.assetName,
                image: assetDetails.image || "",
                type: assetDetails.type || "",
                company: assetDetails.company || "",
                approvalDate: req.approvalDate || "-", // Backend থেকে প্রাপ্ত হলে দেখাবে
              };
            } catch (err) {
              console.error("Asset details fetch failed:", err);
              return req;
            }
          })
        );

        setMyAssets(assetsWithDetails);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchMyAssets();
  }, [user, axiosSecure]);

  // Delete Asset
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset request?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axiosSecure.delete(`/asset_requests/${id}`);
      if (res.data.deletedCount > 0 || res.data.result?.deletedCount > 0) {
        toast.success("Asset request deleted successfully!");
        setMyAssets((prev) => prev.filter((asset) => asset._id !== id));
      } else {
        toast.error("Failed to delete asset request!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!");
    }
  };

  // Return Asset
  const handleReturn = async (id) => {
    const confirmReturn = window.confirm("Are you sure you want to return this asset?");
    if (!confirmReturn) return;

    try {
      const res = await axiosSecure.put(`/asset_requests/${id}/return`);
      if (res.data.modifiedCount > 0 || res.data.success) {
        toast.success("Asset returned successfully!");
        setMyAssets((prev) =>
          prev.map((asset) =>
            asset._id.toString() === id.toString() ? { ...asset, status: "returned" } : asset
          )
        );
      } else {
        toast.error("Failed to return asset!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Return failed!");
    }
  };

  // Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("AssetVerse - My Assets Report", 14, 10);

    const tableColumn = [
      "Name",
      "Type",
      "Company",
      "Status",
      "Request Date",
      "Approval Date",
    ];

    const tableRows = filteredAssets.map((asset) => [
      asset.assetName,
      asset.type || "-",
      asset.company || "-",
      asset.status,
      new Date(asset.createdAt).toLocaleDateString(),
      asset.approvalDate,
    ]);

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("my_assets.pdf");
  };

  // Search & Filter
  const filteredAssets = myAssets.filter(
    (asset) =>
      asset.assetName.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "" || asset.type.toLowerCase() === filterType.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold">My Assets</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search by Asset Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="select select-bordered max-w-xs"
          >
            <option value="">All Types</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-returnable</option>
          </select>
          <button onClick={handleExportPDF} className="btn btn-outline btn-success">
            Export PDF
          </button>
        </div>
      </div>

      {filteredAssets.length === 0 ? (
        <p className="text-gray-600">No assets found for your search/filter.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Status</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset, index) => (
                <tr key={asset._id} className="hover:bg-white/10">
                  <th>{index + 1}</th>
                  <td>
                    {asset.image ? (
                      <img
                        src={asset.image}
                        alt={asset.assetName}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{asset.assetName}</td>
                  <td>{asset.type || "-"}</td>
                  <td>{asset.company || "-"}</td>
                  <td>
                    <span
                      className={`font-bold ${
                        asset.status === "approved"
                          ? "text-green-600"
                          : asset.status === "rejected"
                          ? "text-red-600"
                          : asset.status === "returned"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td>{new Date(asset.createdAt).toLocaleDateString()}</td>
                  <td>{asset.approvalDate || "-"}</td>
                  <td>
                   <div className="flex justify-start items-center gap-3 whitespace-nowrap">
                        {asset.type?.toLowerCase() === "returnable" &&
                          asset.status?.toLowerCase() === "approved" && (
                            <div
                              className="relative overflow-visible tooltip tooltip-bottom"
                              data-tip="Return"
                            >
                              <button
                                onClick={() => handleReturn(asset._id)}
                                className="btn btn-outline btn-square text-green-500 hover:bg-green-500 hover:text-black"
                              >
                                <PiKeyReturnBold className="text-lg" />
                              </button>
                            </div>
                          )}
                        <div
                          className="relative overflow-visible tooltip tooltip-bottom"
                          data-tip="Request Asset"
                        >
                          <Link
                            to={`/requestAsset`}
                            className="btn btn-outline btn-square text-yellow-500 hover:bg-yellow-500 hover:text-black"
                          >
                            <VscGitPullRequestGoToChanges className="text-lg" />
                          </Link>
                        </div>
                        <div
                          className="relative overflow-visible tooltip tooltip-bottom"
                          data-tip="Delete"
                        >
                          <button
                            onClick={() => handleDelete(asset._id)}
                            className="btn btn-outline btn-square text-[#f87171] hover:bg-[#f87171] hover:text-black"
                          >
                            <IoTrashOutline className="text-lg" />
                          </button>
                        </div>
                        </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAssets;
