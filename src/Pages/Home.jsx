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
  let [appliedBrands, setAppliedbrands] = useState(filtersInSessionStorage?.brands || []);
  let [appliedCategories, setAppliedCategories] = useState(filtersInSessionStorage?.categories || []);
  let [appliedColors, setAppliedColors] = useState(filtersInSessionStorage?.colors || []);
  let [appliedGenders, setAppliedGenders] = useState(filtersInSessionStorage?.genders || []);
  let [filteredProducts, setFilteredProducts] = useState(PData);
  const [brandCollapseOpen, setBrandCollapseOpen] = useState(appliedBrands.length > 0);
  const [categoryCollapseOpen, setCategoryCollapseOpen] = useState(appliedCategories.length > 0);
  const [colorCollapseOpen, setColorCollapseOpen] = useState(appliedColors.length > 0);
  const [genderCollapseOpen, setGenderCollapseOpen] = useState(appliedGenders.length > 0);

  useEffect(() => {
    filteredProducts = PData;
    if (appliedBrands.length) filteredProducts = filteredProducts.filter((product) => appliedBrands.includes(product.brand))
    if (appliedCategories.length) filteredProducts = filteredProducts.filter((product) => appliedCategories.includes(product.category))
    if (appliedColors.length) filteredProducts = filteredProducts.filter((product) => appliedColors.includes(product.color))
    if (appliedGenders.length) filteredProducts = filteredProducts.filter((product) => appliedGenders.includes(product.gender))
    setFilteredProducts(filteredProducts);
  }, [])

  let resetItems = () => {
    setFilteredProducts(PData);
    setAppliedbrands([]);
    setAppliedCategories([]);
    setAppliedColors([]);
    setAppliedGenders([]);
    sessionStorage.setItem('filters',JSON.stringify({}));
  }


  let addToFilter = (e, type, val) => {
    let filtersInSessionStorage = JSON.parse(sessionStorage.getItem('filters'));
    setAppliedbrands(filtersInSessionStorage?.brands || []);
    setAppliedCategories(filtersInSessionStorage?.categories || []);
    setAppliedColors(filtersInSessionStorage?.colors || []);
    setAppliedGenders(filtersInSessionStorage?.gender || []);

    if (e.target.checked) {
      switch (type) {
        case 'brand':
          appliedBrands.push(val);
          setAppliedbrands(appliedBrands)
          break;

        case 'category':
          appliedCategories.push(val)
          setAppliedCategories(appliedCategories)
          break;

        case 'color':
          appliedColors.push(val)
          setAppliedColors(appliedColors)
          break;

        case 'gender':
          appliedGenders.push(val)
          setAppliedGenders(appliedGenders)
          break;

        default:
          break;
      }
    } else {
      switch (type) {
        case 'brand':
          appliedBrands=appliedBrands.filter((brand) => brand !== val);
          setAppliedbrands(appliedBrands);
          break;

        case 'category':
          appliedCategories=appliedCategories.filter((categories) => categories !== val);
          setAppliedCategories(appliedCategories);
          break;

        case 'color':
          appliedColors=appliedColors.filter((colors) => colors !== val);
          setAppliedColors(appliedColors);
          break;

        case 'gender':
          appliedGenders=appliedGenders.filter((genders) => genders !== val);
          setAppliedGenders(appliedGenders)
          break;

        default:
          break;
      }
    }
    console.log(appliedBrands)
    let tempProducts = PData;

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
    console.log(appliedBrands)

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
                    <button type="button" class="btn btn-outline-dark px-3 ms-auto py-0 fs-4" onClick={() => resetItems()}>Reset</button>
                  ) : null}</li>
                  <li className='list-group-item'>
                    <span
                      className='p-1 fs-3'
                      data-bs-toggle='collapse'
                      data-bs-target='#brandCollapse'
                      aria-expanded={brandCollapseOpen ? 'true' : 'false'}
                      aria-controls='brandCollapse'
                      onClick={() => setBrandCollapseOpen(!brandCollapseOpen)}
                    >
                      Brands <i className="bi bi-chevron-down"></i>
                      {appliedBrands.length >= 1 ? (
                        <span className="badge rounded-pill bg-success fs-5 px-2 py-1 mx-2">{appliedBrands.length}</span>
                      ) : null}
                    </span>
                    <div className={`collapse ${brandCollapseOpen ? 'show' : ''}`} id='brandCollapse'>
                      <div className=' card-body '>
                        {brands.map((brand, index) => (
                          <div className='form-check' key={index}>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              value={brand}
                              checked={appliedBrands.includes(brand) ? true : false}
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
                      aria-controls='categoryCollapse'
                      aria-expanded={categoryCollapseOpen ? 'true' : 'false'}
                      onClick={() => setCategoryCollapseOpen(!categoryCollapseOpen)}
                    >
                      Categories <i class="bi bi-chevron-down"></i>
                      {appliedCategories.length > 0 ? (
                        <span className="badge rounded-pill bg-success fs-5 px-2 py-1 mx-2">{appliedCategories.length}</span>
                      ) : null}
                    </span>
                    <div className={`collapse ${categoryCollapseOpen ? 'show' : ''}`} id='categoryCollapse'>
                      <div className=' card-body '>
                        {categories.map((category, index) => (
                          <div className='form-check' key={index}>
                            <input className='form-check-input'
                              type='checkbox'
                              value={category}
                              checked={appliedCategories.includes(category) ? true : false}
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
                      aria-controls='colorCollapse'
                      aria-expanded={colorCollapseOpen ? 'true' : 'false'}
                      onClick={() => setColorCollapseOpen(!colorCollapseOpen)}
                    >
                      Colors <i class="bi bi-chevron-down"></i>{appliedColors.length > 0 ? (
                        <span className="badge rounded-pill bg-success fs-5 px-2 py-1 mx-2">{appliedColors.length}</span>
                      ) : null}
                    </span>
                    <div className={`collapse ${colorCollapseOpen ? 'show' : ''}`} id='colorCollapse'>
                      <div className=' card-body '>
                        {colors.map((color, index) => (
                          <div className='form-check' key={index}>
                            <input className='form-check-input'
                              type='checkbox'
                              value={color}
                              checked={appliedColors.includes(color) ? true : false}
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
                      aria-controls='genderCollapse'
                      aria-expanded={genderCollapseOpen ? 'true' : 'false'}
                      onClick={() => setGenderCollapseOpen(!genderCollapseOpen)}
                    >
                      Genders <i class="bi bi-chevron-down"></i>{appliedGenders.length > 0 ? (
                        <span className="badge rounded-pill bg-success fs-5 px-2 py-1 mx-2">{appliedGenders.length}</span>
                      ) : null}
                    </span>
                    <div className={`collapse ${genderCollapseOpen ? 'show' : ''}`} id='genderCollapse'>
                      <div className=' card-body '>
                        {genders.map((gender, index) => (
                          <div className='form-check' key={index}>
                            <input className='form-check-input'
                              type='checkbox'
                              value={gender}
                              checked={appliedGenders.includes(gender) ? true : false}
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
                  <div className='col-12 mx-auto '>
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
                          images={val.images}
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
