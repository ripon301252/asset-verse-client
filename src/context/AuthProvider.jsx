import React, { useEffect, useState } from "react";
import { auth } from "../firebase.init";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // create user
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  // signIn/Login
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  // Google signin
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  // update user
  const updateUserProfile = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData).finally(() =>
      setLoading(false)
    );
  };

  // signOut/LogOut
  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  // reset password
  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // observer (persistent login logic)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // Save companyName in localStorage if HR
      if (currentUser?.email) {
        fetch(
          `https://asset-verse-server-alpha.vercel.app/users/${currentUser.email}/role`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.role === "hr") {
              // Backend থেকে companyName নিতে হবে
              fetch(
                `https://asset-verse-server-alpha.vercel.app/users/${currentUser.email}`
              )
                .then((res) => res.json())
                .then((userData) => {
                  localStorage.setItem(
                    "companyName",
                    userData.companyName || ""
                  );
                });
            }
          });
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // show loader while user data is loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const authInfo = {
    user,
    setUser,
    registerUser,
    logOut,
    signInUser,
    updateUserProfile,
    signInGoogle,
    passwordReset,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
