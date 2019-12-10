import React, { Component } from "react";
import CartList from "./CartList";
import { Link } from 'react-router-dom';
import { actAddOrderRequest } from './../../actions/index';
import { connect } from "react-redux";
// import axios from 'axios';
class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            gender: "male",
            payment: "cod",
            address: "",
            msg: false
        };
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        // axios.get('https://api.mysupership.vn/v1/partner/areas/province')
        //     .then(function (response) {
        //         // handle success
        //         console.log(response.data);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }
    show1 = () => {
        document.getElementById('transfer').style.display = 'none';
    }
    show2 = () => {
        document.getElementById('transfer').style.display = 'block';
    }
    onAddOrder = () => {
        let order_lines = [];
        const { email, name, phone, address, gender, payment } = this.state;
        this.props.cart.map(function (item) {
            let arrItem = {
                product_id: item.product.id,
                qty: item.qty,
                price: item.product.price
            }
            order_lines.push(arrItem);
        });
        if (email !== "" && name !== "" && phone !== "" && address !== "") {
            let orderInfo = {
                email: email,
                name: name,
                phone: phone,
                contact_address: address,
                gender: gender,
                payment_method: payment,
                order_lines: order_lines
            }
            let json = JSON.stringify(orderInfo);
            this.props.onAddOrder(json);
            localStorage.removeItem('cart');
            this.setState({
                msg: false
            });
            let $ = window.$;
            $('#myModal').modal('show');
        }
        else {
            this.setState({
                msg: true
            });
        }
    }
    backHome = () => {
        let $ = window.$;
        $('#myModal').modal('hide');
        // this.props.history.push('/');
        window.location.href = "http://localhost:5001";
    }
    render() {
        const { address, phone, name, email, msg, payment, gender } = this.state;
        let check = "";
        if (msg) {
            check = <p className="red">Vui lòng nhập đầy đủ thông tin</p>;
        }
        if (this.props.cart.length === 0) {
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
                                        <h5>Giỏ hàng của bạn rỗng</h5>
                                    </div>
                                    <div className="shopping-cart white-background">
                                        <img alt="" src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png" className="w-100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-0" />
                    </div>
                </div>

            );
        }
        return (
            <div className="container cart-page">

                <div className="modal" id="myModal" data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <h5>Đặt Hàng Thành Công !</h5>
                                <p>Thông tin đơn hàng đã được gửi vào E-mail.
                                Chúng tôi sẽ liên lạc với bạn qua số điện thoại trong thời gian sớm nhất...</p>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button type="button" className="btn btn-danger text-center" onClick={() => this.backHome()}>Quay về trang chủ</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2 col-md-0" />
                    <div className="col-lg-8 col-md-12 p-0">
                        <div className="row p-md-4 p-lg-0">
                            <div className="col-lg-1 col-md-0 p-0" />
                            <div className="col-lg-10 col-md-12 mobile-fix">
                                <div className="mb-2 mt-4">
                                    <Link to="/" className="float-right">Mua thêm sản phẩm khác</Link>
                                    <h5>Giỏ hàng của bạn ({this.props.cart.length} sản phẩm)</h5>
                                </div>
                                <div className="shopping-cart white-background">
                                    <CartList />
                                    <div className="py-3 text-center"><h5>Thông Tin Giao Hàng</h5></div>
                                    <div className="customer-box border-top">
                                        <div className="customer-info p-3">
                                            <div className="customer-gender mb-2">
                                                <input type="radio" checked={gender === "male"}
                                                    value="male" onChange={this.handleChange} name="gender" /> Anh
                                                <input type="radio" checked={gender === "female"}
                                                    value="female" onChange={this.handleChange} className="ml-4" name="gender" /> Chị
                                            </div>
                                            <div className="customer-name">
                                                <div className="form-group">
                                                    <input name="name" value={name} onChange={this.handleChange}
                                                        type="text" className="form-control" placeholder="Họ và tên" aria-describedby="helpId" />
                                                </div>
                                            </div>
                                            <div className="customer-phone">
                                                <div className="form-group">
                                                    <input name="phone" value={phone} onChange={this.handleChange}
                                                        type="number" className="form-control" placeholder="Số điện thoại" aria-describedby="helpId" />
                                                </div>
                                            </div>
                                            <div className="customer-email pr-2">
                                                <div className="form-group">
                                                    <input name="email" value={email} onChange={this.handleChange}
                                                        type="email" className="form-control" aria-describedby="emailHelpId" placeholder="E-mail" />
                                                    <small><i>Chi tiết đơn hàng sẽ được gửi vào E-mail</i></small>
                                                </div>
                                            </div>
                                            <div className="customer-address pr-2">
                                                <div className="form-group">
                                                    <input name="address" value={address} onChange={this.handleChange}
                                                        type="text" className="form-control" aria-describedby="emailHelpId" placeholder="Địa chỉ giao hàng" />
                                                </div>
                                            </div>
                                            <h5>Hình thức thanh toán:</h5>
                                            <div className="customer-payment mb-2">
                                                <input type="radio" checked={payment === "cod"} onClick={() => this.show1()}
                                                    value="cod" onChange={this.handleChange} name="payment" /> Thanh toán khi nhận hàng
                                                <input type="radio" checked={payment === "transfer"}
                                                    onClick={() => this.show2()}
                                                    value="transfer" onChange={this.handleChange} className="ml-4" name="payment" /> Chuyển khoản
                                            </div>
                                            <div id="transfer" className="collapse hide border-bottom pb-2">
                                                <p className=" pb-3 my-3">Chuyển qua ngân hàng ACB cho chúng tôi theo thông tin: </p>
                                                <p><span>Tên ngân hàng: </span><b> Ngân hàng ACB An Dương Vương Quận 5</b></p>
                                                <p><span>Chủ tài khoản: </span><b> Nhóm SGU</b></p>
                                                <p><span>Số tài khoản: </span><b> 0123456789</b></p>
                                                <p><span>Nội dung: </span><b> Mua điện thoại - Tên khách hàng - Tên sản phẩm - Số điện thoại</b></p>
                                            </div>
                                            {/* <div className="customer-address">
                                                <p><b>Để được phục vụ nhanh hơn,</b> hãy chọn thêm:</p>
                                                <form className="mt-1">
                                                    <input type="radio" name="type-buy" defaultValue="home" defaultChecked /> Địa chỉ giao hàng
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
                                         */}
                                        </div>
                                    </div>
                                    {check}
                                    <div className="product-buy text-sm-center p-3">
                                        <button onClick={() => this.onAddOrder(this.props.cart)}
                                            type="button" className="btn btn-buy">
                                            <p className="text-uppercase font-weight-bold">Đặt hàng</p>
                                            <p>Đổi trả trong vòng 7 ngày</p>
                                        </button>
                                        {/* <button type="button" className="btn btn-installment">
                                            <p className="text-uppercase font-weight-bold">Thanh toán online</p>
                                            <p>Bằng thẻ Paypal</p>
                                        </button> */}
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



const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddOrder: (product) => {
            dispatch(actAddOrderRequest(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
