// import { useEffect, useState } from "react";
// import useAuth from "./useAuth";
// import useAxios from "./useAxios";


// const useRole = () => {
//   const { user } = useAuth();
//   const axios = useAxios()
//   const [role, setRole] = useState("user");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchRole = async () => {
//       setIsLoading(true);
//       try {
//         const res = await axios.get(`/users/${user.email}`);
//         setRole(res.data?.role || "user");
//         console.log("Fetched role:", res.data?.role || "user");
//       } catch (err) {
//         console.error(err);
//         setRole("user");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRole();
//   }, [user?.email, axios]); // ✅ role remove

//   return { role, isLoading };
// };

// export default useRole;




import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRole = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/users/${user.email}`, {
          headers: { "Cache-Control": "no-cache" }, // 🔹 এখানে
        });
        setRole(res.data?.role || "user");
        console.log("Fetched role:", res.data?.role || "user");
      } catch (err) {
        console.error(err);
        setRole("user");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [user?.email, axios]);

  return { role, isLoading };
};

export default useRole;

