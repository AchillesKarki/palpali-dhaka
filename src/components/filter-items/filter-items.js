import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setProductsFilters, fetchProductsStartAsync } from '../../redux/shop/shop.action';
import { selectProductsFilters } from '../../redux/shop/shop.selector';

import DropdownFilterByPrice from '../dropdown-filter-by-price/dropdown-filter-by-price';
import DropdownFilterByRating from '../dropdown-filter-by-rating/dropdown-filter-by-rating';

import './filter-items.scss';

const FilterItems = ({ productType, productsFilters, setProductsFilters, getShopProducts }) => {
  const priceFilter = productsFilters.price;
  const ratingFilter = productsFilters.rating;

  /**
   * handles the fetching of filtered data from the database
   */
  const handleApplyFilters = () => {
    let filters = [];

    if (priceFilter.length) {
      filters.push({
        filterType: 'price',
        filterValue: priceFilter[0].value,
      });
    }

    if (ratingFilter.length) {
      filters.push({
        filterType: 'rating',
        filterValue: ratingFilter[0].value,
      });
    }

    getShopProducts(productType, filters);
  };

  return (
    <div className='filter-items'>
      <h2 className='filter-header'>Filters:</h2>
      <div className='filter-items-by-price'>
        <DropdownFilterByPrice
          priceFilter={priceFilter}
          setProductsFilters={(filterType, filterValue) => setProductsFilters(filterType, filterValue)}
        />
      </div>
      <div className='filter-items-by-customer-rating'>
        <DropdownFilterByRating
          ratingFilter={ratingFilter}
          setProductsFilters={(filterType, filterValue) => setProductsFilters(filterType, filterValue)}
        />
      </div>
      <button className='btn btn-secondary btn-medium' onClick={handleApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  productsFilters: selectProductsFilters,
});

const mapDispatchToProps = (dispatch) => ({
  setProductsFilters: (filterType, filterValue) => dispatch(setProductsFilters(filterType, filterValue)),
  getShopProducts: (productType, productFilters) => dispatch(fetchProductsStartAsync(productType, productFilters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterItems);
