import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteCartItem, updateCartItem } from '../../actions/index' 
class CartItem extends Component {
    onDeleteCartItem = (product) => {
      console.log('he');
        this.props.onDeleteCartItem(product);
        // this.props.onChangeMessage(msg.DELETE_CART_SUCCESS);
    }
    onUpdateCartItem = (product, value) => {
        if(value > 0){
        this.props.onUpdateCartItem(product, value);
        }
    }

    render() {
        
        const { name, image_url, price } = this.props.product.product;
        const { qty } = this.props.product;
        const img = `http://web.manager${image_url}`;
        return (
            <div className="cart-item border-bottom">
                <img src={img} className="border" alt="" />
                <div className="product-info mt-2">
                    <p className="product-name">
                        {name}
</p>
                    {/* <div className="form-group">
                        <select className="form-control" >
                            <option>Đỏ</option>
                            <option>Vàng</option>
                            <option>Đen</option>
                        </select>
                    </div> */}
                    <p className="product-price">{price}</p>
                    <p className="product-price">{price*qty}</p>
                </div>
                <div className="d-flex h-100 ml-md-4">
                    <span onClick= {() => this.onUpdateCartItem(this.props.product.product, qty - 1)}
                    className="btn btn-black mx-1">-</span>
                    <span className="btn btn-black mx-1">{qty}</span>
                    <span onClick= {() => this.onUpdateCartItem(this.props.product.product, qty + 1)}
                     className="btn btn-black mx-1">+</span>
                </div>
                <div className="d-flex justify-content-center align-items-center pr-md-3 pr-0">
                   
                   <p  onClick={() => this.onDeleteCartItem(this.props.product)}
                   ><i className="fas fa-times" /></p> 
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
  const mapDispatchtoProps = (dispatch, props) => {
    return {
      onDeleteCartItem: (product) => {
        dispatch(deleteCartItem(product));
      },
    //   onChangeMessage: (message) => {
    //     dispatch(changeMessage(message));
    //   },
      onUpdateCartItem: (product, value) => {
        dispatch(updateCartItem(product, value));
      }
    };
  };
  export default connect(mapStatetoProps, mapDispatchtoProps)(CartItem);
  

