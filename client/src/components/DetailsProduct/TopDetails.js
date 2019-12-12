import React, { Component } from "react";
import { connect } from 'react-redux';
import { addToCart } from '../../actions/index';
class TopDetails extends Component {

    onAddToCart = (product) => {
        let $ = window.$;
        if (this.props.details.on_hand > 0) {
            this.props.onAddToCart(product);
            $('#conhang').modal('show');
        }
        else {

            $('#hethang').modal('show');
        }
    }
    goCart = () => {
        this.props.history.push('/cart')
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        
        const { name, image_url, price, on_hand } = this.props.details;
        const img = `http://web.localhost${image_url}`;
        return (
            <div className="container details-product">
                <div className="modal" id="hethang">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Thông Báo</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                Điện thoại này hiện tạm hết hàng, vui lòng quay lại sau. Xin cảm ơn !
      </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="modal" id="conhang">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Thông Báo</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                Điện thoại đã được thêm vào giỏ hàng thành công. Xin cảm ơn !
      </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-info" data-dismiss="modal" onClick={() => this.goCart()}>Vào Giỏ Hàng</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="product-name">
                    <h3>Điện thoại {name}</h3>
                </div>
                <div className="row border-bottom">
                    <div className="col-md-4">
                        <img src={img} className="w-100" alt="" />
                        <div className="details-option text-center m-3">
                            <div className="box-details" data-toggle="modal" data-target="#openAccessoriesBox">
                                <img src="img/detail/open-box.png" alt="" />
                                <p>Mỏ hộp</p>
                                <div className="modal fade" id="openAccessoriesBox" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                <img src="img/banner-1.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="box-details" data-toggle="modal" data-target="#openVideoBox">
                                <img src="img/detail/watch-video.png" alt="" />
                                <p>Video</p>
                                <div className="modal fade" id="openVideoBox" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                <img src="https://cdn.fptshop.com.vn/Uploads/Originals/2019/7/25/636996500529518501_UNBOX%20IPHONE%20XS%20MAX.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-details" data-toggle="modal" data-target="#openFeedback">
                                <img src="img/detail/feedback.png" alt="" />
                                <p>Đánh giá</p>
                                <div className="modal fade" id="openFeedback" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                <img src="img/banner-1.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="float-right pt-1 product-name">{on_hand > 0 ? "Còn Hàng" : "Hết Hàng"}</div>
                        <div className="product-price">
                            <h4>{price}đ</h4>
                        </div>
                        {/* <div className="choose-colors">
                            <p>Bạn đang xem phiên bản: <b>Đỏ</b></p>
                            <div className="colors-list">
                                <div className="product-color text-center active">
                                    <p><i className="fas fa-check-circle green" /> Đỏ</p>
                                    <p className="product-price">7.390.000đ</p>
                                </div>
                                <div className="product-color text-center">
                                    <p><i className="far fa-circle" /> Đen</p>
                                    <p className="product-price">8.000.000đ</p>
                                </div>
                                <div className="product-color text-center">
                                    <p><i className="far fa-circle" /> Trắng</p>
                                    <p className="product-price">7.290.000đ</p>
                                </div>
                            </div>
                        </div> */}
                        <div className="details-promotion mt-3">
                            <p className="text-uppercase font-weight-bold">Khuyến mãi</p>
                            <div className="promotion-list">
                                <p><i className="fas fa-check-circle green" /> Tặng bộ tai nghe, cáp, sạc trị giá 450.000đ</p>
                                <p><i className="fas fa-check-circle green" /> Tặng dán màn hình, ốp lưng trị giá 200.000đ</p>
                                <p><i className="fas fa-check-circle green" /> Giảm ngay 350.000đ (đã trừ vào giá)</p>
                            </div>
                        </div>
                        <div className="product-buy text-center mt-3">

                            <button type="button" className="btn btn-buy" onClick={() => this.onAddToCart(this.props.details)}>
                                <p className="text-uppercase font-weight-bold">Mua ngay</p>
                                <p>Giao hàng miễn phí</p>
                            </button>
                            {/* <button type="button" className="btn btn-installment">
                                <p className="text-uppercase font-weight-bold">Trả góp</p>
                                <p>Xét duyệt qua điện thoại</p>
                            </button> */}
                        </div>
                        <div className="text-center my-2">
                            Gọi <b className="red">1800-0808</b> để được tư vấn mua hàng (Miễn phí)
          </div>
                    </div>
                    <div className="col-md-3">
                        <div className="green text-uppercase font-weight-bold mb-3">Thông tin sản phẩm</div>
                        <div className="details-info">
                            <p className="d-flex ">
                                <i className="fas fa-box-open green pt-2 mr-2" />
                                <span> Phụ kiện đi kèm: Sạc, Sách hướng dẫn, Cáp, Cây lấy sim, Ốp lưng</span>
                            </p>
                            <p className="d-flex">
                                <i className="fas fa-award green pt-2 mr-2" />
                                <span> Bảo hành 12 tháng chính hãng</span>
                            </p>
                            <p className="d-flex">
                                <i className="fas fa-truck green pt-2 mr-2" />
                                <span>Giao hàng miễn phí toàn quốc trong 60 phút</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );


    }
}

const mapStateToProps = state => {
    return {
        details: state.details
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddToCart: (product) => {
            dispatch(addToCart(product, 1));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopDetails);

