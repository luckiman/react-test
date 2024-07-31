import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import ProductRow from './ProductRow';
import './styles/ProductList.css';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (!Array.isArray(products)) {
        return <div>Loading...</div>; // or handle the error accordingly
    }

    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    return (
        <div className="product-list">
            {Object.keys(groupedProducts).map((category) => (
                <div key={category} className="category-section">
                    <h2>{category}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Add to Cart</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedProducts[category].map((product) => (
                                <ProductRow key={product.id} product={product} />
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
