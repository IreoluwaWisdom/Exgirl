import React from "react";
import SwallowMenu from '../comp/SwallowMenu'
import ModernMenu from '../comp/ModernMenu'
import ProteinMenu from '../comp/ProteinMenu';
import Showed from '../comp/Showed';
import Welcome from '../comp/Welcome'
import TestimonialCarousel from '../comp/TestimonialCarousel';
import OrderNowButton from '../comp/OrderNowButton'
import HowItWorks from '../comp/HowItWorks';
import Footer from '../comp/Footer';
import Connect from '../comp/Connect';
import { useAuth } from '../context/AuthContext';
import Typing from '../Texts/Typing.js';

const Home = () => {
	 const { currentUser } = useAuth();

  return (
    <div>
      <Welcome/>
      {!currentUser && <Showed />}
      <Typing phrase ='Swallows'/>
      <SwallowMenu name = 'restaurant-menu'/>
      <Typing phrase ='Modern Fusion '/>
      <ModernMenu/>      
      <Typing phrase ='Proteins'/>
      <ProteinMenu/>
      <OrderNowButton/>
     <TestimonialCarousel />
     <HowItWorks/>
     <Connect/>
     <Footer/>

    </div>
  );
};
export default Home;
