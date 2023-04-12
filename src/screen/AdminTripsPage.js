import React, { useEffect, useState } from "react";
import useTrips from "../hooks/useTrips";
import TripItem from "../components/TripItem";
import Spinner from "../components/Spinner/Spinner";
import AdminNavLink from "../components/AdminNavLink";
import { Container, BDiv } from "bootstrap-4-react";

const AdminTripsPage = () => {
  const [list, setList] = useState([]);
  const { trips, getTrips, loading } = useTrips();
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
