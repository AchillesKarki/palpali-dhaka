import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserOrders } from '../../redux/payment/payment.selector';

import OrderItem from '../order-item/order-item';

import './my-orders.scss';
import { fetchUserOrderStartAsync } from '../../redux/payment/payment.action';

const MyOrders = ({ userOrders: { orderItems }, fetchUserOrders }) => {
  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  return (
    <div className='my-orders'>
      <div className='my-orders-table'>
        <h3 className='responsive-header'>My Orders</h3>
        <div className='my-orders-table-head'>
          <table>
            <thead>
              <tr>
                <th className='table-header-cell column1'>Product Item</th>
                <th className='table-header-cell column2'>Quantity</th>
                <th className='table-header-cell column3'>Price</th>
                <th className='table-header-cell column4'>Purchased Method</th>
                <th className='table-header-cell column5'>Purchased Date</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className='my-orders-table-body'>
          {orderItems.length ? (
            <table>
              <tbody>
                {orderItems.map((orderItem, index) => (
                  <OrderItem key={orderItem.id + index} orderItem={orderItem} />
                ))}
              </tbody>
            </table>
          ) : (
            <div className='no-items-message'>
              <span>Currently, There Are No Orders.</span>
              <span className='happy'>Happy Shopping!!!!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userOrders: selectUserOrders,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserOrders: () => dispatch(fetchUserOrderStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
