import React from "react";
import Headline from '../comp/Headline';
import RestaurantMenu from '../comp/RestaurantMenu'
import Welcome from '../comp/Welcome'
import TestimonialCarousel from '../comp/TestimonialCarousel';

const Home = () => {
	
  return (
    <div>
      <Headline/>
      <h1>Home</h1>
      <Welcome/>
      <RestaurantMenu/>
     <TestimonialCarousel />
    </div>
  );
};
export default Home;
