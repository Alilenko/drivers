import React, { useState, useRef } from "react";
import { Button, Card, Form } from "bootstrap-4-react";

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  zIndex: 2,
  transition: "all 300ms",
};

const customStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
};

const ModalComponent = ({ setModal, addPas }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  let updateInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addPas(form);
    setModal(false);
  };

  return (
    <>
      <div style={modalStyle} onClick={(e) => setModal(false)}>
        <div style={customStyles} onClick={(e) => e.stopPropagation()}>
          <Card shadow rounded style={{ maxWidth: "500px", minWidth: "320px" }}>
            <Card.Body>
              <Form>
                <Form.Group>
                  <label htmlFor="name">Full name</label>
                  <Form.Input
                    type="text"
                    id="name"
                    placeholder="Enter name and surname"
                    name="name"
                    required
                    value={form.name}
                    onChange={updateInput}
                  />
                </Form.Group>

                <Form.Group>
                  <label htmlFor="email">Phone number</label>
                  <Form.Input
                    type="phone"
                    id="phone"
                    placeholder="Enter phone number"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={updateInput}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="mb-3"
                  warning
                  lg
                  style={{ width: "100%" }}
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                >
                  Book trip
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
