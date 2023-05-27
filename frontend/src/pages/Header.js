import React from "react";
// import { Button } from "bootstrap";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import pic from "./images/logos.jpg";
import pic2 from "./images/logo2.png";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext,useState,useEffect } from "react";
import { UserContext } from "../App";
import Login from "./Login";
import Registered from "./Registered";
import axios from "axios";


function Header() {
  const { state, dispatch} = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));


  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (state) { 
    fetchRegistrationStatus();
    }
    
  }, [state]);


  function fetchRegistrationStatus() {
 if(user){
   const username=user.username;
    console.log("username inside func",username);
    axios.post("http://localhost:8080/regilogin",{username}).then((res)=>{
      const isReg = res.data;
      console.log("reg is",isReg);
      setIsRegistered(isReg);
    } ).catch((error) => {
      console.log("Error fetching registration status:", error);
    });
  }
  }
  if (state) {


    return (
      <>
        <div className="announcements ">
          {" "}
          <marquee>Announcements</marquee>
        </div>
        <img src={pic2} className=" logo2" />

        <img src={pic} className="logo" />
        <h1 className="tag">Empowering the Next Gen Innovators 👩‍💻</h1>
        <Container>
          <div className="header  bg-light mt-4">
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home" className="brand">
                Foundarica
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto items">
                  <Link to="/" className="home">
                    Home
                  </Link>
                  <Link to="/about" className="aboutus">
                    aboutus
                  </Link>
                  <Link to="/contact" className="contact">
                    contact
                  </Link>
                  <Link to="/sponsors" className="sponsors">
                    sponsors
                  </Link>

                  <Link to="/events" className="events">
                    Events
                  </Link>
                  <Button className="logout joinus">
                    {" "}
                    <Link to="/logout" size="sm"  > Log-out</Link>{" "}
                  </Button>

                { 
             
             isRegistered ? <Button size="sm" className="joinus">
                    
                    <Link to="/registered">Registrations</Link>
                  </Button>: ""}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Outlet />
          </div>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <div className="announcements ">
          {" "}
          <marquee>Announcements</marquee>
        </div>
        <img src={pic2} className=" logo2" />

        <img src={pic} className="logo" />
        <h1 className="tag">Empowering the Next Gen Innovators 👩‍💻</h1>
        <Container>
          <div className="header  bg-light mt-4">
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home" className="brand">
                Foundarica
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto items">
                  <Link to="/" className="home">
                    Home
                  </Link>
                  <Link to="/about" className="aboutus">
                    aboutus
                  </Link>
                  <Link to="/contact" className="contact">
                    contact
                  </Link>
                  <Link to="/sponsors" className="sponsors">
                    sponsors
                  </Link>

                  <Link to="/events" className="events">
                    Events
                  </Link>
                  <Button className="joinus" size="sm">
                    {" "}
                    <Link to="/login"> Log-in</Link>{" "}
                  </Button>
                  <Button className="joinus" size="sm">
                    {" "}
                    <Link to="/register"> Register</Link>{" "}
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Outlet />
          </div>
        </Container>
      </>
    );
  }
}
export default Header;
