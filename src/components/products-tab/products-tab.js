import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { PRODUCTS_CATEGORY } from '../../config';

import { fetchProductsStartAsync, clearProductsFilters } from '../../redux/shop/shop.action';

import CollectionPreview from '../../components/collection-preview/collection-preview';
import FilterItems from '../../components/filter-items/filter-items';

import './products-tab.scss';

export class ProductsTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
      productType: '',
    };
  }

  componentDidMount() {
    const tabIndex = PRODUCTS_CATEGORY.find((section) => section.title === this.props.product).index;
    this.handleTabChange(tabIndex);
  }

  /**
   * handles the tab change event
   * @param {Number} index the current selected tab index
   * @param {Number} lastIndex the last selected tab index
   * @param {Object} e the tab select event
   */
  handleTabChange = (index, lastIndex, e) => {
    let productType = this.props.product;

    if (e) {
      productType = e.target.innerText.toLowerCase();
    }

    this.setState({
      tabIndex: index,
      productType,
    });

    this.props.clearProductsFilters();
    this.props.getShopProducts(productType);
  };

  render() {
    const products = this.props.products;
    const tabIndex = this.state.tabIndex;

    return (
      <Tabs
        selectedIndex={tabIndex}
        onSelect={(index, lastIndex, event) => this.handleTabChange(index, lastIndex, event)}
      >
        <TabList>
          {PRODUCTS_CATEGORY.map((category) => (
            <Tab key={category.index}>{category.title.toUpperCase()}</Tab>
          ))}
        </TabList>
        <div className='shop-page-collections'>
          <div className='filter-section'>
            <FilterItems productType={this.state.productType} />
          </div>
          <div className='collection-section'>
            {PRODUCTS_CATEGORY.map((category) => (
              <TabPanel key={category.index}>{products && <CollectionPreview products={products} />}</TabPanel>
            ))}
          </div>
        </div>
      </Tabs>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getShopProducts: (productType) => dispatch(fetchProductsStartAsync(productType)),
  clearProductsFilters: () => dispatch(clearProductsFilters()),
});

export default connect(null, mapDispatchToProps)(ProductsTab);
