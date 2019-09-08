import React, { Component } from "react";
class CategoryProductItem extends Component {

    render() {
        const { product_name, product_price, product_img } = this.props.product;
        return (
            <div className="col-md-3 px-0">
                    <div className="product-item border-bottom border-right">
                        <img className="product-img" src={product_img} alt="" />
                        <div className="product-info p-2">
                            <p className="product-name">{product_name}</p>
                            <p className="product-price">{product_price}đ</p>
                        </div>
                        <div className="product-moreInfo">
                            <p>Màn hình: 6.4"</p>
                            <p>HĐH: IOS</p>
                            <p>CPU: Quadpro</p>
                            <p>RAM: 2GB</p>
                            <p>Camera: 2MP</p>
                            <p>PIN: 4000 mAh</p>
                        </div>
                        <div className="buy text-center mt-2">
                            <button type="button" className="btn btn-outline-warning text-uppercase">Mua ngay</button>
                            <button type="button" className="btn btn-outline-primary text-uppercase">Mua Trả góp</button>
                        </div>
                    </div>
                </div>

        );


    }
}

export default CategoryProductItem;

