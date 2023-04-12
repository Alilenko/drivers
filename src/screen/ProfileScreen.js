import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useFirestore from "../hooks/useFirestore";
import FormContainer from "../components/FormContainer";
import Spinner from "../components/Spinner/Spinner";

import { Card, Button, Form } from "bootstrap-4-react";

const ProfileScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { getUser, updateUserData } = useFirestore();

  useEffect(() => {
    setLoading(true);
    if (currentUser) {
      getUser(currentUser.uid)
        .then((res) => {
          setForm({
            name: res[0].data.name || "",
            email: res[0].data.email || "",
            phone: res[0].data.phone || "",
            role: res[0].data.role || "user",
            id: res[0].id,
          });
        })
        .catch((e) => console.log(e));
    }
    setLoading(false);
  }, [currentUser]);

  let updateInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (currentUser) {
      updateUserData({
        uid: currentUser.uid,
        email: form.email,
        name: form.name,
        phoneNumber: form.phone,
        role: form.role,
        id: form.id,
      });
    }
  };

  return (
    <FormContainer update={true}>
      <Card
        shadow
        bg="light"
        rounded
        style={{ maxWidth: "500px" }}
        className="m-5"
      >
        <Card.Header>
          <div className="text-muted h3">Update your profile</div>
        </Card.Header>

        <Card.Body>
          {loading ? <Spinner /> : null}
          <>
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

            <Form.Group>
              <Form.Check inline onChange={updateInput}>
                <Form.Radio
                  id="exampleRadios1"
                  name="role"
                  value="user"
                  checked={form.role === "user"}
                  onChange={updateInput}
                />
                <Form.CheckLabel htmlFor="defaultCheck1">User</Form.CheckLabel>
              </Form.Check>
              <Form.Check inline>
                <Form.Radio
                  id="exampleRadios2"
                  name="role"
                  value="driver"
                  checked={form.role === "driver"}
                  onChange={updateInput}
                />
                <Form.CheckLabel htmlFor="defaultCheck2">
                  Driver
                </Form.CheckLabel>
              </Form.Check>
            </Form.Group>
            <Button
              type="submit"
              className="mb-3"
              warning
              lg
              style={{ width: "100%" }}
              onClick={handleClick}
            >
              Update profile
            </Button>
          </>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default ProfileScreen;
