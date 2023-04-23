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
  let passegersArr = [];

  const getTrips = async () => {
    const querySnapshot = await getDocs(collection(db, "trips"));
    querySnapshot.forEach((doc) => {
      trips.push({ data: doc.data(), id: doc.id });
    });
  };
  const getPassengers = async (id) => {
    const querySnapshot = await getDocs(
      collection(db, "trips", id, "passengers")
    );
    return querySnapshot.forEach((doc) => {
      passegersArr.push({ data: doc.data(), id: doc.id });
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
        passengers: [],
      });
    }
    return find;
  };

  const addPassenger = async (id, passengerData) => {
    await getTrips();
    const find = trips.filter((item) => item.id == id);
    if (find.length > 0) {
      await getPassengers(id);
      const check = passegersArr.filter(
        (item) => item.data.uid == passengerData.uid
      );
      console.log(find[0].data.seats);
      if (check.length < 1 && passegersArr.length < find[0].data.seats) {
        await addDoc(collection(db, "trips", id, "passengers"), passengerData);
      } else {
        console.log("user exist");
      }
    }
  };

  const deleteTrips = async (uid) => {
    const tripDoc = doc(db, "trips", uid);
    await deleteDoc(tripDoc);
  };

  return {
    trips,
    passegersArr,
    getTrips,
    getPassengers,
    addNewTrip,
    deleteTrips,
    addPassenger,
  };
};

export default useTrips;
