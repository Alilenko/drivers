import { BDiv } from "bootstrap-4-react";

const FormContainer = ({ children, update }) => {
  return (
    <BDiv
      w="100"
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={
        update
          ? { height: "auto", position: "relative" }
          : { height: "100vh", position: "relative" }
      }
    >
      {children}
    </BDiv>
  );
};

export default FormContainer;
