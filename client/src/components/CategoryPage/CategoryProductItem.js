import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
class CategoryProductItem extends Component {

    render() {
        const { id, product_name, product_price, product_img } = this.props.product;
        return (
            <div className="five-item px-0">
                <div className="product-item border-bottom border-right">
                    <Link to={`/details-${id}`}>
                        <img className="product-img" src={`/${product_img}`} alt="" />
                        <div className="product-info p-2">
                            <p className="product-name">{product_name}</p>
                            <p className="product-price">{product_price}đ</p>
                        </div>
                    </Link>
                    <div className="product-moreInfo">
                        <p>Màn hình: 6.4"</p>
                        <p>HĐH: IOS</p>
                        <p>CPU: Quadpro</p>
                        <p>RAM: 2GB</p>
                        <p>Camera: 2MP</p>
                        <p>PIN: 4000 mAh</p>
                    </div>
                    <div className="buy text-center my-3">
                        <Link to="/cart">
                            <button type="button" className="btn btn-outline-warning text-uppercase">Mua ngay</button>
                        </Link>
                    </div>
                </div>
            </div>

        );


    }
}

export default withRouter(CategoryProductItem);

