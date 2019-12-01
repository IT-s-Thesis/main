import React, { Component } from "react";
import { connect } from "react-redux";

class CartTotal extends Component {
    showTotalPrice(cart) {
        var total = 0;
        if (cart.length > 0) {
            for (let i = 0; i < cart.length; i++)
                total += cart[i].product.price * cart[i].qty;
        }
        return total;
    };

    render() {
        const { cart } = this.props;
        return (
            <div className="total-price">
                <div className="label">
                    {/* <p>Tạm tính:</p>
                    <p>Khuyến mãi:</p> */}
                    <p><b>Tổng tiền:</b></p>
                </div>
                <div className="number">
                    {/* <p className="red">{this.showTotalPrice(cart)}</p>
                    <small className="sale">-0đ</small> */}
                    <p className="red">{this.showTotalPrice(cart)}</p>
                </div>
            </div>
        );


    }
}



const mapStatetoProps = state => {
    return {
        cart: state.cart
    };
};
export default connect(mapStatetoProps)(CartTotal);;
