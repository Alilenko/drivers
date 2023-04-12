import React from "react";
import { NavLink } from "react-router-dom";
import { BDiv } from "bootstrap-4-react";

const AdminNavLink = () => {
  return (
    <BDiv display="flex" justifyContent="center">
      <NavLink
        to="/admin/user"
        className="col p-4"
        w="50"
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            textAlign: "right",
            color: isActive ? "rgba(255, 165, 0, 1) " : "black",
            borderBottom: isActive
              ? "rgba(255, 165, 0, 0.4) 1px solid"
              : "#fff 1px solid",
            textDecoration: "none",
          };
        }}
      >
        User
      </NavLink>
      <NavLink
        to="/admin/trips"
        className="col p-4"
        w="50"
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isActive ? "rgba(255, 165, 0, 1) " : "black",
            borderBottom: isActive
              ? "rgba(255, 165, 0, 0.4) 1px solid"
              : "#fff 1px solid",
            textDecoration: "none",
          };
        }}
      >
        Trips
      </NavLink>
    </BDiv>
  );
};

export default AdminNavLink;
