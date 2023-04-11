import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};

export default RootLayout;
