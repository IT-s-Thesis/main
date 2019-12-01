import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/index';
class CategoryProductItem extends Component {
    onAddToCart = (product) => {
        this.props.onAddToCart(product);
    }
    render() {
        const { id, name, price, cpu, ram, camera, osystem, pin, screen, image_url } = this.props.product;
        const img = `http://web.manager${image_url}`;
        return (
            <div className="five-item px-0">
                <div className="product-item border-bottom border-right">
                    <Link to={`/details-${id}`}>
                        <img className="product-img" src={img} alt="" />
                        <div className="product-info p-2">
                            <p className="product-name">{name}</p>
                            <p className="product-price">{price}đ</p>
                        </div>
                    </Link>
                    <div className="product-moreInfo">
                        <p>Màn hình:{screen}</p>
                        <p>HĐH: {osystem}</p>
                        <p>CPU: {cpu}</p>
                        <p>RAM: {ram}</p>
                        <p>Camera: {camera}</p>
                        <p>PIN: {pin}</p>
                    </div>
                    <div className="buy text-center my-3">
                        <Link to="/cart"  onClick = {() => this.onAddToCart(this.props.product)}>
                            <button type="button" className="btn btn-outline-warning text-uppercase">Mua ngay</button>
                        </Link>
                    </div>
                </div>
            </div>

        );


    }
}

const mapStateToProps = state => {
    return {
       
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (product) => {
            dispatch(addToCart(product, 1));
          },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductItem);
