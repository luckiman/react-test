import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/productActions';
import './styles/ProductRow.css';

const ProductRow = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <tr>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>
                <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            </td>
        </tr>
    );
};

export default ProductRow;
