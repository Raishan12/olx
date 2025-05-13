// OLXLogin.js
import React, { useState } from "react";
import Auth0 from "auth0-js";

const auth0 = new Auth0.WebAuth({
  domain: "YOUR_AUTH0_DOMAIN",
  clientID: "YOUR_AUTH0_CLIENT_ID",
});

const OLXLogin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [step, setStep] = useState("input"); // "input" or "verify"
  const [code, setCode] = useState("");

  const handleSendCode = () => {
    const isPhone = /^\+?\d+$/.test(emailOrPhone);
    const payload = isPhone
      ? {
          connection: "sms",
          send: "code",
          phoneNumber: emailOrPhone,
        }
      : {
          connection: "email",
          send: "code",
          email: emailOrPhone,
        };

    auth0.passwordlessStart(payload, (err) => {
      if (err) {
        alert("Failed to send code: " + err.description);
      } else {
        setStep("verify");
      }
    });
  };

  const handleVerifyCode = () => {
    const isPhone = /^\+?\d+$/.test(emailOrPhone);
    const payload = isPhone
      ? {
          connection: "sms",
          phoneNumber: emailOrPhone,
          verificationCode: code,
        }
      : {
          connection: "email",
          email: emailOrPhone,
          verificationCode: code,
        };

    auth0.passwordlessLogin(payload, (err, res) => {
      if (err) {
        alert("Verification failed: " + err.description);
      } else {
        console.log("Login success!", res);
        // Save token or redirect
      }
    });
  };

  return (
    <div style={styles.popup}>
      <h2>Login to OLX</h2>
      {step === "input" ? (
        <>
          <input
            style={styles.input}
            placeholder="Enter phone or email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
          <button style={styles.button} onClick={handleSendCode}>
            Send OTP
          </button>
        </>
      ) : (
        <>
          <p>Enter the code sent to {emailOrPhone}</p>
          <input
            style={styles.input}
            placeholder="Enter OTP"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button style={styles.button} onClick={handleVerifyCode}>
            Verify & Login
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  popup: {
    width: 300,
    margin: "100px auto",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    fontFamily: "Arial",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    backgroundColor: "#002f34", // OLX color
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default OLXLogin;
