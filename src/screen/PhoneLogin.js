import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import useFirestore from "../hooks/useFirestore";
import FormContainer from "../components/FormContainer";
import Spinner from "../components/Spinner/Spinner";
import { Form, Card, Button } from "bootstrap-4-react";

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [veryfiCode, setVeryfiCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const navigate = useNavigate();
  const { addFirestore } = useFirestore();
  const [error, setError] = useState("");

  const generateRecapcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  const requestOTP = (e) => {
    e.preventDefault();
    setError("");
    if (phone.length >= 12) {
      setLoading(true);
      generateRecapcha();
      let appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, phone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowVerify(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError("Something went wrong");
        });
    } else {
      setError("Wrong number format");
    }
  };

  const verifyCode = (e) => {
    setError("");
    e.preventDefault();
    setLoading(true);
    window.confirmationResult
      .confirm(veryfiCode)
      .then(async (res) => {
        addFirestore({
          email: res.user.email,
          name: res.user.displayName,
          phoneNumber: res.user.phoneNumber,
          uid: res.user.uid,
          role: "user",
        });
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Something went wrong");
      });
  };

  return (
    <FormContainer>
      <Card shadow bg="light" rounded style={{ maxWidth: "500px" }}>
        <Card.Body>
          <Form>
            {loading ? <Spinner /> : null}
            <div id="recaptcha-container"></div>
            <Form.Group>
              <label htmlFor="name">Phone</label>

              <Form.Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                required
                className="mb-3"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Form.Text text="muted">Format +380 </Form.Text>
            </Form.Group>
            <Button
              warning
              lg
              w="100"
              disabled={showVerify}
              className="mb-3"
              onClick={requestOTP}
            >
              Send sms
            </Button>
            {showVerify ? (
              <>
                <Form.Input
                  type="number"
                  id="code"
                  placeholder="Enter code"
                  name="code"
                  required
                  className="mb-3"
                  value={veryfiCode}
                  onChange={(e) => setVeryfiCode(e.target.value)}
                />
                <Button
                  warning
                  lg
                  w="100"
                  className="mb-3"
                  onClick={verifyCode}
                >
                  Verify
                </Button>
              </>
            ) : null}
            {error ? <Form.Text text="danger">{error}</Form.Text> : null}
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default PhoneLogin;
