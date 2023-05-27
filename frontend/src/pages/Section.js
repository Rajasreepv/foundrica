import React from "react";
import Container from "react-bootstrap/esm/Container";
import pic1 from "./images/inaug.jpg";
import pic2 from "./images/meeting.jpg";
import pic3 from "./images/hackathon.jpg";
import Carousel from "react-bootstrap/Carousel";
import Login from "./Login";
import Cards from "./Cards";
import { Link } from "react-router-dom";
function Section() {
  return (
    <div className="section">
      <Container>
        <h1 className="sectionheading">
          Welcome to Acharya's very own Startup club
        </h1>

        <Carousel fade>
          <Carousel.Item className="carousel">
            <img className="d-block" src={pic1} alt="First slide" />
            <Carousel.Caption className="caption">
              <h3>Inauguration Day</h3>
              <p>09-01-2022</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="carousel">
            <img className="d-block " src={pic2} alt="Second slide" />

            <Carousel.Caption className="caption">
              <h3>Idea Pitching Meetings</h3>
              <p>11-04-2022</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="carousel">
            <img className="d-block " src={pic3} alt="Third slide" />

            <Carousel.Caption className="caption">
              <h3>Hackathons</h3>
              <p>08-05-2023</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className="mission">
          <h1 className="sectionheading">Our Mission </h1>

          <div className="row cards">
            <Cards
              title="Empower Educate Innovate"
              content="Empowering student entrepreneurs
with the knowledge and resources like 
articles, guides, and tools,
to kickstart their startup journey."
            />
            <Cards
              title="Collaborate. Connect. Create."
              content="Fostering a collaborative community for student startups to connect, collaborate, and create innovative solutions together."
            />
            <Cards
              title="Learn. Network. Thrive."
              content="Prioritizing continuous learning and networking opportunities to help student entrepreneurs thrive in their entrepreneurial endeavors."
            />
          </div>
        </div>
        <p className="sectioncontent">
          {" "}
          "Empowering Innovators, Engaging Investors: Acharaya's Startup Club -
          Your Catalyst for Success!"
        </p>

        <center>
          {/* <button type="button"  className="  joinus">
            Join as a Investor
          </button> */}
          <button className="joinus"> <Link to= "/login"> Join our Team</Link> </button>  
           
          
        </center>
      </Container>
    </div>
  );
}

export default Section;
