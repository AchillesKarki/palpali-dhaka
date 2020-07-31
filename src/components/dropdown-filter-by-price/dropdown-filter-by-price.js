import React from 'react';
import Dropdown from 'react-dropdown';

const DropdownFilterByPrice = ({ handleFilterByPrice }) => {
  const types = [
    {
      value: '1 - 50',
      label: '$1 - $50',
    },
    {
      value: '50 - 100',
      label: '$50 - $100',
    },
    {
      value: '100 - 150',
      label: '$100 - $150',
    },
    {
      value: '150 - 200',
      label: '$150 - $200',
    },
    {
      value: '200 - 300',
      label: '$200 - $300',
    },
    {
      value: '300 - 400',
      label: '$300 - $400',
    },
  ];

  const onSelect = (e) => {
    handleFilterByPrice(e.value);
  };

  return (
    <>
      <h4>Price:</h4>
      <Dropdown options={types} onChange={onSelect} placeholder='Select an option' />
    </>
  );
};

export default DropdownFilterByPrice;
