import { FETCH_PRODUCTS } from "../actions/actionTypes";

const productsReducers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { items: action.payload };
    default:
      return state;
  }
};

export default productsReducers;
