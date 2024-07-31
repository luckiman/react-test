import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/productActions";
import "./styles/Product.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product">
      {/* <div className="product-details"> */}
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <button onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </button>
      {/* </div> */}
    </div>
  );
};

export default Product;
