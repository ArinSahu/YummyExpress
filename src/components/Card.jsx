import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer.jsx';
import '../index.css';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItem;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = async () => {
    let food = data.find(item => item.id === foodItem._id && item.size === size);
    if (food) {
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
    } else {
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
    }
  };

  return (
    <div>
      <div className="card food-card">
  <img
    className="card-img-top food-card-img"
    src={foodItem.img}
    alt="Food"
  />
  <div className="card-body food-card-body">
    <h5 className="card-title">{foodItem.name}</h5>
    <div className='food-card-controls'>
      <select className='food-card-select' onChange={(e) => setQty(parseInt(e.target.value))}>
        {Array.from(Array(6), (e, i) => (
          <option key={i + 1} value={i + 1}>{i + 1}</option>
        ))}
      </select>
      <select className='food-card-select' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
        {priceOptions.map((data) => (
          <option key={data} value={data}>{data}</option>
        ))}
      </select>
      <div className='food-card-price'>₹{finalPrice}/-</div>
    </div>
    <hr />
    <button className='btn btn-success food-card-button' style={{ marginTop: '-10px' }} onClick={handleAddToCart}>
      Add to Cart
    </button>
  </div>
</div>

    </div>
  );
}
