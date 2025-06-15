import React from 'react'
import Delete from '@mui/icons-material/Delete';

import { useCart, useDispatchCart } from '../components/ContextReducer.jsx';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("https://yummyexpressfrontend.onrender.com/api/auth/orderData", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
      alert("✅ Order placed successfully!");
    } else {
      alert("❌ Failed to place order. Please try again.");
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  if (data.length === 0) {
    return (
      <div style={{ backgroundColor: 'white', minHeight: '100vh', color: 'black'  }}>
        <div className=' w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
      <div className='container shadow p-4 rounded' style={{ backgroundColor: '#ffffff' }}>
        <h2 className='text-center text-success mb-4'>🛒 Your Cart</h2>

        <table className='table'>
          <thead className='text-success fs-5'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>₹{food.price}</td>
                <td>
                  <button className="btn text-danger" onClick={() => dispatch({ type: "REMOVE", index })}>
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='d-flex justify-content-between align-items-center mt-4'>
          <h3 style={{ color: '#28a745' }}>Total Price: ₹{totalPrice}/-</h3>
          <button className='btn btn-success px-4 py-2 fw-bold' onClick={handleCheckOut}>
            ✅ Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
