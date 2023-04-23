import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import useTrips from "../hooks/useTrips";
import { useAuth } from "../hooks/useAuth";
import { AiFillCar } from "react-icons/ai";
import { BsArrowRight, BsTrashFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import ModalComponent from "./reusable/Modal";

import { Button, BDiv, Card } from "bootstrap-4-react";

const TripItem = ({ item, admin, update, setUpdate }) => {
  const { passegersArr, deleteTrips, addPassenger, getPassengers } = useTrips();
  const { name, from, to, time, timestamp, carModel, seats } = item.data;
  const { currentUser } = useAuth();
  const [pasArr, setPasArr] = useState([]);
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    getPassengers(item.id).then(() => setPasArr(passegersArr));
  }, [item]);

  const deleteTrip = () => {
    deleteTrips(item.id).then(() => setUpdate(!update));
  };

  const addPas = (form) => {
    const passengerData = {
      email: currentUser.email,
      name: form.name || currentUser.displayName,
      phone: form.phone || currentUser.phoneNumber,
      photo: currentUser.photoURL,
      uid: currentUser.uid,
    };
    addPassenger(item.id, passengerData)
      .then((res) => {
        setUpdate(!update);
      })
      .catch((e) => console.log(e));
  };

  return (
    <BDiv className="col-12 col-md-6 col-lg-3 mt-4 hover ">
      <Card.Body
        className=" text-center d-flex flex-column h-100 justify-content-betwen align-items-center"
        shadow
      >
        <AiFillCar size="70px" />
        <Card.Title className="card-title word">
          <strong>{name}</strong>
        </Card.Title>
        <BDiv alignItems="center" className="row font-weight-bold text-muted">
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
        {pasArr.length ? (
          <div>
            {pasArr.length ? (
              <BDiv className=" font-weight-bold">Passengers:</BDiv>
            ) : null}
            {pasArr.map((item) => (
              <div
                className="row justify-content-center align-items-center mt-1"
                key={item.id}
              >
                <FaUser className=" mr-2" />
                <span className=" text-muted ">
                  {item.data.name || item.data.email}
                </span>
              </div>
            ))}
          </div>
        ) : null}
        <div
          className="d-flex justify-content-end align-items-end"
          style={{ flex: "1 0 auto" }}
        >
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
            <Button
              warning
              disabled={pasArr.length >= seats}
              lg
              w="100"
              className=" mt-3 "
              onClick={() => setModal(true)}
            >
              Book a trip
            </Button>
          )}
        </div>
      </Card.Body>
      {isModal ? (
        <Portal>
          <ModalComponent
            setModal={setModal}
            isModal={isModal}
            addPas={addPas}
          />
        </Portal>
      ) : null}
    </BDiv>
  );
};

const Portal = (props) => {
  const node = document.createElement("div");
  document.body.appendChild(node);
  return ReactDOM.createPortal(props.children, node);
};

export default TripItem;
