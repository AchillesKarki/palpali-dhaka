import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { PRODUCTS_CATEGORY } from '../../config';

import { fetchProductsStartAsync, clearProductsFilters } from '../../redux/shop/shop.action';

import CollectionPreview from '../../components/collection-preview/collection-preview';
import DropdownFilters from '../../components/dropdowns/dropdown-filters/dropdown-filters';
import FilterItems from '../../components/filter-items/filter-items';

import './products-tab.scss';

const ProductsTab = ({ product, products, getShopProducts, clearProductsFilters }) => {
  const filterWrapperRef = useRef(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [productType, setProductType] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (productType) {
      clearProductsFilters();
      getShopProducts(productType);
    }
  }, [productType, getShopProducts, clearProductsFilters]);

  useEffect(() => {
    const tabIndex = PRODUCTS_CATEGORY.find((section) => section.title === product).index;
    setProductType(product);
    setTabIndex(tabIndex);
  }, [product]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterWrapperRef.current &&
        !filterWrapperRef.current.contains(event.target) &&
        !event.target.className.includes('react-dropdown-select-item') &&
        !event.target.className.includes('clear-filter-button') &&
        filterOpen
      ) {
        setFilterOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [filterOpen]);

  /**
   * handles the tab change event
   * @param {Number} index the current selected tab index
   * @param {Number} lastIndex the last selected tab index
   * @param {Object} e the tab select event
   */
  const handleTabChange = (index, lastIndex, e) => {
    setTabIndex(index);

    if (e) {
      setProductType(e.target.innerText.toLowerCase());
    }
  };

  /**
   * handles the filter dropdown open or close
   * @param {Boolean} trigger the trigger to handle the filter dropdown open or close
   */
  const handleResponsiveClick = (trigger = null) => {
    if (trigger) {
      setFilterOpen(trigger);
    } else {
      setFilterOpen(!filterOpen);
    }
  };

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index, lastIndex, event) => handleTabChange(index, lastIndex, event)}>
      <TabList>
        {PRODUCTS_CATEGORY.map((category) => (
          <Tab key={category.index}>{category.title.toUpperCase()}</Tab>
        ))}
      </TabList>
      <div className='shop-page-collections'>
        <div className='filter-section'>
          <FilterItems productType={productType} />
        </div>
        <div className='filter-section-responsive'>
          <button
            className='btn btn-outline-secondary btn-small btn-no-animation filters-dropdown-trigger'
            onClick={handleResponsiveClick}
          >
            Filters
            <div className='icon-wrap'>
              <span className='icon-filter'></span>
            </div>
          </button>
          {filterOpen && (
            <div ref={filterWrapperRef}>
              <DropdownFilters productType={productType} handleResponsiveClick={handleResponsiveClick} />
            </div>
          )}
        </div>

        <div className='collection-section'>
          {PRODUCTS_CATEGORY.map((category) => (
            <TabPanel key={category.index}>{products && <CollectionPreview products={products} />}</TabPanel>
          ))}
        </div>
      </div>
    </Tabs>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getShopProducts: (productType) => dispatch(fetchProductsStartAsync(productType)),
  clearProductsFilters: () => dispatch(clearProductsFilters()),
});

export default connect(null, mapDispatchToProps)(ProductsTab);
