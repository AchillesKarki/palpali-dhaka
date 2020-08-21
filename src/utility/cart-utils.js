import store from '../redux/store';
import { firestore } from '../firebase/firebase.utils';

let CURRENT_USER_ID;

store.subscribe(() => {
  CURRENT_USER_ID = store.getState().user.currentUser?.id;
});

/**
 * fetches the products from the database, according to product type and filters
 */
export const fetchCartItemsFromDatabase = async () => {
  if (CURRENT_USER_ID) {
    try {
      const existingUserCart = await firestore.collection('carts').where('userId', '==', CURRENT_USER_ID).get();
      let userCart = {
        cartItems: [],
      };

      if (!existingUserCart.empty) {
        userCart = existingUserCart.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))[0];

        const userCartItems = await firestore.collection('carts').doc(userCart.id).collection('cartItems').get();

        userCart.cartItems = userCartItems.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      }

      return { type: 'success', userCart };
    } catch (error) {
      return { type: 'error', errorMessage: error.message };
    }
  } else {
    return { type: 'error', errorMessage: 'You must be signed in to complete this process' };
  }
};

/**
 * implements the adding cart item functionality
 * @param {Object} newCartItem the new cart item to be added to the existingCartItems
 */
export const addCartItemToDatabase = async (newCartItem) => {
  if (CURRENT_USER_ID) {
    try {
      const existingEntity = await getExistingItemRefAndSnapshot(newCartItem);

      if (existingEntity) {
        const existingCartItem = existingEntity.existingCartItem;

        if (!existingEntity.existingCartItemSnapshot.empty) {
          await existingEntity.existingCartItemRef.doc(existingCartItem.$key).update({
            quantity: existingCartItem.quantity + 1,
          });
        } else {
          await existingEntity.existingCartItemRef.add({
            ...newCartItem,
            quantity: 1,
          });
        }
      } else {
        const newUserCart = await firestore.collection('carts').add({
          userId: CURRENT_USER_ID,
        });

        await firestore
          .collection('carts')
          .doc(newUserCart.id)
          .collection('cartItems')
          .add({
            ...newCartItem,
            quantity: 1,
          });
      }

      return { type: 'success' };
    } catch (error) {
      return { type: 'error', errorMessage: error.message };
    }
  } else {
    return { type: 'error', errorMessage: 'You must be signed in to complete this process' };
  }
};

/**
 * implements the removing cart item functionality
 * @param {Object} cartItemToBeRemoved the cart item to be removed from the existingCartItems
 */
export const removeCartItemFromDatabase = async (cartItemToBeRemoved) => {
  if (CURRENT_USER_ID) {
    try {
      const existingEntity = await getExistingItemRefAndSnapshot(cartItemToBeRemoved);

      if (existingEntity) {
        const existingCartItem = existingEntity.existingCartItem;

        if (!existingEntity.existingCartItemSnapshot.empty) {
          if (existingCartItem.quantity === 1) {
            await existingEntity.existingCartItemRef.doc(existingCartItem.$key).delete();
          } else {
            await existingEntity.existingCartItemRef.doc(existingCartItem.$key).update({
              quantity: existingCartItem.quantity - 1,
            });
          }
        }
      }

      return { type: 'success' };
    } catch (error) {
      return { type: 'error', errorMessage: error.message };
    }
  } else {
    return { type: 'error', errorMessage: 'You must be signed in to complete this process' };
  }
};

/**
 * implements the clearing cart item functionality
 * @param {Object} cartItemToBeCleared the cart item to be cleared from the existingCartItems
 */
export const clearItemFromDataBase = async (cartItemToBeCleared) => {
  if (CURRENT_USER_ID) {
    try {
      const existingEntity = await getExistingItemRefAndSnapshot(cartItemToBeCleared);

      if (existingEntity) {
        const existingCartItem = existingEntity.existingCartItem;

        if (!existingEntity.existingCartItemSnapshot.empty) {
          await existingEntity.existingCartItemRef.doc(existingCartItem.$key).delete();
        }
      }

      return { type: 'success' };
    } catch (error) {
      return { type: 'error', errorMessage: error.message };
    }
  } else {
    return { type: 'error', errorMessage: 'You must be signed in to complete this process' };
  }
};

/**
 * implements the clearing the whole cart functionality
 */
export const clearWholeCartFromDataBase = async () => {
  if (CURRENT_USER_ID) {
    try {
      const existingUserCart = await firestore.collection('carts').where('userId', '==', CURRENT_USER_ID).get();

      if (!existingUserCart.empty) {
        const userCart = existingUserCart.docs.map((doc) => ({
          $key: doc.id,
          ...doc.data(),
        }))[0];

        const cartItems = await firestore.collection('carts').doc(userCart.$key).collection('cartItems').get();

        cartItems.forEach(async (item) => {
          await firestore.collection('carts').doc(userCart.$key).collection('cartItems').doc(item.id).delete();
        });

        await firestore.collection('carts').doc(userCart.$key).delete();
      } else {
        return { type: 'error', errorMessage: 'There is no cart for the given user.' };
      }

      return { type: 'success' };
    } catch (error) {
      return { type: 'error', errorMessage: error.message };
    }
  } else {
    return { type: 'error', errorMessage: 'You must be signed in to complete this process' };
  }
};

/**
 * helper method to get the ref and snapshot of the firebase
 * @param {Object} cartItem the cart item to be checked
 */
const getExistingItemRefAndSnapshot = async (cartItem) => {
  try {
    const existingUserCart = await firestore.collection('carts').where('userId', '==', CURRENT_USER_ID).get();

    if (!existingUserCart.empty) {
      const userCart = existingUserCart.docs.map((doc) => ({
        $key: doc.id,
        ...doc.data(),
      }))[0];

      const existingCartItemRef = firestore.collection('carts').doc(userCart.$key).collection('cartItems');

      const existingCartItemSnapshot = await existingCartItemRef.where('id', '==', cartItem.id).get();

      const existingCartItem = existingCartItemSnapshot.docs.map((doc) => ({
        $key: doc.id,
        ...doc.data(),
      }))[0];

      return {
        existingCartItemRef,
        existingCartItemSnapshot,
        existingCartItem,
      };
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};
