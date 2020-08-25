import React, { memo } from 'react';
import Select from 'react-dropdown-select';

import { PRICE_TYPES } from '../../../config';
import { isEquivalent } from '../../../utility/helper-utils';

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

const areEqual = (prevProps, nextProps) => {
  const prevFilter = prevProps.priceFilter[0];
  const newFilter = nextProps.priceFilter[0];

  if (!prevFilter && !newFilter) {
    return true;
  }

  if (!prevFilter) {
    return false;
  }

  if (!newFilter) {
    return false;
  }

  return isEquivalent(prevFilter, newFilter);
};

export default memo(DropdownFilterByPrice, areEqual);
