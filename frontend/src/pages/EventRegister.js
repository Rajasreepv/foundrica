import { React, useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
import Events from "./Events";
function EventRegister() {
  const history = useNavigate();
  const [amount, setamount] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [date, setdate] = useState("");
  const [dept, setdept] = useState("");
  

  const { state, dispatch} = useContext(UserContext);
  

  const user = JSON.parse(localStorage.getItem("user"));
  
  function registerforEvent(e) {
    e.preventDefault();
    
    if(!state)
    {
      swal("Please Login to Register For this Event 🙂")
      history("/login");
    }
    else{
 
      const email = document.getElementById("email").value;
      const department = dept;
      const phoneno =phone;
      const dateis = date;  
      const eventis = document.getElementById("events").value;;



   
     axios.post('http://localhost:8080/eventregister', {
       
      
        email:email,
       
}).then(res =>{
        if(res.data=="notregistered")
        {
          if (amount == "" || dept == "" || phone == "") {
            swal("please enter required fields");
          } else {
            var options = {
              key: "rzp_test_lZiqaGhex0B561",
              key_secret: "u4x5KEircvsJN2x4lFijx8zn",
              amount: amount * 100,
              currency: "INR",
              name: "Founderica",
              description: "Registering for event",
              handler:  function (response) {
               
             if( response.razorpay_payment_id)
             {
              swal("Successfully Registered");
              
                axios.post('http://localhost:8080/verify', {
                id : response.razorpay_payment_id,
                email:email,
                phone:phoneno,
                events:eventis,
                dept:department,
                date:dateis,
                });
                history("/events");
                
             }
             else{
              swal("Payment Error Try Again Later");
             }
               
  
                //   // Payment verification successful
                //   // Perform any additional actions like storing registration information
                //   // Show success message to the user
                // }
              },
              prefill: {
                name: "rjzre",
                email: "rajasreepv02@gmail.com",
                contact: "7789654327",
              },
              notes: {
                address: "Razorpay Corporate office",
              },
              theme: {
                color: "red",
              },
            };
            var pay = new window.Razorpay(options);
            pay.open();
          }
        }              
      
        
        else if(res.data==="alreadyregistered")
        
          {
            swal("Already Registered");
            history("/events")
          }
        }
      )}}

  
  return (
    <center>
      <Container className="eventregister">
        <h1 className="eventregisterheading">Register for Event</h1>
        <form className="contactform">
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your Name"
            onChange={(e) => setname(e.target.value)}
            value={user ? user.username.slice(0, 5) : ""}
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="enter your Email"
            onChange={(e) => setemail(e.target.value)}
            value={user ? user.username : ""}
          />
          <input
            type="dept"
            id="dept"
            name="dept"
            placeholder="Enter your Department"
            onChange={(e) => setdept(e.target.value)}
            value={dept}
          />
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Contact-Number"
            onChange={(e) => setphone(e.target.value)}
            value={phone}
          />
          <input
            type="date"
            id="date"
            name="Date"
            placeholder="Date"
           
           onChange={(e) => setdate(e.target.value)}
           value={date}
          />
          <br></br>
          <h4>Select your college:</h4>
          <select name="college" id="college">
            <option value="college1">Acharya institute of technology</option>
            <option value="college2">
              Acharya institute of graduate studies
            </option>
            <option value="college3">Acharya institue of polytechnic</option>
            <option value="college4">BM Reddy nursing</option>
          </select>
          <br></br>
          <br></br>
          <h3>Select Event</h3>
          <select name="event" id="events" >
            <option value="Hackathon-1">Hackathon-1</option>
            <option value="Hackathon-2">Hackathon-2</option>
          </select>
          <h2 className="eventregisterheading">Registration Fee : 150/-</h2>
          <input
            type="text"
            value={amount}
            placeholder="enter registration fee"
            onChange={(e) => setamount(e.target.value)}
          ></input>
          <br></br>

          <button
            type="submit"
            onClick={registerforEvent}
            className="btn btn-outline-success"
          >
            Register
          </button>
        </form>
      </Container>
    </center>
  );
}

export default EventRegister;
