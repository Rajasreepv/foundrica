import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
function Registered() {

  const user = JSON.parse(localStorage.getItem("user"));

  const username = user.username;

  const { state, dispatch } = useContext(UserContext);

  const [registrationData, setRegistrationData] = useState(null);
  useEffect(() => {
    if (state) {
      getRegData();
    }
  }, [state]);

  function getRegData() {
    axios
      .post("http://localhost:8080/getregdata", { username: username })
      .then((res) => {
       setRegistrationData(res.data);
     
        
      });
  }

  return (
    
      <div className="profilepage">
   { registrationData ?
   <>
     
       
       
          <h1 className="welcome">welcome {user.username.slice(0, 5)} ☺</h1>
          <div className="registration">
          <h1 className="">Your Registrations </h1>
          <h3 className="">dept:{registrationData.dept}</h3>
          <h3 className="">Event date:09-01-2023</h3>
          <h4 className="">Date of Registration: {registrationData.date.slice(0,5)} </h4>
          </div>
          </>
    : <p className="welcome">Loading...</p>
    }
    </div>
    
  );
}

export default Registered;
