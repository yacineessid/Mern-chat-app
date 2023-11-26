import { Alert, Button } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { Form, } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
  
const{login,loginError,loginLoading,loginInfo,updateLoginInfo}=useContext(AuthContext)
 

  return (
    <Form onSubmit={login} className="registration-form">
    <h2>Login</h2>
    <Form.Group className="mb-3">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter your email" onChange={(e)=>updateLoginInfo({...loginInfo, email: e.target.value})}  />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Enter your password" onChange={(e)=>updateLoginInfo({...loginInfo, password: e.target.value})} />
    </Form.Group>
    <Button type="submit" className="btn btn-primary">
      {loginLoading?'Getting you in ...' :"Login"}
    </Button>
    {
  loginError?.error && (
    <Alert variant="danger"><p>{loginError.message}</p></Alert>
  )
}
  </Form>
);
}

export default Login;