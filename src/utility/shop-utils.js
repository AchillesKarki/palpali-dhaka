import { firestore } from '../firebase/firebase.utils';

/**
 * fetches the products from the database, according to product type and filters
 * @param {string} productType the product type
 * @param {Object} filters the filters
 */
export const fetchProductsFromDatabase = async (productType, filters) => {
  let response = null;

  try {
    let snapshot;

    if (!filters) {
      snapshot = await firestore.collection('products').where('type', '==', productType).get();
    } else if (typeof filters === 'string' && filters === 'newArrival') {
      snapshot = await firestore.collection('products').where('newArrival', '==', true).get();
      response = { newArrival: true };
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
      response = { newArrival: false };
    }

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    response = { ...response, type: 'success', products };
  } catch (error) {
    response = { type: 'error', errorMessage: error.message };
  }

  return response;
};

/**
 * fetches the single product from the database, according to product id
 * @param {string} productId the product id
 */
export const fetchSingleProductFromDatabase = async (productId) => {
  let response = null;

  try {
    const snapshot = await firestore.collection('products').doc(productId).get();

    console.log(snapshot);

    const product = {
      id: snapshot.id,
      ...snapshot.data(),
    };

    response = { type: 'success', product };
  } catch (error) {
    response = { type: 'error', errorMessage: error.message };
  }

  return response;
};
