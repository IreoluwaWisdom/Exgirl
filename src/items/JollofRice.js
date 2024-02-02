import React from "react";
import jollofrice from '../assets/jollof-rice.jpg'
import QuantitySelector from '../comp/QuantitySelector'

const JollofRice = () => {
  return (
    <div style = {{position:'absolute', textAlign:'center', top:'10%', left:'15%'}}>
      <h1 style = {{textAlign:'center'}}>Jollof Rice</h1>
      <img src = {jollofrice} style = {{borderRadius:'20px', marginTop:'3vh', marginBottom:'5vh'}}/>
      <QuantitySelector itemName="Jollof Rice"/>
    </div>
  );
};
export default JollofRice;
