import React, { useState,Component } from 'react'
 import Header from './Header'
 import Section from './Section'
 import Footer from './Footer'
 import { useLocation } from 'react-router-dom'
import Cards from './Cards'
 
function Home() {



return (
    <div>
    

       < Header  /> 
      <Section/>
      <Footer/>
    </div>
  )
}

export default Home