import React, { useEffect, useState } from 'react';
import Card from './Card';
import PData from '../data/products';
import Filter from './Filter';
import { type } from '@testing-library/user-event/dist/type';
const Home = () => {
  let appliedBrands = [];
  let appliedCategories = [];
  let appliedColors = [];
  let appliedGenders = [];
  let [filteredProducts, setFilteredProducts]=useState(PData)

  useEffect(()=>{
    filteredProducts=PData;
  })
  
  let addToFilter = (e, type, val) => {
    if(e.target.checked){
      switch (type) {
        case 'brand':
          appliedBrands.push(val)
          break;
  
        case 'category':
          appliedCategories.push(val)
          break;
          
        case 'color':
          appliedColors.push(val)
          break;  
  
        case 'gender':
          appliedGenders.push(val)
          break;
        
        default :
          break;  
      }  
    } else {
      switch (type) {
        case 'brand':
          appliedBrands=appliedBrands.filter((brand)=>brand!==val)
          break;
  
        case 'category':
          appliedCategories=appliedCategories.filter((categories)=>categories!==val)
          break;
          
        case 'color':
          appliedColors=appliedColors.filter((colors)=>colors!==val)
          break;  
  
        case 'gender':
          appliedGenders=appliedGenders.filter((genders)=>genders!==val)
          break;
        
        default :
          break;
      }
    }

    // console.log(appliedBrands);
    // console.log(appliedCategories);
    // console.log(appliedColors);
    // console.log(appliedGenders)

    if(appliedBrands.length){
      filteredProducts=filteredProducts.filter((product)=>appliedBrands.includes(product.brand))
      
    }
    if(appliedCategories.length){
      filteredProducts=filteredProducts.filter((product)=>appliedCategories.includes(product.category))
    }
    if(appliedColors.length){
      filteredProducts=filteredProducts.filter((product)=>appliedColors.includes(product.color))
    }
    if(appliedGenders.length){
      filteredProducts=filteredProducts.filter((product)=>appliedGenders.includes(product.gender))
    }
    setFilteredProducts(filteredProducts)
  }

  return (
    <>
      <div className='my-5'>
      </div>
      <div className='container-fluid mb-5'>
        <div className='row'>
          <div className='margin-fix col-2'>
            <Filter 
            addToFilter={addToFilter}   
             />
          </div>
          <div className='col-10 mx-auto'>
            <div className='row gy-4'>
              {
                filteredProducts.map((val, ind) => {
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
