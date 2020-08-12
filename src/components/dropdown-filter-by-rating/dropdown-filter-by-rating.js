import React from 'react';
import Select from 'react-dropdown-select';

import { RATING_TYPES } from '../../config';

const DropdownFilterByRating = ({ ratingFilter, setProductsFilters }) => {
  /**
   * handles the dropdown select event
   * @param {Object} e the select event
   */
  const handleSelect = (e) => {
    setProductsFilters('rating', e);
  };

  /**
   * handles the dropdown clear event
   */
  const clearFilter = () => {
    setProductsFilters('rating', []);
  };

  return (
    <>
      <h4>Rating:</h4>
      <div className='dropdown-wrapper'>
        <Select
          values={ratingFilter}
          options={RATING_TYPES}
          onChange={(values) => handleSelect(values)}
          searchable={false}
        />
        {ratingFilter && ratingFilter.length ? (
          <span className='clear-filter-button' onClick={() => clearFilter()}>
            &#10005;
          </span>
        ) : null}
      </div>
    </>
  );
};

export default DropdownFilterByRating;
