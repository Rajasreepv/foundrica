import React, { useContext } from "react";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import swal from "sweetalert";
function Register() {
    const history=useNavigate();
    const {state,dispatch}=useContext(UserContext);
   
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

   function handleSubmit(e) {
    e.preventDefault();
    try {
        axios.post("http://localhost:8080/register", { username:username, password:password }).then(res=>{
          if(res.data==="fillfields")
          {
            
            swal("fill required fields");
            dispatch({type:"USER" ,payload:false});
            history("/register");
          }
           else if(res.data==="exist"){
             
                swal("User already exists please login 🤗");
                   
            }else  if (res.status===200)
            {
              localStorage.setItem("user", JSON.stringify(res.data));
              dispatch({type:"USER" ,payload:true})
              swal("Registered Successfully ✅ ")

              history("/");

            }
          }
    
          )
      } catch (e) {
        console.log(e);
      }
  }

  return (
    <center>
      <div className="register-container">
        <h1>Register</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <input
            type="username"
            placeholder="username"
            value={username}
            
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
           
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br></br>
          <Button className="joinus" type="submit" size="sm">Register</Button>
        </form>

        <br></br>
        <p> OR</p>
        <Link to="/login">
          <Button className="joinus" size="sm">Login</Button>
        </Link>
      </div>
    </center>
  );
}

export default Register;
