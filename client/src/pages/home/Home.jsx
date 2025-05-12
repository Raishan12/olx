import React, { useEffect, useState } from 'react'
import axios from "axios"

const Home = () => {

  const [data, setData] = useState([])

  async function loadData() {
    try {
      const res = await axios.get("http://localhost:7000/api/olx/getads")
      console.log(res.data)
      setData(res.data)
    } catch (error) {
      console.log({ message: "Load function error", error })
    }
  }

  useEffect(()=>{
    loadData()
  },[])


  return (
    <div className='home-container mx-20 my-10'>
      <div className='  '>
        <h2 className='text-2xl mb-4'>Fresh recommendations</h2>

        <div className='cards flex flex-wrap gap-5'>

          {/* <div className="card bg-white w-65 h-75 p-2 rounded  border-1 border-[rgb(207,204,204)]">
            <img src="/Screenshot from 2025-05-02 14-27-57.png" className="card-img-top h-50 object-contain bg-black" alt="..." />
              <div className="card-body p-2">
                <h5 className="card-title text-2xl font-extrabold">₹ 4,30,000 </h5>
                <p className="card-desc text-sm truncate">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
          </div> */}

          {
            data.map((card) => (
              <div key={card._id} className="card bg-white w-65 h-75 p-2 rounded  border-1 border-[rgb(207,204,204)]">
                <img src={`http://localhost:7000/images/${card.photos[0]}`} className="card-img-top h-50 mx-auto object-contain bg-black" alt="..." />
                <div className="card-body p-2">
                  <h5 className="card-price text-2xl font-extrabold">₹ {card.price} </h5>
                  <p className="card-title text-lg text-stone-500 truncate">{card.title}</p>
                  {/* <p className="card-desc text-sm text-stone-500 truncate">{card.description}</p> */}
                  <p className="card-title text-sm text-stone-500 font-light truncate">{card.location}</p>
                </div>
              </div>
            ))
          }

        </div>

      </div>
    </div>
  )
}

export default Home
