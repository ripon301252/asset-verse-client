import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  const { user, logOut} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use((response) =>{
        return response;
    }, (err)=>{
        console.log(err)

        const statusCode = err.status;
        if(statusCode === 401 || statusCode === 403){
            logOut().then(()=>{
                navigate('/login')
            })
        }

        return Promise.reject(err)
    })

    return()=>{
        axiosSecure.interceptors.request.eject(reqInterceptor);
        axiosSecure.interceptors.response.eject(resInterceptor);
    }
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;





// import { useEffect } from "react";
// import axios from "axios";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router";

// axios instance MUST be outside hook (important!)
// const axiosSecure = axios.create({
//   baseURL: "http://localhost:3000/",
// });

// const useAxiosSecure = () => {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // REQUEST interceptor
//     const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
//       if (user?.accessToken) {
//         config.headers.Authorization = `Bearer ${user.accessToken}`;
//       }
//       return config;
//     });

//     // RESPONSE interceptor
//     const resInterceptor = axiosSecure.interceptors.response.use(
//       (response) => response,
//       (err) => {
//         const statusCode = err?.response?.status;

//         if (statusCode === 401 || statusCode === 403) {
//           logOut().then(() => navigate("/login"));
//         }

//         return Promise.reject(err);
//       }
//     );

//     // CLEANUP → eject properly
//     return () => {
//       axiosSecure.interceptors.request.eject(reqInterceptor);
//       axiosSecure.interceptors.response.eject(resInterceptor);
//     };
//   }, [user?.accessToken, logOut, navigate]);

//   return axiosSecure;
// };

// export default useAxiosSecure;
