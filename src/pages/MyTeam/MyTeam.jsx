// src/pages/MyTeam/MyTeam.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);

  // Fetch logged-in user from DB
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => setDbUser(res.data))
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  // Fetch team members
  const fetchTeam = async () => {
    if (!dbUser) return setLoading(false);

    try {
      const res = await axiosSecure.get("/users");

      // Simple logic: all employees except current user
      const members = res.data.filter(
        (u) => u._id !== dbUser._id && u.role === "employee"
      );

      setTeamMembers(members);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dbUser) fetchTeam();
  }, [dbUser]);

  // Upcoming birthdays within 30 days
  const upcomingBirthdays = teamMembers
    .filter((member) => member.birthdate)
    .map((member) => {
      const today = new Date();
      const birthDate = new Date(member.birthdate);
      birthDate.setFullYear(today.getFullYear());
      const diff = (birthDate - today) / (1000 * 60 * 60 * 24);
      return { ...member, daysLeft: diff };
    })
    .filter((member) => member.daysLeft >= 0 && member.daysLeft <= 30)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Team Members</h2>

      {/* Upcoming Birthdays */}
      <div className="mb-6 w-full bg-base-200 p-4 rounded-xl">
        <h3 className="text-lg font-bold mb-2">Upcoming Birthdays</h3>
        {upcomingBirthdays.length === 0 ? (
          <p className="text-gray-600">No upcoming birthdays</p>
        ) : (
          <ul className="flex flex-wrap gap-4">
            {upcomingBirthdays.map((member) => (
              <li
                key={member._id}
                className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {member.photoURL ? (
                    <img
                      src={member.photoURL}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-bold">
                      {member.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-600">
                    In {Math.ceil(member.daysLeft)} days
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Team Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joining Date</th>
              <th>Status</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, i) => (
              <tr key={member._id} className="hover:bg-white/10">
                <td className="sticky left-0 bg-white dark:bg-gray-900 z-10 px-4 py-2">
                  {i + 1}
                </td>
                <td>
                  {member.photoURL ? (
                    <img
                      src={member.photoURL}
                      alt={member.name}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                      {member.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                  {member.joiningDate
                    ? new Date(member.joiningDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <span
                    className={`badge ${
                      member.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {member.status || "active"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline btn-info"
                    onClick={() =>
                      alert(`Contact ${member.name} via email: ${member.email}`)
                    }
                  >
                    Contact
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeam;
