import React from "react";
import Headline from '../comp/Headline';
import RestaurantMenu from '../comp/RestaurantMenu'
import Welcome from '../comp/Welcome'
import TestimonialCarousel from '../comp/TestimonialCarousel';
import OrderNowButton from '../comp/OrderNowButton'
import HowItWorks from '../comp/HowItWorks';
import Footer from '../comp/Footer';


const Home = () => {
	
  return (
    <div>
      <Headline/>
      <h1>Home</h1>
      <Welcome/>
      <RestaurantMenu name = 'restaurantMenu'/>
      <OrderNowButton/>
     <TestimonialCarousel />
     <HowItWorks/>
     <Footer/>
    </div>
  );
};
export default Home;
