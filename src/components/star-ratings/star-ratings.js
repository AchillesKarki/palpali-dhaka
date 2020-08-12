import React from 'react';
import { ReactComponent as ActiveStarLogo } from '../../assets/icons/active-star.svg';
import { ReactComponent as InactiveStarLogo } from '../../assets/icons/inactive-star.svg';

import './star-ratings.scss';

const StarRatings = ({ ratings }) => {
  return (
    <div className='star-ratings-wrapper'>
      {Array.from(Array(ratings), (e, i) => (
        <ActiveStarLogo key={i} className='stars active-stars' />
      ))}

      {Array.from(Array(5 - ratings), (e, i) => (
        <InactiveStarLogo key={i} className='stars active-stars' />
      ))}
    </div>
  );
};

export default StarRatings;
