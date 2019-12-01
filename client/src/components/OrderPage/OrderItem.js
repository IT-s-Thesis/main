import React, { Component } from "react";
class OrderItem extends Component {

    render() {
        const { item } = this.props;
        // console.log(item);
        return (
            <div className="cart-item border-bottom">
            <div className="product-info mt-2 w-100">
        <div className="product-name">{item.product}</div>
                <span className="product-name">Số lượng: {item.qty} ............. </span>
                <span className="product-name">Đơn giá: <span className="product-price">{item.price} VNĐ</span></span>
            </div>
     

        </div>
        );


    }
}



export default OrderItem;
