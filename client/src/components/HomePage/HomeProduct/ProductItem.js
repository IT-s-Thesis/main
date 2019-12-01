import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
class ProductItem extends Component {

    render() {
        const { id, name, image_url, price } = this.props.product;
        const img = `http://web.manager${image_url}`;
        return (
            <div className="col-md-3 col-6 product-item border-right border-top d-block">
                <NavLink to={`/details-${id}`}>
                <img className="product-img" src={img} alt="" />
                <div className="product-info p-2">
                    <p className="product-name">{name}</p>
                    <p>
                        <i className="fas fa-star orange font-11"></i>
                        <i className="fas fa-star orange font-11"></i>
                        <i className="fas fa-star orange font-11"></i>
                        <i className="fas fa-star orange font-11"></i>
                        <i className="fas fa-star orange font-11"></i>
                        <span className="text-muted font-11"> (10 đánh giá)</span>
                    </p>
                    <p className="product-price">{price}đ <span className="old-price text-muted">20.000.000đ</span></p>
                </div>
                </NavLink>
            </div>
        );


    }
}

export default ProductItem;

