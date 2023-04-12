import React, { useEffect, useState } from "react";
import useTrips from "../hooks/useTrips";
import useFirestore from "../hooks/useFirestore";
import UserItem from "../components/UserItem";
import { NavLink } from "react-router-dom";

import { Container, BDiv, Button } from "bootstrap-4-react";
import AdminNavLink from "../components/AdminNavLink";

const AdminScreen = () => {
  const [list, setList] = useState([]);
  const { trips, getTrips } = useTrips();
  const { items, getUser } = useFirestore();
  const [update, setUpdate] = useState(false);
  const today = Date.now();

  useEffect(() => {
    //getTrips().then(() => setList(trips));
    getUser().then(() => setList(items));
  }, [update]);

  return (
    <Container>
      <AdminNavLink />
      <BDiv className="row">
        {list.map((item) => (
          <UserItem
            key={item.id}
            item={item}
            setUpdate={setUpdate}
            update={update}
          />
        ))}
      </BDiv>

      {/*      <BDiv
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
      <h4 classNameNameName="m-3 border-bottom p-2 text-muted">Past trips</h4>
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
          </BDiv>*/}
    </Container>
  );
};

export default AdminScreen;