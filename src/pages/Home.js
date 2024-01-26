import React from "react";
import Headline from '../comp/Headline';
import SwallowMenu from '../comp/SwallowMenu'
import ModernMenu from '../comp/ModernMenu'
import ProteinMenu from '../comp/ProteinMenu'
import Welcome from '../comp/Welcome'
import TestimonialCarousel from '../comp/TestimonialCarousel';
import OrderNowButton from '../comp/OrderNowButton'
import HowItWorks from '../comp/HowItWorks';
import Footer from '../comp/Footer';
import Connect from '../comp/Connect';


const Home = () => {
	
  return (
    <div>
      <Welcome/>
      <SwallowMenu name = 'restaurant-menu'/>
      <ModernMenu/>
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
