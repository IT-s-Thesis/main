import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
class ProductItem extends Component {

    render() {
        const { id, product_name, product_img, product_price } = this.props.product;
        return (
            <div className="col-md-4 col-6 product-item border-right">
                <NavLink to={`/details-${id}`}>
                <img className="product-img" src={product_img} alt="" />
                <div className="product-info p-2">
                    <p className="product-name">{product_name}</p>
                    <p className="product-price">{product_price}đ <span className="old-price text-muted">20.000.000đ</span></p>
                </div>
                </NavLink>
            </div>
        );


    }
}

export default ProductItem;

