import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../actions/productActions';
import './styles/Cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                    <h3>{item.name}</h3>
                    <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
