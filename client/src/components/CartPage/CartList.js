import React, { Component } from "react";

import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import { connect } from "react-redux";

class CartList extends Component {
    render() {
        const { cart } = this.props;
        var cartList = "";
        if (cart) {
            cartList = cart.map((product, key) => {
                        return (
                            <CartItem
                                key={key}
                                product={product}
                            />
                        );
            });
        }
        return (
            <React.Fragment>
                {cartList}
                <CartTotal />
            </React.Fragment>
      
        );


    }
}



const mapStatetoProps = state => {
    return {
      cart: state.cart
    };
  };
  const mapDispatchtoProps = (dispatch, props) => {
    return {
    //   onDeleteCartItem: (product) => {
    //     dispatch(deleteCartItem(product));
    //   },
    //   onChangeMessage: (message) => {
    //     dispatch(changeMessage(message));
    //   },
    //   onUpdateCartItem: (product, value) => {
    //     dispatch(updateCartItem(product, value));
    //   }
    };
  };
  export default connect(mapStatetoProps, mapDispatchtoProps)(CartList);
  