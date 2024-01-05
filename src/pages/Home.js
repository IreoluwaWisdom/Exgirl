import React from "react";
import Headline from '../comp/Headline';
import RestaurantMenu from '../comp/RestaurantMenu'
import Welcome from '../comp/Welcome'
import TestimonialCarousel from '../comp/TestimonialCarousel';
import OrderNowButton from '../comp/OrderNowButton'

const Home = () => {
	
  return (
    <div>
      <Headline/>
      <h1>Home</h1>
      <Welcome/>
      <RestaurantMenu name = 'restaurantMenu'/>
      <OrderNowButton/>
     <TestimonialCarousel />
    </div>
  );
};
export default Home;
