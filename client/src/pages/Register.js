import { Alert, Button } from "react-bootstrap";
import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    postRegister,
    registerLoading,
    registerError,
  
  } = useContext(AuthContext);
  return (
    <Form onSubmit={postRegister} className="registration-form">
      <h2>Register</h2>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your username"
          onChange={(e) =>
            updateRegisterInfo({ ...registerInfo, name: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          onChange={(e) =>
            updateRegisterInfo({ ...registerInfo, email: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          onChange={(e) =>
            updateRegisterInfo({ ...registerInfo, password: e.target.value })
          }
        />
      </Form.Group>

      <Button type="submit" className="btn btn-primary">
        {registerLoading ? "Creating your account" : "Register"}
      </Button>
      {
  registerError?.error && (
    <Alert variant="danger"><p>{registerError.error}</p></Alert>
  )
}

        
    </Form>
  );
};

export default Register;
