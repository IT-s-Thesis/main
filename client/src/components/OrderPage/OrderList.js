import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { actCheckOrderRequest } from '../../actions/index';
import OrderItem from './OrderItem';
import { connect } from "react-redux";

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: "",
            token: "",
            msg: "",
            notFound: ""
        };
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        const { code, token } = this.props.match.params;
        if (code && token) {
            this.setState({
                orderId: code,
                token: token
            });
            this.props.onCheckOrder(code, token);
        }
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            msg: "",
        });
    }
    onCheckOrder = () => {
        const { orderId, token } = this.state;
        if (orderId !== "" && token !== "") {
            this.props.onCheckOrder(orderId, token);
        }
        else {
            // this.props.order = "";
            this.setState({
                msg: "Vui lòng nhập đầy đủ mã đơn hàng và mã token",
                notFound: ""
            })
        }

    }

    render() {

        const { token, orderId, notFound, msg } = this.state;
        const { order } = this.props;
        let address = "";
        let customer_name = "";
        let phone = "";
        let state = "";
        let orderItem = "";
        let total = "";
        if (order.name) {
            address = order.address;
            customer_name = order.customer_name;
            phone = order.phone;
            if (order.state === "order")
                state = "Mới đặt hàng";
            else if (order.state === "delivery")
                state = "Đang Giao";
            else if (order.state === "done")
                state = "Đã giao";
            else state = "Đã hủy";
            orderItem = order.order_lines.map(function (item, index) {
                return (
                    <OrderItem item={item} key={index} />
                );
            });
            total = <div className="text-right pt-2"><h5>Tổng tiền: <p className="product-price">{order.total} VNĐ </p></h5></div>
        }
        return (
            <div className="container cart-page">
                <div className="row">
                    <div className="col-lg-2 col-md-0" />
                    <div className="col-lg-8 col-md-12 p-0">
                        <div className="row p-md-4 p-lg-0">
                            <div className="col-lg-1 col-md-0 p-0" />
                            <div className="col-lg-10 col-md-12 mobile-fix">
                                <div className="mb-2 mt-4">
                                    <Link to="/" className="float-right">Quay lại trang chủ</Link>
                                    <h5>Kiểm Tra Đơn Hàng</h5>
                                </div>
                                <div className="shopping-cart white-background">
                                    <form>
                                        <div className="customer-box">
                                            <div className="customer-info p-3">
                                                <div>
                                                </div>
                                                <div className="customer-name">
                                                    <div className="form-group">
                                                        <input name="orderId" value={orderId} onChange={this.handleChange}
                                                            type="text" className="form-control" placeholder="Mã đơn hàng" aria-describedby="helpId" />
                                                    </div>
                                                </div>
                                                <div className="customer-phone">
                                                    <div className="form-group">
                                                        <input name="token" value={token} onChange={this.handleChange}
                                                            type="text" className="form-control" placeholder="Mã Token" aria-describedby="helpId" />
                                                    </div>
                                                </div>
                                                <i>  <small>Nhập vào mã đơn hàng và mã token được gửi đến E-mail để kiểm tra tình trạng đơn hàng của bạn</small>
                                                </i>
                                                <p className="red">{msg !== "" ? msg : ""}</p>
                                                <p className="red">{notFound !== "" ? notFound : ""}</p>
                                            </div>
                                        </div>

                                        <div className="product-buy text-sm-center pb-3">
                                            {token && orderId ? (<Link to={`/order/code=${orderId}&token=${token}`}>
                                                <button onClick={() => this.onCheckOrder()}
                                                    type="button" className="btn btn-installment">
                                                    <p className="text-uppercase font-weight-bold">Kiểm Tra</p>
                                                    {/* <p>Bằng thẻ Paypal</p> */}
                                                </button>
                                            </Link>) : (<button onClick={() => this.onCheckOrder()}
                                                type="button" className="btn btn-installment">
                                                <p className="text-uppercase font-weight-bold">Kiểm Tra</p>
                                                {/* <p>Bằng thẻ Paypal</p> */}
                                            </button>)}

                                        </div>
                                    </form>


                                    <div className="customer-box border-top">
                                        <div className="text-center pt-3"><h5>Thông Tin Đơn Hàng</h5></div>


                                        <div className="customer-info p-3">
                                            <div className="customer-name">
                                                <label>Họ tên người nhận:</label>
                                                <div className="form-group">
                                                    <input type="text" value={customer_name} disabled
                                                        className="form-control" placeholder="Họ và tên" aria-describedby="helpId" />
                                                </div>
                                            </div>
                                            <div className="customer-phone">
                                                <label>Số điện thoại:</label>
                                                <div className="form-group">
                                                    <input value={phone} disabled
                                                        type="text" className="form-control" placeholder="Số điện thoại" aria-describedby="helpId" />
                                                </div>
                                            </div>
                                            <div className="customer-email pr-2">
                                                <label>Địa chỉ giao hàng:</label>
                                                <div className="form-group">
                                                    <input value={address} disabled
                                                        type="email" className="form-control" aria-describedby="emailHelpId" placeholder="Địa chỉ giao hàng" />
                                                    {/* <small><i>Chi tiết đơn hàng sẽ được gửi vào E-mail</i></small> */}
                                                </div>
                                            </div>
                                            <div className="customer-email pr-2">
                                                <label>Tình trạng đơn hàng:</label>
                                                <div className="form-group w-50 text-center">

                                                    <input value={state} disabled
                                                        type="email" className="form-control" aria-describedby="emailHelpId" placeholder="Tình trạng đơn hàng" />
                                                    {/* <small><i>Chi tiết đơn hàng sẽ được gửi vào E-mail</i></small> */}
                                                </div>
                                            </div>
                                            {orderItem ? (<p className="text-center font-weight-bold">Danh sách sản phẩm: </p>) : ""}
                                            {orderItem ? (<div>{orderItem}</div>) : ""}
                                            {total ? total : ""}
                                        </div>
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
        order: state.order
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onCheckOrder: (orderId, token) => {
            dispatch(actCheckOrderRequest(orderId, token));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
