import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from "../context/AuthContext";
const NavBar = () => {
  const {user,logOut}=useContext(AuthContext)

  return (
    <Navbar  className="bg-body-tertiary" bg="light-dark" data-bs-theme="light">
    <Container>
      {user&&(      <span style={{ fontWeight: "bold", marginRight: "10px" }}>Welcome {user ? user.name : ""}</span>)}

      <Navbar.Collapse className="justify-content-end"> {/* Keep justify-content-end */}
        <Nav>
          {user&& (<Nav.Link onClick={()=>logOut()} href="login" style={{ color: 'white' }}>Logout</Nav.Link>
)}
{!user&& (<>
           <Nav.Link href="register" style={{ color: 'white' }}>Register</Nav.Link>
          <Nav.Link href="login" style={{ color: 'white' }}>Login</Nav.Link>
          </>
)}
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
  
  );
};

export default NavBar;