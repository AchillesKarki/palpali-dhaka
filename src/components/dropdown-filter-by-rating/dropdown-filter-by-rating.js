import React from 'react';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';

const DropdownFilterByRating = ({ handleFilterByRating }) => {
  const types = [
    {
      value: 4,
      label: '4 and Up',
    },
    {
      value: 3,
      label: '3 and Up',
    },
    {
      value: 2,
      label: '2 and Up',
    },
    {
      value: 1,
      label: '1 and Up',
    },
  ];

  const onSelect = (e) => {
    handleFilterByRating(e.value);
  };

  return (
    <>
      <h4>Rating:</h4>
      <Dropdown options={types} onChange={onSelect} placeholder='Select an option' />
    </>
  );
};

export default DropdownFilterByRating;
