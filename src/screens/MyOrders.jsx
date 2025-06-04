import React, { useEffect, useState } from 'react';

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
        <div className="container mt-5">
            <h2 className="text-center mb-4">My Orders</h2>
            {orderData.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orderData.map((order, orderIndex) => (
                    <div key={orderIndex} className="mb-4 p-3 border rounded shadow-sm bg-light">
                        <h5>Order Date: {order[0].Order_date}</h5>
                        <table className="table table-bordered mt-3">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.slice(1).map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.size}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
}