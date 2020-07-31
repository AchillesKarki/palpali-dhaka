import React from 'react';
import Dropdown from 'react-dropdown';

const DropdownFilterByType = ({ handleFilterByType }) => {
  const types = [
    {
      value: 'TYPE 1',
      label: 'TYPE 1',
    },
    {
      value: 'TYPE 2',
      label: 'TYPE 2',
    },
    {
      value: 'TYPE 3',
      label: 'TYPE 3',
    },
  ];

  const onSelect = (e) => {
    handleFilterByType(e.value);
  };

  return (
    <>
      <h4>Product Type:</h4>
      <Dropdown options={types} onChange={onSelect} placeholder='Select an option' className='filter-dropdown' />
    </>
  );
};

export default DropdownFilterByType;
