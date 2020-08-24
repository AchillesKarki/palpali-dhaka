import React from 'react';

import { getFormattedDate } from '../../utility/helper-utils';
import './order-item.scss';

const OrderItem = ({ orderItem }) => {
  return (
    <tr className='order-item'>
      <td className='table-body-cell column1'>
        <span className='name'>{orderItem.name}</span>
      </td>
      <td className='table-body-cell column2'>
        <span className='quantity'>{orderItem.quantity}</span>
      </td>
      <td className='table-body-cell column3'>
        <span className='price'>${orderItem.price}</span>
      </td>
      <td className='table-body-cell column4'>
        <span className='paymentType'>{orderItem.paymentType}</span>
      </td>
      <td className='table-body-cell column5'>
        <span className='createdAt'>{getFormattedDate(orderItem.createdAt)}</span>
      </td>
    </tr>
  );
};

export default OrderItem;
