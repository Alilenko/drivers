import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import useFirestore from "./useFirestore";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addFirestore } = useFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return unSubscribe;
  }, []);

  const registerWithEmail = async (e, form, setForm) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((res) => {
        addFirestore({
          email: res.user.email,
          name: res.user.displayName,
          phoneNumber: res.user.phoneNumber,
          uid: res.user.uid,
          role: "user",
        });
        setForm({
          name: "",
          email: "",
          password: "",
        });
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong");
        console.log(err);
      });
    setLoading(false);
  };

  const loginWithEmail = async (e, form, setForm) => {
    e.preventDefault();
    setLoading(true);
    await signInWithEmailAndPassword(auth, form.email, form.password)
      .then(() => {
        setForm({
          email: "",
          password: "",
        });
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong");
        console.log(e);
      });
  };

  const loginWithGoogle = async () => {
    setError("");
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        addFirestore({
          email: res.user.email,
          name: res.user.displayName,
          phoneNumber: res.user.phoneNumber,
          uid: res.user.uid,
          role: "user",
        });
        setLoading(false);
        navigate("/");
      })
      .catch((e) => {
        setLoading(false);
        setError("Something went wrong");
        console.log(e);
      });
  };

  const loginWithFacebook = () => {
    setError("");
    setLoading(true);
    signInWithPopup(auth, facebookProvider)
      .then((res) => {
        addFirestore({
          email: res.user.email,
          name: res.user.displayName,
          phoneNumber: res.user.phoneNumber,
          uid: res.user.uid,
          role: "user",
        });
        setLoading(false);
        navigate("/");
      })
      .catch((e) => {
        setLoading(false);
        setError("Something went wrong");
        console.log(e);
      });
  };

  return {
    currentUser,
    loading,
    error,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    loginWithFacebook,
  };
}
