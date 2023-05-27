import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Header from './Header'
import Cards from './Cards'
import pic1 from "./images/ARPITa.jpeg"

function Aboutus() {
  return (

    <div>
        
       <Header/>
       <Container>
       <h1 className='aboutusheading'>About Us</h1>
       <p className='aboutuscontent'>Acharya startup club was started in 2022,it is one of the kind club <br/>that inspires and supports young minds to come with new <br/>ideas and making them a reality.<br/>
             with the help of highly skilled mentors we ensure to provide <br/> all the guidence and support required.<br/>
             We conduct various activities like:pitching sessions,presentations,<br/>workshops,training sessions and more.<br/>
             If you are thinking to build or start something of your own<br/>this is the best place to be.</p>
             
             <div className=" row coordinators">
<h1> Meet Our Team</h1>
<div className="row cards">
<Cards title="Sumit Singha Chowdry" content="Professor" img={pic1} social="Connect"/>
<Cards title="Muthukumar" content="Professor" img={pic1} social="Connect"/>
<Cards title="Arpitha Gowda" content="Student Cordinator" img={pic1} social="Connect"/>

</div>
             </div>
        </Container>
        </div>
  )
}

export default Aboutus