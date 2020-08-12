/**
 * App Configurations
 */

export const REST_API_URL = 'https://firestore.googleapis.com/v1/projects/palpali-dhaka/databases/(default)/documents';

export const PRODUCTS_CATEGORY = [
  {
    index: 0,
    title: 'hats',
  },
  {
    index: 1,
    title: 'bags',
  },
  {
    index: 2,
    title: 'shoes',
  },
  {
    size: 'large',
    index: 3,
    title: 'womens',
  },
  {
    index: 4,
    title: 'mens',
  },
];

export const RATING_TYPES = [
  {
    value: 5,
    label: '5 Stars',
  },
  {
    value: 4,
    label: '4 Stars',
  },
  {
    value: 3,
    label: '3 Stars',
  },
  {
    value: 2,
    label: '2 Stars',
  },
  {
    value: 1,
    label: '1 Star',
  },
];

export const PRICE_TYPES = [
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
