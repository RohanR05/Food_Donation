import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase";
import { AuthContext } from "./AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleUser = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const userInfo = {
          name: currentUser.displayName || "No Name",
          email: currentUser.email,
        };

        try {
          await axiosSecure.post("/users", userInfo);
        } catch (err) {
          console.error("❌ Failed to add user to DB:", err);
        }
      }
    });

    return () => {
      unSubscribe();
    };
  }, [axiosSecure]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    googleUser,
    createUser,
    signIn,
    updateUserProfile,
    logOut,
  };

  return (
    <div>
      <AuthContext value={authInfo}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
