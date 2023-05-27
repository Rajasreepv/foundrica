import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./pages/Header";
import Section from "./pages/Section";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Sponsors from "./pages/Sponsors";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import EventRegister from "./pages/EventRegister";
import Registered from "./pages/Registered";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useReducer, useState } from "react";

import { initialstate, reducer } from "./reducer/UseReducer";

import { useEffect } from "react";
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: true });
    }
  }, []);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Sponsors" element={<Sponsors />} />
          <Route path="/Registered" element={<Registered />} />

          <Route path="/eventregister" element={<EventRegister />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
