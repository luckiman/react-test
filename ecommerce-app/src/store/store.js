import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/productReducer';
import cartReducer from '../reducers/cartReducer';

// Configure the store with the reducers and middleware
const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer
    }
});

export default store;
