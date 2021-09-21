import {
    FETCH_PRODUCTS,
    FILTER_PRODUCTS_BY_SIZES,
    ORDER_PRODUCTS_BY_PRICE,
  } from "../actions/actionTypes";

export const productsReducers = (state = {}, action) => {
  switch (action.type) {
      case FILTER_PRODUCTS_BY_SIZES:
          return {
              ...state,
              size: action.payload.size,
              filteredItems: action.payload.items,
          };
          case ORDER_PRODUCTS_BY_PRICE:
              return {
                  ...state,
                  sort: action.payload.size,
                  filteredItems: action.payload.items,
              }
    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };
    default:
      return state;
  }
};

