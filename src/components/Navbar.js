import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { GoSignOut } from "react-icons/go";
import { Collapse, BDiv, Navbar, Nav, Button } from "bootstrap-4-react";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar light bg="light">
        <Navbar.Toggler target="#navbarToggleExternalContent" />
        <BDiv pr="4">
          <GoSignOut onClick={logout} size="25" color="rgb(51, 51, 51, 0.8)" />
        </BDiv>
      </Navbar>
      <Collapse id="navbarToggleExternalContent">
        <BDiv light="true" bg="light" p="4">
          <Navbar.Nav mr="auto">
            <Nav.Item active>
              <Button light>
                <Link style={{ color: "#000", textDecoration: "none" }} to="/">
                  Home
                </Link>
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Button light>
                <Link
                  style={{ color: "#000", textDecoration: "none" }}
                  to="/profile"
                >
                  Profile
                </Link>
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Button light>
                <Link
                  style={{ color: "#000", textDecoration: "none" }}
                  to="/create"
                >
                  Create a trip
                </Link>
              </Button>
            </Nav.Item>
          </Navbar.Nav>
        </BDiv>
      </Collapse>
    </>
  );
};

export default NavbarComponent;
