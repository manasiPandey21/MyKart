import React, { useEffect, useState } from 'react';
import Card from './Card';
import PData from '../data/products';
import Sort from './sort';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Home = () => {
  let brands = [...new Set(PData.map((Val) => Val.brand))];
  let categories = [...new Set(PData.map((Val) => Val.category))];
  let colors = [...new Set(PData.map((Val) => Val.color))];
  let genders = [...new Set(PData.map((Val) => Val.gender))];

  let filtersInSessionStorage = JSON.parse(sessionStorage.getItem('filters'));
  let appliedBrands = filtersInSessionStorage?.brands || [];
  let appliedCategories = filtersInSessionStorage?.categories || [];
  let appliedColors = filtersInSessionStorage?.colors || [];
  let appliedGenders = filtersInSessionStorage?.gender || [];
  let [filteredProducts, setFilteredProducts] = useState(PData);

  useEffect(() => {
    filteredProducts = PData;
    if (appliedBrands.length) filteredProducts = filteredProducts.filter((product) => appliedBrands.includes(product.brand))
    if (appliedCategories.length) filteredProducts = filteredProducts.filter((product) => appliedCategories.includes(product.category))
    if (appliedColors.length) filteredProducts = filteredProducts.filter((product) => appliedColors.includes(product.color))
    if (appliedGenders.length) filteredProducts = filteredProducts.filter((product) => appliedGenders.includes(product.gender))
    setFilteredProducts(filteredProducts);
  }, [])


  let addToFilter = (e, type, val) => {
    let filtersInSessionStorage = JSON.parse(sessionStorage.getItem('filters'));
    appliedBrands = filtersInSessionStorage?.brands || [];
    appliedCategories = filtersInSessionStorage?.categories || [];
    appliedColors = filtersInSessionStorage?.colors || [];
    appliedGenders = filtersInSessionStorage?.gender || [];

    if (e.target.checked) {
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

        default:
          break;
      }
    } else {
      switch (type) {
        case 'brand':
          appliedBrands = appliedBrands.filter((brand) => brand !== val)
          break;

        case 'category':
          appliedCategories = appliedCategories.filter((categories) => categories !== val)
          break;

        case 'color':
          appliedColors = appliedColors.filter((colors) => colors !== val)
          break;

        case 'gender':
          appliedGenders = appliedGenders.filter((genders) => genders !== val)
          break;

        default:
          break;
      }
    }

    let tempProducts=PData;

    if (appliedBrands.length) {
      tempProducts = tempProducts.filter((product) => appliedBrands.includes(product.brand))

    }
    if (appliedCategories.length) {
      tempProducts = tempProducts.filter((product) => appliedCategories.includes(product.category))
    }
    if (appliedColors.length) {
      tempProducts = tempProducts.filter((product) => appliedColors.includes(product.color))
    }
    if (appliedGenders.length) {
      tempProducts = tempProducts.filter((product) => appliedGenders.includes(product.gender))
    }
    setFilteredProducts(tempProducts);
    console.log(filteredProducts);

    let filters = {
      brands: appliedBrands,
      categories: appliedCategories,
      colors: appliedColors,
      genders: appliedGenders,
    };
    sessionStorage.setItem('filters', JSON.stringify(filters));
  }
  return (
    <>
      <div className='my-5'></div>
      <div className='container-fluid mb-5'>
        <div className='row'>
          <div className='col-12 d-flex justify-content-end px-4 py-2'>
            <div>
              <Sort />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='margin-fix col-2'>
            <div className='margin-fixed sticky-top'>
              <div className='card border-0 shadow-sm' style={{ width: '23rem', maxHeight: '670px', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item fs-2 fw-semibold d-flex align-items-center'>Filters {appliedBrands.length > 0 || appliedColors.length > 0 || appliedGenders.length > 0 || appliedCategories.length > 0 ? (
                    <button type="button" class="btn btn-outline-dark px-3 ms-auto py-0 fs-4" onClick={() => setFilteredProducts(PData)}>Reset</button>
                  ) : null}</li>
                  <li className='list-group-item'>
                    <span
                      className='p-1 fs-3'
                      data-bs-toggle='collapse'
                      data-bs-target='#brandCollapse'
                      aria-expanded={appliedBrands.length > 0 ? 'true' : 'false'}
                      aria-controls='brandCollapse'
                    >
                      Brands <i className="bi bi-chevron-down"></i>
                      {appliedBrands.length >=1 ? (
                        <span className="badge rounded-pill bg-success fs-5 px-2 py-1">{appliedBrands.length}</span>
                      ) : null}
                    </span>
                    <div className='collapse' id='brandCollapse'>
                      <div className=' card-body '>
                        {brands.map((brand, index) => (
                          <div className='form-check' key={index}>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              value={brand}
                              defaultChecked={appliedBrands.includes(brand) ? true : false}
                              id={`brandCheckbox-${index}`}
                              name={`brandCheckbox-${brand}`}
                              onChange={(e) => {
                                addToFilter(e, 'brand', brand);
                              }}
                            />
                            <label className='form-check-label fs-5 p-1' htmlFor={`brandCheckbox-${index}`}>
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>

                  <li className='list-group-item'>
                    <span className='p-2 fs-3'
                      data-bs-toggle='collapse'
                      data-bs-target='#categoryCollapse'
                      aria-expanded='false'
                      aria-controls='categoryCollapse'
                    >
                      Categories <i class="bi bi-chevron-down"></i>
                      {appliedCategories.length > 0 ? (
                        <span className="badge rounded-pill bg-success fs-5 px-2 py-1">{appliedCategories.length}</span>
                      ) : null}
                    </span>
                    <div className='collapse' id='categoryCollapse'>
                      <div className=' card-body '>
                        {categories.map((category, index) => (
                          <div className='form-check' key={index}>
                            <input className='form-check-input'
                              type='checkbox'
                              value={category}
                              defaultChecked={appliedCategories.includes(category) ? true : false}
                              id={`categoryCheckbox-${index}`}
                              onChange={(e) => addToFilter(e, 'category', category)} />
                            <label className='form-check-label fs-5 p-1' htmlFor={`categoryCheckbox-${index}`}>
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                  <li className='list-group-item'>
                    <span className='p-2 fs-3'
                      data-bs-toggle='collapse'
                      data-bs-target='#colorCollapse'
                      aria-expanded='false'
                      aria-controls='colorCollapse'
                    >
                      Colors <i class="bi bi-chevron-down"></i>{appliedColors.length > 0 ? (
                        <span className="badge rounded-pill bg-success fs-5 px-2 py-1">{appliedColors.length}</span>
                      ) : null}
                    </span>
                    <div className='collapse' id='colorCollapse'>
                      <div className=' card-body '>
                        {colors.map((color, index) => (
                          <div className='form-check' key={index}>
                            <input className='form-check-input'
                              type='checkbox'
                              value={color}
                              defaultChecked={appliedColors.includes(color) ? true : false}
                              id={`colorCheckbox-${index}`} onChange={(e) => addToFilter(e, 'color', color)} />
                            <label className='form-check-label fs-5 p-1' htmlFor={`colorCheckbox-${index}`}>
                              {color}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                  <li className='list-group-item'>
                    <span className='p-2 fs-3'
                      data-bs-toggle='collapse'
                      data-bs-target='#genderCollapse'
                      aria-expanded='false'
                      aria-controls='genderCollapse'
                    >
                      Genders <i class="bi bi-chevron-down"></i>{appliedGenders.length > 0 ? (
                        <span className="badge rounded-pill bg-success fs-5 px-2 py-1">{appliedGenders.length}</span>
                      ) : null}
                    </span>
                    <div className='collapse' id='genderCollapse'>
                      <div className=' card-body '>
                        {genders.map((gender, index) => (
                          <div className='form-check' key={index}>
                            <input className='form-check-input'
                              type='checkbox'
                              value={gender}
                              defaultChecked={appliedGenders.includes(gender) ? true : false}
                              id={`genderCheckbox-${index}`} onChange={(e) => addToFilter(e, 'gender', gender)} />
                            <label className='form-check-label fs-5 p-1' htmlFor={`genderCheckbox-${index}`}>
                              {gender}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col-10 mx-auto pt-2'>
            <div className='row gy-4'>
              {
                filteredProducts.length > 0 ? (
                  <div className='col-11 mx-auto'>
                    <div className='row gy-4'>
                      {filteredProducts.map((val, ind) => (
                        <Card
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
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className='col-12 text-center mt-4'>
                    <div className='container m-5 h-100 w-75 d-flex align-items-center justify-content-center'>
                      <div>
                        <h1 className=' pt-5 fw-normal fs-1'>Oops! nothing matched :(</h1>
                        <img src="Empty.gif" className="rounded h-100 w-75" alt="..." />
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
