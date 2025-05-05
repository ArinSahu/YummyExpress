import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Caraousal from '../components/Caraousal'

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
            <div className="carousel-inner">
              <div className='carousel-caption' style={{ "zIndex": "10" }}>
                <div class="d-flex justify-content-center">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{
                    setSearch(e.target.value);
                  }} />
                  {/* <button className="btn btn-outline-success btn-dark fst-italic" type="submit">Search</button> */}
                </div>
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
