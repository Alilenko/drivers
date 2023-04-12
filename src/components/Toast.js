import React, { useState } from "react";
import { BDiv } from "bootstrap-4-react";

const Toast = ({ text, active }) => {
  return (
    <BDiv
      p="3"
      rounded
      style={{
        position: "absolute",
        bottom: active ? 60 : -10,
        left: 40,
        backgroundColor: "rgba(255, 165, 0, 0.4)",
        opacity: active ? "1" : 0,
        transition: "all .5s ease-out",
      }}
    >
      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-body">{text}</div>
      </div>
    </BDiv>
  );
};

export default Toast;
