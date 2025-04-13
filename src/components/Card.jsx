import React from 'react'

export default function Card() {
    return (
        <div>
            <div className="card mt-3" style={{ "width": "20rem", "maxHeight": "500px" }}>
                <img className="card-img-top " style={{ height: "200px", objectFit: "conatain" }}  src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">jaruri text hai</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success rounded'>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100  bg-success rounded'>
                            <option value={"half"}>Half</option>
                            <option value={"full"}>Full</option>
                        </select>
                        <div className='d-inline h-100 fs-5'>Total Price</div>
                    </div>
                </div>
            </div>
        </div>

    )
}
