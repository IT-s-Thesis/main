import React, { Component } from "react";
import { Link } from 'react-router-dom';
class CartPage extends Component {

    render() {

        return (
            <div className="container cart-page">
                <div className="row">
                    <div className="col-lg-2 col-md-0" />   
                    <div className="col-lg-8 col-md-12 p-0">
                        <div className="row p-md-4 p-lg-0">
                            <div className="col-lg-1 col-md-0 p-0" />
                            <div className="col-lg-10 col-md-12 mobile-fix">
                                <div className="mb-2 mt-4">
                                    <Link to="/" className="float-right">Mua thêm sản phẩm khác</Link>
                                    <h5>Giỏ hàng của bạn (2 sản phẩm)</h5>
                                </div>
                                <div className="shopping-cart white-background">
                                    <div className="cart-item border-bottom">
                                        <img src="img/item/iphone7.png" className="border" alt="" />
                                        <div className="product-info mt-2">
                                            <p className="product-name">
                                                Samsung Galaxy A7 2018
                          </p>
                                            <div className="form-group">
                                                <select className="form-control" >
                                                    <option>Đỏ</option>
                                                    <option>Vàng</option>
                                                    <option>Đen</option>
                                                </select>
                                            </div>
                                            <p className="product-price">7.900.000đ</p>
                                        </div>
                                        <div className="d-flex h-100 ml-md-4">
                                            <span className="btn btn-black mx-1">-</span>
                                            <span className="btn btn-black mx-1" />
                                            <span className="btn btn-black mx-1">+</span>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center pr-md-3 pr-0">
                                            <i className="fas fa-times" />
                                        </div>
                                    </div>
                                    <div className="cart-item border-bottom">
                                        <img src="img/item/iphone7.png" className="border" alt="" />
                                        <div className="product-info mt-2">
                                            <p className="product-name">
                                                Samsung Galaxy A7 2018
                          </p>
                                            <div className="form-group">
                                                <select className="form-control" >
                                                    <option>Đỏ</option>
                                                    <option>Vàng</option>
                                                    <option>Đen</option>
                                                </select>
                                            </div>
                                            <p className="product-price">7.900.000đ</p>
                                        </div>
                                        <div className="d-flex h-100 ml-md-4">
                                            <span className="btn btn-black mx-1">-</span>
                                            <span className="btn btn-black mx-1" />
                                            <span className="btn btn-black mx-1">+</span>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center pr-md-3 pr-0">
                                            <i className="fas fa-times" />
                                        </div>
                                    </div>
                                    <div className="total-price">
                                        <div className="label">
                                            <p>Tạm tính:</p>
                                            <p>Khuyến mãi:</p>
                                            <p><b>Tổng tiền:</b></p>
                                        </div>
                                        <div className="number">
                                            <p className="red">6.900.000đ</p>
                                            <small className="sale">-1.000.000đ</small>
                                            <p className="red">5.900.000đ</p>
                                        </div>
                                    </div>
                                    <div className="customer-box border-top">
                                        <div className="customer-info p-3">
                                            <div className="customer-name">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Họ và tên" aria-describedby="helpId" />
                                                </div>
                                            </div>
                                            <div className="customer-phone">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Số điện thoại" aria-describedby="helpId" />
                                                </div>
                                            </div>
                                            <div className="customer-email pr-2">
                                                <div className="form-group">
                                                    <input type="email" className="form-control" aria-describedby="emailHelpId" placeholder="E-mail (Không bắt buộc)" />
                                                    <small><i>Chi tiết đơn hàng sẽ được gửi vào E-mail</i></small>
                                                </div>
                                            </div>
                                            <div className="customer-address">
                                                <p><b>Để được phục vụ nhanh hơn,</b> hãy chọn thêm:</p>
                                                <form className="mt-1">
                                                    <input type="radio" name="type-buy" defaultValue="home"  defaultChecked/> Địa chỉ giao hàng
                                                    <input type="radio" className="ml-3" name="type-buy" defaultValue="store" /> Nhận tại siêu thị

                                                </form>
                                                <div className="px-2 mt-2">
                                                    <div className="city p-3">
                                                        <select className="form-control">
                                                            <option defaultValue>TP. Hồ Chí Minh</option>    
                                                        </select>
                                                        <select className="form-control">
                                                            <option defaultValue>Chọn quận, huyện</option>    
                                                        </select>
                                                        <select className="form-control">
                                                            <option defaultValue>Chọn phường, xã</option>    
                                                        </select>
                                                        <input type="text" className="form-control" placeholder="Nhập số nhà, tên đường" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-buy text-sm-center p-3">
                                        <button type="button" className="btn btn-buy">
                                            <p className="text-uppercase font-weight-bold">Thanh toán khi nhận hàng</p>
                                            <p>Xem hàng trước, không mua không sao</p>
                                        </button>
                                        <button type="button" className="btn btn-installment">
                                            <p className="text-uppercase font-weight-bold">Thanh toán online</p>
                                            <p>Bằng thẻ Paypal</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-0" />
                </div>
            </div>
        );


    }
}

export default CartPage;

