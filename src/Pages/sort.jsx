import React, { useState } from 'react';

const SortComponent = () => {
  const [selectedSort, setSelectedSort] = useState('Choose an option');
  const [sortOptionsVisible, setSortOptionsVisible] = useState(false);

  const toggleSortOptions = () => {
    setSortOptionsVisible(!sortOptionsVisible);
  };

  const sortBy = (option) => {
    setSelectedSort(option);
    console.log('Sorting by:', option);
    setSortOptionsVisible(false);
  };

  return (
    <div>
      <span>Sort by: </span>
      <span style={{ fontWeight: 'bold' }}>{selectedSort}</span>
      <button onClick={toggleSortOptions}>▼</button>

      {sortOptionsVisible && (
        <div>
          <div onClick={() => sortBy('priceHighToLow')}>Price: High to Low</div>
          <div onClick={() => sortBy('priceLowToHigh')}>Price: Low to High</div>
          <div onClick={() => sortBy('rating')}>Rating</div>
        </div>
      )}
    </div>
  );
};

export default SortComponent;
