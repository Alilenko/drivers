import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FormContainer from "../components/FormContainer";
import UserForm from "../components/Form";
import Spinner from "../components/Spinner/Spinner";
import { Card } from "bootstrap-4-react";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, error, registerWithEmail } = useAuth();

  let updateInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <FormContainer>
      <Card shadow bg="light" rounded style={{ maxWidth: "500px" }}>
        <Card.Header>
          <div className="text-muted h3">Sign Up</div>
        </Card.Header>
        {loading ? <Spinner /> : null}
        {error ? error : null}
        <Card.Body>
          <UserForm
            form={form}
            updateInput={updateInput}
            submitForm={(e) => registerWithEmail(e, form, setForm)}
            buttonText="Sign Up"
          />
          <div className="text-muted ml-2">
            Already have an account?
            <Link className="ml-2" to="/login">
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default SignUpScreen;
