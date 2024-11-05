import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './cartSlice';

const ProductItem = ({ id, name, price }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price, quantity: 1 }));
  };

  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
