import { firestore } from '../firebase/firebase.utils';

/**
 * fetches the products from the database, according to product type and filters
 * @param {string} productType the product type
 * @param {Object} filters the filters
 */
export const fetchProductsFromDatabase = async (productType, filters) => {
  let response;

  try {
    let snapshot;

    if (!filters) {
      snapshot = await firestore.collection('products').where('type', '==', productType).get();
    } else {
      let query = firestore.collection('products').where('type', '==', productType);
      filters.forEach((filter) => {
        if (filter.filterType === 'price') {
          const lowerPriceLimit = filter.filterValue.split(' ')[0];
          const upperPriceLimit = filter.filterValue.split(' ')[2];
          query = query.where('price', '>=', +lowerPriceLimit).where('price', '<=', +upperPriceLimit);
        } else {
          query = query.where('rating', '==', filter.filterValue);
        }
      });

      snapshot = await query.get();
    }

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    response = { type: 'success', products };
  } catch (error) {
    response = { type: 'error', errorMessage: error.message };
  }

  return response;
};
