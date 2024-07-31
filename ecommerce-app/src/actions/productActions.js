import axios from '../api'; // Use the central Axios instance
import { FETCH_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART } from './types';

export const fetchProducts = () => async (dispatch) => {
    try{
        const res = await axios.get('/products');
        dispatch({
            type: FETCH_PRODUCTS,
            payload: res.data
        });
    }catch(e){
        dispatch({
            type: FETCH_PRODUCTS,
            payload: []
        });
    }
};

export const addToCart = (product) => (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload: product
    });
};

export const removeFromCart = (productId) => (dispatch) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: productId
    });
};
