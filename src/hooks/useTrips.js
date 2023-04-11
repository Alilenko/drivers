import { db } from "../firebase";
import {
  getDocs,
  addDoc,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";

const useTrips = () => {
  let trips = [];

  const getTrips = async () => {
    const querySnapshot = await getDocs(collection(db, "trips"));
    querySnapshot.forEach((doc) => {
      trips.push({ data: doc.data(), id: doc.id });
    });
  };

  const addNewTrip = async (uid, form) => {
    await getTrips();
    const find = trips.filter((item) => item.uid === uid);

    const t = `${form.date}, ${form.time}`;
    const timestamp = new Date(t).getTime();
    if (find.length == 0) {
      const docRef = await addDoc(collection(db, "trips"), {
        ...form,
        timestamp,
        uid,
      });
    }
    return find;
  };

  const deleteTrips = async (uid) => {
    const tripDoc = doc(db, "trips", uid);
    await deleteDoc(tripDoc);
  };

  return { trips, getTrips, addNewTrip, deleteTrips };
};

export default useTrips;
