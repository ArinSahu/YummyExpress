import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://yummyexpressfrontend.onrender.com/api/foodData", {
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
  }, []);

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column min-vh-100 home-page g-3" style={{ backgroundColor: 'white', paddingTop: '10px' }}>

        <div>
          <div
            id="carouselExample"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            data-bs-interval="2000"
            >
            <div className="carousel-inner">
              {[
                "https://images.unsplash.com/photo-1478144592103-25e218a04891",
                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
                "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
                "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
                "https://images.unsplash.com/photo-1513104890138-7c749659a591"
              ].map((src, idx) => (
                <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                  <img
                    src={`${src}?w=1200&auto=format&fit=crop&q=80`}
                    className="d-block w-100"
                    alt="carousel food"
                    style={{ height: '720px', objectFit: 'cover', filter: 'brightness(75%)' }}
                  />
                </div>
              ))}

              <div
                className="position-relative start-20   text-center px-3"
                style={{ zIndex: 40,top:'350px',left:'500px' ,width:'600px' }}
                >
                <h3 style={{
                  color: 'white',
                  fontWeight: '100',
                  fontSize: '2rem',
                  fontFamily: "'Edu VIC WA NT Hand Pre', cursive",
                  fontStyle: 'normal'
                }}>
                  “Cravings? We’ve Got You Covered.”
                </h3>
              </div>

            </div>


          </div>
        </div>
        <div className=" start-50  w-100 d-flex justify-content-center mb-4 mt-4" style={{ zIndex: 10 }}>
          <div className="bg-warning bg-opacity-10 p-3 rounded shadow-lg w-75">
            <input
              className="form-control form-control-lg"
              type="search"
              placeholder="Search delicious food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}

            />
          </div>
        </div>
        <div className="container mt-4">
          {
            foodCat.length > 0 ? (
              (() => {
                const filteredCategories = foodCat.filter(category => {
                  const categoryMatches = category.CategoryName.toLowerCase().includes(search.toLowerCase());
                  const foodMatches = foodItem.some(item =>
                    item.CategoryName === category.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                  );
                  return categoryMatches || foodMatches;
                });

                if (filteredCategories.length === 0) {
                  return <div className="text-center fs-4 mt-5">No matches found</div>;
                }

                return filteredCategories.map(category => {
                  const categoryMatches = category.CategoryName.toLowerCase().includes(search.toLowerCase());
                  const itemsToShow = categoryMatches
                    ? foodItem.filter(item => item.CategoryName === category.CategoryName)
                    : foodItem.filter(item =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                    );

                  return (
                    <div key={category._id} className='mb-4'>
                      <div className='fs-3 mb-3 ms-3'>{category.CategoryName}</div>
                      <div className='row'>
                        {itemsToShow.length > 0 ? (
                          itemsToShow.map(filterItems => (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                              <Card
                                foodItem={filterItems}
                                options={filterItems.options[0]}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="ms-3">No matching items in this category</div>
                        )}
                      </div>
                    </div>
                  );
                });
              })()
            ) : (
             <div style={{ color: 'black' }}>Loading Menu...</div>

            )
          }
        </div>





        <Footer />
      </div>
    </>
  );
}
