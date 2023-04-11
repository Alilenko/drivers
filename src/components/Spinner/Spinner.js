import React from "react";
import spinner from "./spinner.svg";

const Spinner = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "4",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img style={{ width: "100px" }} src={spinner} alt="spinner" />
      </div>
    </div>
  );
};

export default Spinner;
