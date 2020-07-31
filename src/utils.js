import {
  SHOP_DATA_POPULAR_PRODUCTS,
  SHOP_DATA_BAGS,
  SHOP_DATA_HATS,
  SHOP_DATA_MENS,
  SHOP_DATA_SHOES,
  SHOP_DATA_WOMENS,
} from './config/constants';

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

/**
 * get collections based on index
 * @param {Number} index the index
 */
export const getShopCollections = (index) => {
  switch (index) {
    case 0:
      return SHOP_DATA_POPULAR_PRODUCTS;

    case 1:
      return SHOP_DATA_HATS;

    case 2:
      return SHOP_DATA_BAGS;

    case 3:
      return SHOP_DATA_SHOES;

    case 4:
      return SHOP_DATA_WOMENS;

    case 5:
      return SHOP_DATA_MENS;

    default:
      break;
  }
};

/**
 * get collections based on index
 * @param {Number} index the index
 */
export const getFilteredShopCollections = (filter) => {
  let filteredItems = [];
  switch (filter.product) {
    case 'Hats':
      filteredItems = SHOP_DATA_HATS[0].items.filter((item) => {
        if (filter.filterType === 'price') {
          const lowerLimit = +filter.filterValue.split(' ')[0];
          const upperLimit = +filter.filterValue.split(' ')[2];

          return item.price >= lowerLimit && item.price <= upperLimit;
        } else if (filter.filterType === 'rating') {
          return item[filter.filterType] >= filter.filterValue;
        } else {
          return item[filter.filterType] === filter.filterValue;
        }
      });

      return [
        {
          ...SHOP_DATA_HATS[0],
          items: filteredItems,
        },
      ];

    case 'Bags':
      filteredItems = SHOP_DATA_BAGS[0].items.filter((item) => {
        if (filter.filterType === 'price') {
          const lowerLimit = +filter.filterValue.split(' ')[0];
          const upperLimit = +filter.filterValue.split(' ')[2];

          return item.price >= lowerLimit && item.price <= upperLimit;
        } else if (filter.filterType === 'rating') {
          return item[filter.filterType] >= filter.filterValue;
        } else {
          return item[filter.filterType] === filter.filterValue;
        }
      });

      return [
        {
          ...SHOP_DATA_BAGS[0],
          items: filteredItems,
        },
      ];

    case 'Shoes':
      filteredItems = SHOP_DATA_SHOES[0].items.filter((item) => {
        if (filter.filterType === 'price') {
          const lowerLimit = +filter.filterValue.split(' ')[0];
          const upperLimit = +filter.filterValue.split(' ')[2];

          return item.price >= lowerLimit && item.price <= upperLimit;
        } else if (filter.filterType === 'rating') {
          return item[filter.filterType] >= filter.filterValue;
        } else {
          return item[filter.filterType] === filter.filterValue;
        }
      });

      return [
        {
          ...SHOP_DATA_SHOES[0],
          items: filteredItems,
        },
      ];

    case 'Womens':
      filteredItems = SHOP_DATA_WOMENS[0].items.filter((item) => {
        if (filter.filterType === 'price') {
          const lowerLimit = +filter.filterValue.split(' ')[0];
          const upperLimit = +filter.filterValue.split(' ')[2];

          return item.price >= lowerLimit && item.price <= upperLimit;
        } else if (filter.filterType === 'rating') {
          return item[filter.filterType] >= filter.filterValue;
        } else {
          return item[filter.filterType] === filter.filterValue;
        }
      });

      return [
        {
          ...SHOP_DATA_WOMENS[0],
          items: filteredItems,
        },
      ];

    case 'Mens':
      filteredItems = SHOP_DATA_MENS[0].items.filter((item) => {
        if (filter.filterType === 'price') {
          const lowerLimit = +filter.filterValue.split(' ')[0];
          const upperLimit = +filter.filterValue.split(' ')[2];

          return item.price >= lowerLimit && item.price <= upperLimit;
        } else if (filter.filterType === 'rating') {
          return item[filter.filterType] >= filter.filterValue;
        } else {
          return item[filter.filterType] === filter.filterValue;
        }
      });

      return [
        {
          ...SHOP_DATA_MENS[0],
          items: filteredItems,
        },
      ];

    default:
      break;
  }
};
