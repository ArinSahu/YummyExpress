import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {

  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  }

  useEffect(() => {
    loadData()
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div><Navbar /></div>
      <div>
        <div>
          <div id="carouselExampleInterval" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner position-relative">

              {/* Search Bar Overlay (Centered) */}
              <div className="position-absolute top-50 start-50 translate-middle w-100 d-flex justify-content-center" style={{ zIndex: 10 }}>
                <div className="bg-dark bg-opacity-75 p-3 rounded shadow-lg w-75">
                  <input
                    className="form-control form-control-lg"
                    type="search"
                    placeholder="Search delicious food..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Carousel Items */}
              {[
                "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
                "https://images.unsplash.com/photo-1482049016688-2d3e1b311543"
              ].map((src, idx) => (
                <div className={`carousel-item ${idx === 0 ? "active" : ""}`} data-bs-interval="2000" key={idx}>
                  <div style={{ height: '500px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={`${src}?w=1200&auto=format&fit=crop&q=80`}
                      className="d-block w-100"
                      alt="carousel food"
                      style={{ height: '500px', objectFit: 'cover', filter: 'brightness(75%)' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
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
      </div>

      
      <div className="container">
        {
          foodCat.length > 0 ? foodCat.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                {foodItem.length > 0 ? foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase())).map(filterItems => {
                  return (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}

                      ></Card>
                    </div>
                  )
                })
                  : (<div>"no such data"</div>)}
              </div>
            )
          }) : (<div>""""""</div>)
        }

      </div>
      <div><Footer /></div>
    </div>
  )
}
