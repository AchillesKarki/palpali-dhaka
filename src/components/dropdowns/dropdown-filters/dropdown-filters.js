import React from 'react';

import FilterItems from '../../filter-items/filter-items';

const DropdownFilters = ({ productType, handleResponsiveClick }) => {
  return (
    <div className='dropdown filter-items-dropdown'>
      <div className='dropdown-items-wrapper'>
        <FilterItems productType={productType} handleResponsiveClick={handleResponsiveClick} fromDropdown={true} />
      </div>
    </div>
  );
};

export default DropdownFilters;
