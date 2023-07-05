import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousal from '../components/Carousal';

export default function Home() {
  const [labCat, setLabCat] = useState([]);
  const [labItem, setLabItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      // console.log(data[0], data[1]);

      setLabItem(data[0]);
      setLabCat(data[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div> <Navbar /> </div>
      <div className='container'>
        {
          labCat.length !== 0 ? labCat.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                <hr style={{color:"#00698f",border: "1px solid #00698f"}} />
                {labItem.length !== 0 ? labItem.filter((item) => item.CategoryName === data.CategoryName).map(filterItems => {
                  return (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card itemName = {filterItems}
                      options={filterItems.options[0]}
                      ></Card>
                    </div>
                  )
                }) : <div>No such data found</div>}
              </div>
            )
          })
            : <div>**********</div>
        }
      </div>
      <div><Carousal /></div>
      <div> <Footer /> </div>
    </div>
  );
}
