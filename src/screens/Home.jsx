import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
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
  }

  useEffect(() => {
    loadData();
    const carousel = document.querySelector('#carouselExampleInterval');
    if (carousel) {
      new window.bootstrap.Carousel(carousel, {
        interval: 2500,
        ride: 'carousel',
      });
    }
  }, []);

  return (
    <>
      <Navbar />
    <div className="d-flex flex-column min-vh-100 home-page g-1" style={{ backgroundColor: 'white' }}>

      <div>


        <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            {[
              "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
              "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
              "https://images.unsplash.com/photo-1482049016688-2d3e1b311543"
            ].map((src, idx) => (
              <div className={`carousel-item ${idx === 0 ? "active" : ""}`} data-bs-interval="2500" key={idx}>
                <img
                  src={`${src}?w=1200&auto=format&fit=crop&q=80`}
                  className="d-block w-100"
                  alt="carousel food"
                  style={{ height: '500px', objectFit: 'cover', filter: 'brightness(75%)' }}
                />
              </div>
            ))}

           
            <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 d-flex justify-content-center mb-4" style={{ zIndex: 10 }}>
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
          </div>
        </div>



      </div>
      <div className="container mt-4">
        {
          foodCat.length > 0 ? foodCat.map((data) => (
            <div key={data._id} className='row mb-3 g-4 '>
              <div className='fs-3 m-3'>{data.CategoryName}</div>
             
              {
                foodItem.length > 0 ?
                  foodItem.filter(item =>
                    item.CategoryName === data.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                  ).map(filterItems => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
                  : (<div>No such data</div>)
              }
            </div>
          )) : (<div>Loading Categories...</div>)
        }
      </div>

      <Footer />
    </div>
    </>
  );
}
