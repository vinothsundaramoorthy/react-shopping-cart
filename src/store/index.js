import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import productsReducer  from '../reducers/productReducers';

const initialState= {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        products: productsReducer,
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;