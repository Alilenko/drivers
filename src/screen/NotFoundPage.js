import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FormContainer from "../components/FormContainer";
import { Card, Button } from "bootstrap-4-react";

const NotFoundPage = ({ text }) => {
  const navigate = useNavigate();
  const user = useAuth();

  return (
    <FormContainer>
      <Card shadow bg="light" rounded style={{ maxWidth: "500px" }}>
        <Card.Body className="text-center">
          {text ? text : "Page not found"}
          {user?.currentUser === null ? (
            <Button
              onClick={() => navigate("/login")}
              warning
              lg
              w="100"
              className="mt-3"
            >
              Go to the login
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/")}
              warning
              lg
              w="100"
              className="mt-3"
            >
              Go to the main page
            </Button>
          )}
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default NotFoundPage;
