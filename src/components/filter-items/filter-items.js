import React from 'react';
import { connect } from 'react-redux';

import { getFilteredShopCollections } from '../../redux/shop/shop.action';

import DropdownFilterByType from '../dropdown-filter-by-type/dropdown-filter-by-type';
import DropdownFilterByPrice from '../dropdown-filter-by-price/dropdown-filter-by-price';
import DropdownFilterByRating from '../dropdown-filter-by-rating/dropdown-filter-by-rating';

import './filter-items.scss';

const FilterItems = ({ product, getFilteredShopCollections }) => {
  const handleFilter = (filterType, filterValue) => {
    const filterCriteria = {
      product,
      filterType,
      filterValue,
    };
    getFilteredShopCollections(filterCriteria);
  };

  return (
    <div className='filter-items'>
      <h2 className='filter-header'>Filters</h2>
      <div className='filter-items-by-price'>
        <DropdownFilterByPrice handleFilterByPrice={(filterValue) => handleFilter('price', filterValue)} />
      </div>
      <div className='filter-items-by-customer-rating'>
        <DropdownFilterByRating handleFilterByRating={(filterValue) => handleFilter('rating', filterValue)} />
      </div>
      <div className='filter-items-by-type'>
        <DropdownFilterByType handleFilterByType={(filterValue) => handleFilter('type', filterValue)} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getFilteredShopCollections: (filter) => dispatch(getFilteredShopCollections(filter)),
});

export default connect(null, mapDispatchToProps)(FilterItems);
