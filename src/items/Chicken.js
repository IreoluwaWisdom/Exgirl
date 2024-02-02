import React from "react";
import QuantitySelector from '../comp/QuantitySelector';
import chicken from '../assets/chicken.jpg';

const Chicken = () => {
  return (
    <div>
      <h1>Chicken and Chips</h1>
      <QuantitySelector itemName="Chicken and Chips"/>
    </div>
  );
};
export default Chicken;
