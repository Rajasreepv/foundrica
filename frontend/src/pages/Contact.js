import React, { useContext, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Container } from "react-bootstrap";
import { UserContext } from "../App";
import swal from 'sweetalert';
import axios from 'axios'
function Contact(event) {
  const { state, dispatch } = useContext(UserContext);
  const [fullname, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

 
  function sendMail(e) {
    e.preventDefault();
 
    axios
    .post(
      "http://localhost:8080/contact",
      {fullname,email,contact,msg }
      
    )
    .then((res) => {
      
      if(res.data==="mailsent")
      {
        swal("Great!", "Mail sent Successfully!", "success");
     
      }
    
  }
  )

}
function resetForm(e){
e.preventDefault();
  setContact("");
  setEmail("");
  setMsg("");
  setName("");
    }

  return (
    <>
      <Header />
      <center>
        <h1 className="contactheading mt-4 ">Feel Free to Connect 📞 </h1>

        <Container>
          <form action="/contact"  className="contactform" reset>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              value={fullname}
            />

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email-Id"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Contact-Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />

            <textarea
              id="message"
              name="message"
              placeholder="Message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />

            <button type="submit" onClick={sendMail}  className="btn btn-outline-success">
              Submit
            </button>
            <button type="submit" onClick={resetForm}  className="btn btn-outline-success">
              Reset
            </button>
          </form>
        </Container>
      </center>

      <br></br>
      <Footer />
    </>
  );
}
export default Contact;
