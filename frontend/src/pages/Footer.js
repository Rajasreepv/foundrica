import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__address">
          <p>Acharya college, Soladevanahalli, karnataka,560107</p>
          <p>Phone: (+91) 898765432</p>
        </div>
        <div className="footer__copyright">
          <p>&copy; 2023 foundarica. All rights reserved. </p>
        
        </div>
      </div>
      <div className="icons">
      <a href="https://www.instagram.com/accounts/login/" className="icon1">
      <FontAwesomeIcon icon={faInstagram} className="social-icon" />
      </a>
    
      <a href="https://www.youtube.com/@founderica" className="icon2">
      <FontAwesomeIcon icon={faYoutube} className="social-icon" />
      </a>
    
      <a href="https://www.facebook.com/login/" className="icon3">
      <FontAwesomeIcon icon={faFacebook} className="social-icon" />
      </a>
      </div>
    </footer>
  );
};

export default Footer;
