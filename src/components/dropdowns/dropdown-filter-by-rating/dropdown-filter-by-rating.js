import React, { memo } from 'react';
import Select from 'react-dropdown-select';

import { RATING_TYPES } from '../../../config';
import { isEquivalent } from '../../../utility/helper-utils';

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

const areEqual = (prevProps, nextProps) => {
  const prevFilter = prevProps.ratingFilter[0];
  const newFilter = nextProps.ratingFilter[0];

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

export default memo(DropdownFilterByRating, areEqual);
