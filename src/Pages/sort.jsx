import React, { useState } from 'react';

const Sort = () => {
  const [selectedOption, setSelectedOption] = useState("Ratings");

  const handleSortChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle fs-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Sort By - {selectedOption}
      </button>
      <ul className="dropdown-menu fs-4" aria-labelledby="dropdownMenuButton1">
        <li>
          <a
            className={`dropdown-item ${selectedOption === 'Price - Low to High' ? 'selected' : ''}`}
            href="#"
            onClick={() => handleSortChange('Price - Low to High')}
          >
            Price - Low to High
          </a>
        </li>
        <li>
          <a
            className={`dropdown-item ${selectedOption === 'Price - High to Low' ? 'selected' : ''}`}
            href="#"
            onClick={() => handleSortChange('Price - High to Low')}
          >
            Price - High to Low
          </a>
        </li>
        <li>
          <a
            className={`dropdown-item ${selectedOption === 'Ratings' ? 'selected' : ''}`}
            href="#"
            onClick={() => handleSortChange('Ratings')}
          >
            Ratings
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sort;
