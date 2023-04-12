import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useFirestore from "../hooks/useFirestore";
import { FaUserAlt } from "react-icons/fa";
import { GiCarSeat } from "react-icons/gi";

import { BDiv, Card, Button, Form } from "bootstrap-4-react";

const UserItem = ({ item, setUpdate, update }) => {
  const { name, email, phone, role } = item.data;
  const [checkbox, setCheckbox] = useState("user");
  const { currentUser } = useAuth();
  const { updateUserData } = useFirestore();

  useEffect(() => {
    setCheckbox(role);
  }, [item]);

  const handleClick = (e) => {
    e.preventDefault();
    if (currentUser) {
      updateUserData({
        uid: currentUser.uid,
        email: email,
        name: name,
        phoneNumber: phone,
        role: checkbox,
        id: item.id,
      }).then(() => setUpdate(!update));
    }
  };

  return (
    <BDiv className="col-12 col-md-6 col-lg-3 mt-4 hover">
      <Card.Body text="center " shadow style={{ minHeight: "300px" }}>
        {role === "user" ? (
          <FaUserAlt size="35px" className="mb-3 mt-3" />
        ) : (
          <GiCarSeat size="35px" className="mb-3 mt-3" />
        )}
        {name ? (
          <h3 className="word">{name}</h3>
        ) : (
          <h3 className=" text-muted">User Name</h3>
        )}
        {email ? (
          <BDiv className="mb-2 word">{email} </BDiv>
        ) : (
          <BDiv className="mb-2 text-muted">User email</BDiv>
        )}
        {phone ? (
          <BDiv className="mb-2 text-muted">{phone}</BDiv>
        ) : (
          <BDiv className="mb-2 text-muted">User phone</BDiv>
        )}
        <Form.Group>
          <Form.Check inline type="checkbox">
            <Form.Checkbox
              id="user"
              name="role"
              value="user"
              checked={checkbox === "user"}
              onChange={(e) => setCheckbox(e.target.value)}
            />
            <Form.CheckLabel htmlFor="user">User</Form.CheckLabel>
          </Form.Check>
          <Form.Check inline>
            <Form.Checkbox
              id="driver"
              name="role"
              value="driver"
              checked={checkbox === "driver"}
              onChange={(e) => setCheckbox(e.target.value)}
            />
            <Form.CheckLabel htmlFor="driver">Driver</Form.CheckLabel>
          </Form.Check>
        </Form.Group>
        <Button
          onClick={handleClick}
          type="submit"
          className="mb-3"
          w="100"
          warning
          lg
        >
          Update profile
        </Button>
      </Card.Body>
    </BDiv>
  );
};

export default UserItem;
