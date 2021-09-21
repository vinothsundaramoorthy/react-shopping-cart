import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from '../reducers/cartReducers';
import { productsReducers }  from '../reducers/productReducers';

const initialState= {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        products: productsReducers,
        cart: cartReducer
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;