import React, { useEffect, useState } from "react";
import useTrips from "../hooks/useTrips";
import TripItem from "../components/TripItem";

import { Container, BDiv } from "bootstrap-4-react";

const AdminScreen = () => {
  const [list, setList] = useState([]);
  const { trips, getTrips } = useTrips();
  const today = Date.now();

  useEffect(() => {
    getTrips().then(() => setList(trips));
  }, []);

  return (
    <Container>
      <BDiv
        display="flex"
        justifyContent="center"
        mt="2"
        style={{ flexWrap: "wrap", gap: "20px" }}
      >
        {list
          .filter((trip) => trip.data.timestamp > today)
          .sort(function (a, b) {
            return a.timestamp - b.timestamp;
          })
          .map((item) => (
            <TripItem key={item.id} item={item} admin />
          ))}
      </BDiv>
      <h4 className="m-3 border-bottom p-2 text-muted">Past trips</h4>
      <BDiv
        display="flex"
        justifyContent="center"
        mt="2"
        style={{ flexWrap: "wrap", gap: "20px" }}
      >
        {list
          .filter((trip) => trip.data.timestamp < today)
          .sort(function (a, b) {
            return a.timestamp - b.timestamp;
          })
          .map((item) => (
            <TripItem key={item.id} item={item} admin />
          ))}
      </BDiv>
    </Container>
  );
};

export default AdminScreen;
