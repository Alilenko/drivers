import React from "react";
import moment from "moment";
import useTrips from "../hooks/useTrips";

import { Button, BDiv, Card } from "bootstrap-4-react";
import { AiFillCar } from "react-icons/ai";
import { BsArrowRight, BsTrashFill } from "react-icons/bs";

const TripItem = ({ item, admin, update, setUpdate }) => {
  const { deleteTrips } = useTrips();
  const { name, from, to, time, timestamp, carModel, seats } = item.data;

  const deleteTrip = () => {
    deleteTrips(item.id).then(() => setUpdate(!update));
  };

  return (
    <BDiv className="col-12 col-md-6 col-lg-3 mt-4">
      <Card.Body className=" text-center" shadow>
        <AiFillCar className="col" size="70px" />
        <Card.Title className="card-title word">
          <strong>{name}</strong>
        </Card.Title>
        <BDiv className="row font-weight-bold text-muted">
          <BDiv className="col word">{from}</BDiv>
          <BsArrowRight className="col" />
          <BDiv className="col word">{to}</BDiv>
        </BDiv>
        <BDiv className="row">
          <BDiv className="col">
            <h5>{moment(timestamp).format("D MMMM")}</h5>
          </BDiv>
          <BDiv className="col">
            <h5>{time}</h5>{" "}
          </BDiv>
        </BDiv>
        <BDiv className="font-weight-bold word"> {carModel}</BDiv>
        <BDiv className=" text-muted">Number of seats: {seats}</BDiv>

        {admin ? (
          <Button
            warning
            lg
            w="100"
            className="mt-3"
            onClick={() => deleteTrip()}
          >
            <BsTrashFill size="20px" />
          </Button>
        ) : (
          <Button warning lg w="100" className="mt-3">
            Book a trip
          </Button>
        )}
      </Card.Body>
    </BDiv>
  );
};

export default TripItem;
