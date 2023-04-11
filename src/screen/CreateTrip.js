import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import { useAuth } from "../hooks/useAuth";
import useTrips from "../hooks/useTrips";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../components/Spinner/Spinner";
import FormContainer from "../components/FormContainer";

import { BDiv, Card, Button, Form } from "bootstrap-4-react";

const CreateTrip = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    carModel: "",
    carNumber: "",
    time: "",
    date: "",
    seats: 0,
  });
  const { currentUser } = useAuth();
  const { getCurrentUserFromFirestore } = useFirestore();
  const { addNewTrip, loading } = useTrips();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUserFromFirestore(currentUser, form, setForm);
  }, [currentUser]);

  let updateInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const createTrip = (e) => {
    e.preventDefault();
    const uid = uuidv4();
    addNewTrip(uid, form);
    navigate("/");
  };

  return (
    <FormContainer update={true}>
      {loading ? <Spinner /> : null}
      <Card
        shadow
        bg="light"
        rounded
        style={{ maxWidth: "500px" }}
        className="m-5"
      >
        <Card.Header>
          <div className="text-muted h3">Create your trip</div>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={createTrip}>
            <Form.Group>
              <label htmlFor="name">Name</label>
              <Form.Input
                type="text"
                placeholder="Name"
                name="name"
                required
                value={form.name}
                onChange={updateInput}
              />
            </Form.Group>
            <Form.Group>
              <label htmlFor="name">Email</label>
              <Form.Input
                type="text"
                placeholder="Email"
                name="email"
                required
                value={form.email}
                onChange={updateInput}
              />
            </Form.Group>
            <Form.Group>
              <label htmlFor="name">Phone number</label>
              <Form.Input
                type="tel"
                placeholder="phone"
                name="phone"
                required
                value={form.phone}
                onChange={updateInput}
              />
            </Form.Group>
            <BDiv className="row">
              <BDiv className="col-sm">
                <Form.Group>
                  <label htmlFor="name">Car model</label>
                  <Form.Input
                    type="text"
                    placeholder=""
                    name="carModel"
                    required
                    value={form.carModel}
                    onChange={updateInput}
                  />
                </Form.Group>
              </BDiv>
              <BDiv className="col-sm">
                <Form.Group>
                  <label htmlFor="name">Car Number</label>
                  <Form.Input
                    type="text"
                    placeholder=""
                    name="carNumber"
                    required
                    value={form.carNumber}
                    onChange={updateInput}
                  />
                </Form.Group>
              </BDiv>
            </BDiv>
            <BDiv className="row">
              <BDiv className="col-sm">
                <Form.Group>
                  <label htmlFor="name">From</label>
                  <Form.Input
                    type="text"
                    placeholder=""
                    name="from"
                    required
                    value={form.from}
                    onChange={updateInput}
                  />
                </Form.Group>
              </BDiv>
              <BDiv className="col-sm">
                <Form.Group>
                  <label htmlFor="name">To</label>
                  <Form.Input
                    type="text"
                    placeholder=""
                    name="to"
                    required
                    value={form.to}
                    onChange={updateInput}
                  />
                </Form.Group>
              </BDiv>
            </BDiv>
            <Form.Group>
              <label htmlFor="name">Date</label>
              <Form.Input
                type="date"
                placeholder=""
                name="date"
                required
                value={form.date}
                onChange={updateInput}
              />
            </Form.Group>
            <BDiv className="row">
              <BDiv className="col-sm">
                <Form.Group>
                  <label htmlFor="name">Time</label>
                  <Form.Input
                    type="time"
                    placeholder=""
                    name="time"
                    required
                    value={form.time}
                    onChange={updateInput}
                  />
                </Form.Group>
              </BDiv>
              <BDiv className="col-sm">
                <Form.Group>
                  <label htmlFor="name">Numder of seats</label>
                  <Form.Input
                    type="number"
                    placeholder=""
                    name="seats"
                    required
                    value={form.seats}
                    onChange={updateInput}
                  />
                </Form.Group>
              </BDiv>
            </BDiv>
            <Button
              type="submit"
              className="mb-3"
              warning
              lg
              style={{ width: "100%" }}
            >
              Create a trip
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default CreateTrip;
