import { BDiv } from "bootstrap-4-react";

const FormContainer = ({ children, update }) => {
  return (
    <BDiv
      w="100"
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={update ? { height: "auto" } : { height: "100vh" }}
    >
      {children}
    </BDiv>
  );
};

export default FormContainer;
