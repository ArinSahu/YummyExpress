import React from 'react'

export default function Caraousal() {
    return (
        <div>
            <div id="carouselExampleInterval" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className='carousel-caption' style={{"zIndex":"10"}}>
                        <form class="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success btn-dark fst-italic" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active" data-bs-interval="2000" style={{ height: "500px", objectFit: "fill" }}>
                        <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8fDA%3D" className="d-block w-100 h-10" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000" style={{ height: "500px", objectFit: "contain" }}>
                        <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100 h-10" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000" style={{ height: "500px", objectFit: "contain" }}>
                        <img src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100 h-10" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
