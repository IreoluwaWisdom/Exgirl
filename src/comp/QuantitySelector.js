import React, { useState } from 'react';
import {Link} from 'react-router-dom'

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
    <div>
      <button onClick={decreaseQuantity} style = {{width:'10vw', marginBottom:'5vh'}}>-</button>
      <span>{quantity}</span>
      <button onClick={increaseQuantity}  style = {{width:'10vw'}}>+</button>
    </div>
    <div>
    <button >
    Add to Cart
    </button>
    <br/>
    <Link to ='/cart' style = {{ color:'black'}}> View/Edit Cart
    </Link>
    </div>
    </div>
  );
};

export default QuantitySelector;
