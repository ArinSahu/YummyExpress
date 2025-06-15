import React, { useEffect, useState } from 'react';
import '../MyOrdersStyle.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
export default function MyOrders() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrders = async () => {
    let response = await fetch("http://localhost:5000/api/auth/myorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: localStorage.getItem("userEmail") })
    });

    const json = await response.json();
    if (json.success) {
      setOrderData(json.orderData);
    } else {
      console.log("No order history found.");
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <>
    <div><Navbar /></div>
    <div className="my-orders-wrapper">
      <h2 className="text-center mb-4 text-warning fw-bold">🍽 My Orders</h2>
      {orderData.length === 0 ? (
        <div className="text-center text-secondary fs-4">No orders found.</div>
      ) : (
        <div className="row g-4">
          {orderData.map((order, orderIndex) => (
            <div key={orderIndex} className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <i className="bi bi-calendar-event"></i> Order Date:{" "}
                    <span className="badge bg-info text-dark">{order[0].Order_date}</span>
                  </h5>
                  <table className="table table-sm  mt-3 ">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Dish</th>
                        <th>Qty</th>
                        <th>Size</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.slice(1).map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="text-capitalize">{item.name}</td>
                          <td>{item.qty}</td>
                          <td>{item.size}</td>
                          <td>₹{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-end mt-2">
                    <strong>
                      Total: ₹{order.slice(1).reduce((acc, cur) => acc + cur.price, 0)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
   
    <Footer />
    </>
  );
}
