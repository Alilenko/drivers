import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useTrips from "../hooks/useTrips";
import useFirestore from "../hooks/useFirestore";
import UserItem from "../components/UserItem";
import TripItem from "../components/TripItem";
import Spinner from "../components/Spinner/Spinner";

import { Container, BDiv, Button } from "bootstrap-4-react";
import AdminNavLink from "../components/AdminNavLink";
import { BsDatabase } from "react-icons/bs";

const AdminTripsPage = () => {
  const [list, setList] = useState([]);
  const { trips, getTrips } = useTrips();
  const { items, getUser, loading } = useFirestore();
  const [update, setUpdate] = useState(false);
  const today = Date.now();

  useEffect(() => {
    getTrips().then(() => setList(trips));
  }, [update]);

  return (
    <Container>
      {loading ? <Spinner /> : null}
      <AdminNavLink />
      <BDiv
        display="flex"
        justifyContent="center"
        mt="2"
        style={{ flexWrap: "wrap" }}
      >
        {list
          .filter((trip) => trip.data.timestamp > today)
          .sort(function (a, b) {
            return a.data.timestamp - b.data.timestamp;
          })
          .map((item) => (
            <TripItem
              key={item.id}
              item={item}
              admin
              update={update}
              setUpdate={setUpdate}
            />
          ))}
      </BDiv>
      {list.length ? (
        <h4 className="m-3 border-bottom p-2 text-muted">Past trips</h4>
      ) : null}
      <BDiv
        display="flex"
        justifyContent="center"
        mt="2"
        style={{ flexWrap: "wrap" }}
      >
        {list
          .filter((trip) => trip.data.timestamp < today)
          .sort(function (a, b) {
            return a.data.timestamp - b.data.timestamp;
          })
          .map((item) => (
            <TripItem key={item.id} item={item} admin />
          ))}
      </BDiv>
    </Container>
  );
};

export default AdminTripsPage;
