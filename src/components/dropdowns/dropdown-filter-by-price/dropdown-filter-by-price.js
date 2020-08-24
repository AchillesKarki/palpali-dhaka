import React from 'react';
import Select from 'react-dropdown-select';

import { PRICE_TYPES } from '../../../config';

const DropdownFilterByPrice = ({ priceFilter, setProductsFilters }) => {
  /**
   * handles the dropdown select event
   * @param {Object} e the select event
   */
  const handleSelect = (e) => {
    setProductsFilters('price', e);
  };

  /**
   * handles the dropdown clear event
   */
  const clearFilter = () => {
    setProductsFilters('price', []);
  };

  return (
    <>
      <h4>Price:</h4>
      <div className='dropdown-wrapper'>
        <Select
          values={priceFilter}
          options={PRICE_TYPES}
          onChange={(values) => handleSelect(values)}
          searchable={false}
        />
        {priceFilter && priceFilter.length ? (
          <span className='clear-filter-button' onClick={() => clearFilter()}>
            &#10005;
          </span>
        ) : null}
      </div>
    </>
  );
};

export default DropdownFilterByPrice;
