import React, { useState } from "react";
import { db } from "../firebase";
import {
  getDocs,
  addDoc,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";

const useFirestore = () => {
  let items = [];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.forEach((doc) => {
      items.push({ data: doc.data(), id: doc.id });
    });
  };

  const getUser = async (uid) => {
    await getItems();
    return items.filter((item) => item.data.uid === uid);
  };

  const addFirestore = async ({ email, name, phoneNumber, uid, role }) => {
    await getItems();
    const find = items.filter((item) => item.data.uid === uid);
    if (find.length == 0) {
      const docRef = await addDoc(collection(db, "users"), {
        uid,
        email: email || "",
        name: name || "",
        phone: phoneNumber || "",
        role: role || "user",
      });
    }
    return find;
  };

  const updateUserData = async ({
    email,
    name,
    phoneNumber,
    uid,
    role,
    id,
  }) => {
    await getItems();
    const find = items.filter((item) => item.data.uid === uid);
    if (find.length > 0) {
      const userDoc = doc(db, "users", id);
      console.log(userDoc);
      const update = await updateDoc(userDoc, {
        email: email || "",
        name: name || "",
        phone: phoneNumber || "",
        role: role || "user",
      })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    }
  };

  const getCurrentUserFromFirestore = (currentUser, form, setForm) => {
    setLoading(true);
    if (currentUser) {
      getUser(currentUser.uid)
        .then((res) => {
          setForm({
            ...form,
            name: res[0].data.name || "",
            email: res[0].data.email || "",
            phone: res[0].data.phone || "",
          });
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setError("Something went wrong");
          console.log(e);
        });
    }
    setLoading(false);
  };

  return {
    items,
    getUser,
    addFirestore,
    updateUserData,
    getCurrentUserFromFirestore,
    loading,
    error,
  };
};

export default useFirestore;
