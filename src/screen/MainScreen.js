import React, { useEffect, useState } from "react";
import useTrips from "../hooks/useTrips";
import TripItem from "../components/TripItem";

import { Container, BDiv } from "bootstrap-4-react";
import Spinner from "../components/Spinner/Spinner";

const MainScreen = () => {
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(false);
  const { trips, getTrips, loading } = useTrips();

  useEffect(() => {
    getTrips().then(() => setList(trips));
  }, [update]);

  const today = Date.now();

  return (
    <>
      <Container>
        {loading ? <Spinner /> : null}
        <BDiv className="row ">
          {list
            .filter((trip) => trip.data.timestamp > today)
            .sort(function (a, b) {
              return a.data.timestamp - b.data.timestamp;
            })
            .map((item) => (
              <TripItem
                key={item.id}
                item={item}
                setUpdate={setUpdate}
                update={update}
              />
            ))}
        </BDiv>
      </Container>
    </>
  );
};

export default MainScreen;
