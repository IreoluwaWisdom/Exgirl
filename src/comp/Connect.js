import React, { useEffect, useRef, useState } from "react";
import { FaPhone, FaEnvelope, FaTwitter, FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import '../styles/Connect.css'

const Connect = () => {
	const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Change this value as needed
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  return (
    <div style = {{marginTop:'13vh', marginBottom:'20vh'}} >
      <h6 style={{fontSize:'120%', marginLeft:'4vw',fontWeight:'bold', color:"#B8806B"}}>CONNECT WITH US</h6>
 <div ref={containerRef} className={`connect-with-us ${isVisible ? 'visible' : ''}`}>
      <a href="tel:YOUR_PHONE_NUMBER"><FaPhone /></a>
      <a href="mailto:YOUR_EMAIL_ADDRESS"><FaEnvelope /></a>
      <a href="https://twitter.com/YOUR_TWITTER_HANDLE"><FaTwitter /></a>
      <a href="https://www.instagram.com/YOUR_INSTAGRAM_HANDLE"><FaInstagram /></a>
      <a href="https://www.facebook.com/YOUR_FACEBOOK_PAGE"><FaFacebook /></a>
      <a href="https://wa.me/YOUR_WHATSAPP_NUMBER"><FaWhatsapp /></a>
    </div>



    </div>
  );
};
export default Connect;
