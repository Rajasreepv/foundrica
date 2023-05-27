import axios from 'axios';
import React ,{createContext, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import Home from './Home';
function Logout(){
    const history=useNavigate();
   const {state,dispatch}=useContext(UserContext);
   localStorage.clear();
   dispatch({ type: "USER", payload: false });
 
      

return(
    <>
  <Home/>

</>

)
}

export default Logout;