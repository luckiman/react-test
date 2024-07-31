import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../api'; // Use the central Axios instance
import './styles/Checkout.css';

const Checkout = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const cartItems = useSelector(state => state.cart.items);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/checkout', { user, cartItems });
        alert('Order placed successfully');
    };

    return (
        <form className='checkout' onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
            <button type="submit">Place Order</button>
        </form>
    );
};

export default Checkout;
