import React from "react";
import QuantitySelector from '../comp/QuantitySelector';
import friedchicken from '../assets/fried-chicken.jpg';


const FriedChicken = () => {
  return (
    <div>
      <h1>Fried Chicken</h1>
      <QuantitySelector itemName="Fried Chicken"/>
    </div>
  );
};
export default FriedChicken;
