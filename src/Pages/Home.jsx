import React from 'react';
import Card from './Card';
import PData from '../data/products';
import Filter from './Filter';
const Home = () => {

  return (
    <>
      <div className='my-5'>
      </div>
      <div className='container-fluid mb-5'>
        <div className='row'>
          <div className='margin-fix col-2'>
            <Filter />
          </div>
          <div className='col-10 mx-auto'>
            <div className='row gy-4'>
              {
                PData.map((val, ind) => {
                  return <Card
                    key={ind}
                    searchImage={val.searchImage}
                    brand={val.brand}
                    name={val.name}
                    price={val.price}
                    mrp={val.mrp}
                    barcode={val.barcode}
                    rating={(val.rating).toFixed(1)}
                    reviews={val.reviews}
                  />
                })
              }
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default Home
