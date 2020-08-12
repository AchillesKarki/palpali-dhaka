/**
 * implements the adding cart item functionality
 * @param {Array} existingCartItems the existing cart items
 * @param {Object} newCartItem the new cart item to be added to the existingCartItems
 */
export const addItemToCart = (existingCartItems, newCartItem) => {
  const exists = existingCartItems.findIndex((cartItem) => cartItem.id === newCartItem.id);

  if (exists > -1) {
    return existingCartItems.map((cartItem) => {
      return cartItem.id === newCartItem.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem;
    });
  } else {
    return existingCartItems.concat({ ...newCartItem, quantity: 1 });
  }
};

/**
 * implements the removing cart item functionality
 * @param {Array} existingCartItems the existing cart items
 * @param {Object} cartItemToBeRemoved the cart item to be removed from the existingCartItems
 */
export const removeItemFromCart = (existingCartItems, cartItemToBeRemoved) => {
  const existingCartItem = existingCartItems.find((cartItem) => cartItem.id === cartItemToBeRemoved.id);

  if (existingCartItem) {
    if (existingCartItem.quantity === 1) {
      return clearItemFromCart(existingCartItems, cartItemToBeRemoved);
    } else {
      return existingCartItems.map((cartItem) => {
        return cartItem.id === cartItemToBeRemoved.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem;
      });
    }
  }
};

/**
 * implements the clearing cart item functionality
 * @param {Array} existingCartItems the existing cart items
 * @param {Object} cartItemToBeCleared the cart item to be cleared from the existingCartItems
 */
export const clearItemFromCart = (existingCartItems, cartItemToBeCleared) => {
  return existingCartItems.filter((cartItem) => cartItem.id !== cartItemToBeCleared.id);
};
