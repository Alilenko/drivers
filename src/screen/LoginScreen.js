import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserForm from "../components/Form";
import FormContainer from "../components/FormContainer";
import Spinner from "../components/Spinner/Spinner";

import { Card, Button } from "bootstrap-4-react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsFillTelephoneFill } from "react-icons/bs";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { loading, error, loginWithEmail, loginWithGoogle, loginWithFacebook } =
    useAuth();

  let updateInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onClick = () => {
    navigate("/phone");
  };

  return (
    <FormContainer>
      <Card shadow bg="light" rounded style={{ maxWidth: "500px" }}>
        <Card.Header>
          <div className="text-muted h3">Login</div>
        </Card.Header>

        <Card.Body>
          {loading ? <Spinner /> : null}
          <UserForm
            form={form}
            updateInput={updateInput}
            submitForm={(e) => loginWithEmail(e, form, setForm)}
            buttonText="Login"
          />
          <Button light lg onClick={loginWithGoogle} w="100" className="mb-3">
            <FcGoogle fontSize={21} className="mr-2" />
            Login with Google
          </Button>
          <Button light lg onClick={loginWithFacebook} w="100" className="mb-3">
            <BsFacebook fontSize={21} className="mr-2" />
            Login with Facebook
          </Button>
          <Button light lg onClick={onClick} w="100" className="mb-3">
            <BsFillTelephoneFill fontSize={21} className="mr-2" />
            Login with phone number
          </Button>
          {error ? (
            <div className="text-danger text-center m-2">{error}</div>
          ) : null}
          <div className="text-muted ml-2">
            Don't have an account?
            <Link className="ml-2" to="/signup">
              Sign up
            </Link>
          </div>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default LoginScreen;
