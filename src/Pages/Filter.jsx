import React from 'react';
import PData from '../data/products';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Filter = () => {
  const brands = [...new Set(PData.map((Val) => Val.brand))];
  const categories = [...new Set(PData.map((Val) => Val.category))];
  const colors = [...new Set(PData.map((Val) => Val.color))];
  const genders = [...new Set(PData.map((Val) => Val.gender))];

  return (
    <div className='margin-fixed sticky-top'>
      <div className='card' style={{ width: '20rem' }}>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item fs-2 fw-semibold'>Filters</li>
          <li className='list-group-item'>
            <span className='p-2 fs-5'
              data-bs-toggle='collapse'
              data-bs-target='#brandCollapse'
              aria-expanded='false'
              aria-controls='brandCollapse'
            >
              Brands
            </span>
            <div className='collapse' id='brandCollapse'>
              <div className='card card-body border-0'>
                {brands.map((brand, index) => (
                  <div className='form-check' key={index}>
                    <input className='form-check-input' type='checkbox' value='' id={`brandCheckbox-${index}`} />
                    <label className='form-check-label' htmlFor={`brandCheckbox-${index}`}>
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li className='list-group-item'>
            <span className='p-2 fs-5'
              data-bs-toggle='collapse'
              data-bs-target='#categoryCollapse'
              aria-expanded='false'
              aria-controls='categoryCollapse'
            >
              Categories
            </span>
            <div className='collapse' id='categoryCollapse'>
              <div className='card card-body border-0'>
                {categories.map((category, index) => (
                  <div className='form-check' key={index}>
                    <input className='form-check-input' type='checkbox' value='' id={`categoryCheckbox-${index}`} />
                    <label className='form-check-label' htmlFor={`categoryCheckbox-${index}`}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li className='list-group-item'>
            <span className='p-2 fs-5'
              data-bs-toggle='collapse'
              data-bs-target='#colorCollapse'
              aria-expanded='false'
              aria-controls='colorCollapse'
            >
              Colors
            </span>
            <div className='collapse' id='colorCollapse'>
              <div className='card card-body border-0'>
                {colors.map((color, index) => (
                  <div className='form-check' key={index}>
                    <input className='form-check-input' type='checkbox' value='' id={`colorCheckbox-${index}`} />
                    <label className='form-check-label' htmlFor={`colorCheckbox-${index}`}>
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li className='list-group-item'>
            <span className='p-2 fs-5'
              data-bs-toggle='collapse'
              data-bs-target='#genderCollapse'
              aria-expanded='false'
              aria-controls='genderCollapse'
            >
              Genders
            </span>
            <div className='collapse' id='genderCollapse'>
              <div className='card card-body border-0'>
                {genders.map((gender, index) => (
                  <div className='form-check' key={index}>
                    <input className='form-check-input' type='checkbox' value='' id={`genderCheckbox-${index}`} />
                    <label className='form-check-label' htmlFor={`genderCheckbox-${index}`}>
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
  );
};

export default Filter;
