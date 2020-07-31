import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { createStructuredSelector } from 'reselect';

import { SECTIONS } from '../../config/constants';
import { selectShopCollections } from '../../redux/shop/shop.selector';
import { getShopCollections } from '../../redux/shop/shop.action';

import CollectionPreview from '../../components/collection-preview/collection-preview';
import FilterItems from '../../components/filter-items/filter-items';

import './products-tab.scss';

export class ProductsTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
      sections: SECTIONS,
    };
  }

  componentDidMount() {
    const tabIndex = SECTIONS.find((section) => section.linkUrl === this.props.product).id;
    this.handleTabChange(tabIndex);
  }

  /**
   * handles the tab change event
   * @param {Number} index the current selected tab index
   */
  handleTabChange = (index) => {
    this.props.getShopCollections(index);

    switch (index) {
      case 0:
        this.setState({
          tabIndex: index,
        });
        this.props.history.push('/shop/popular');
        break;

      case 1:
        this.setState({
          tabIndex: index,
        });
        this.props.history.push('/shop/hats');
        break;

      case 2:
        this.setState({
          tabIndex: index,
        });
        this.props.history.push('/shop/bags');
        break;

      case 3:
        this.setState({
          tabIndex: index,
        });
        this.props.history.push('/shop/shoes');
        break;

      case 4:
        this.setState({
          tabIndex: index,
        });
        this.props.history.push('/shop/womens');
        break;

      case 5:
        this.setState({
          tabIndex: index,
        });
        this.props.history.push('/shop/mens');
        break;

      default:
        break;
    }
  };

  render() {
    const collections = this.props.collections;
    const tabIndex = this.state.tabIndex;

    return (
      <Tabs selectedIndex={tabIndex} onSelect={(index) => this.handleTabChange(index)}>
        <TabList>
          {this.state.sections.map((section) => (
            <Tab key={section.id}>{section.title.toUpperCase()}</Tab>
          ))}
        </TabList>
        {this.state.sections.map((section) => (
          <TabPanel key={section.id}>
            <div className='shop-page-collections'>
              {section.id !== 0 && (
                <div className='filter-section'>
                  <FilterItems product={section.title} />
                </div>
              )}
              <div className='collection-section'>
                {collections &&
                  collections.map(({ id, ...otherCollectionProps }) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                  ))}
              </div>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections,
});

const mapDispatchToProps = (dispatch) => ({
  getShopCollections: (index) => dispatch(getShopCollections(index)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsTab));
