import React, { useEffect, useState } from "react";
import useTrips from "../hooks/useTrips";
import TripItem from "../components/TripItem";

import { Container, BDiv } from "bootstrap-4-react";

const MainScreen = () => {
  const [list, setList] = useState([]);
  const { trips, getTrips } = useTrips();

  useEffect(() => {
    getTrips().then(() => setList(trips));
  }, []);

  const today = Date.now();

  return (
    <Container>
      <BDiv className="row">
        {list
          .filter((trip) => trip.data.timestamp > today)
          .sort(function (a, b) {
            return a.data.timestamp - b.data.timestamp;
          })
          .map((item) => (
            <TripItem key={item.id} item={item} />
          ))}
      </BDiv>
    </Container>
  );
};

export default MainScreen;
