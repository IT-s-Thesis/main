import React, { Component } from "react";
import { Link } from 'react-router-dom';
class AccessoriesPage extends Component {

    render() {

        return (
            <div className="">
                <div className="container py-3">
                    <div className="row my-3 white-background">
                        <div className="accessoriesType-list d-flex">
                            <Link to="/" className="accessoriesType-item text-center p-2">
                                <img alt="" src="img/phukien/pin.png" />
                                <p>Pin sạc</p>
                            </Link>
                            <Link to="/" className="accessoriesType-item text-center p-2">
                                <img alt="" src="img/phukien/tainghe.png" />
                                <p>Tai nghe</p>
                            </Link>
                            <Link to="/" className="accessoriesType-item text-center p-2">
                                <img alt="" src="img/phukien/oplung.png" />
                                <p>Ốp lưng</p>
                            </Link>
                            <Link to="/" className="accessoriesType-item text-center p-2">
                                <img alt="" src="img/phukien/thenho.png" />
                                <p>Thẻ nhớ</p>
                            </Link>
                            <Link to="/" className="accessoriesType-item text-center p-2">
                                <img alt="" src="img/phukien/miengdan.png" />
                                <p>Miếng dán</p>
                            </Link>
                            <Link to="/" className="accessoriesType-item text-center p-2">
                                <img alt="" src="img/phukien/gaytusuong.png" />
                                <p>Gậy tự sướng</p>
                            </Link>
                            <Link to="/" className="accessoriesType-item text-center p-2">
                                <img alt="" src="img/phukien/giado.png" />
                                <p>Giá đỡ</p>
                            </Link>
                            <Link to="/" className="accessoriesType-item text-center p-2">
                                <img alt="" src="img/phukien/tuichongnuoc.png" />
                                <p>Chống nước</p>
                            </Link>
                        </div>
                    </div>
                    <div className="row w">
                        <h5 className="white-background border-right border-top border-left p-3 m-0 w-100">Tất cả phụ kiện</h5>
                    </div>
                    <div className="row white-background border-left border-top">
                        <div className="product-item five-item border-bottom border-right">
                            <Link to="/"><img className="product-img" src="img/item/phukien-1.png" alt="" /></Link>
                            <Link to="/">
                                <div className="product-info p-2">
                                    <p className="product-name">IPhone X 64GB</p>
                                    <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                </div>
                                <div className="buy text-center my-3">
                                    <button type="button" className="btn btn-outline-warning text-uppercase">Mua ngay</button>
                                </div>
                            </Link>
                        </div>
                        <div className="product-item five-item border-bottom border-right">
                            <Link to="/"><img className="product-img" src="img/item/phukien-1.png" alt="" /></Link>
                            <Link to="/">
                                <div className="product-info p-2">
                                    <p className="product-name">IPhone X 64GB</p>
                                    <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                </div>
                                <div className="buy text-center my-3">
                                    <button type="button" className="btn btn-outline-warning text-uppercase">Mua ngay</button>
                                </div>
                            </Link>
                        </div>
                        <div className="product-item five-item border-bottom border-right">
                            <Link to="/"><img className="product-img" src="img/item/phukien-1.png" alt="" /></Link>
                            <Link to="/">
                                <div className="product-info p-2">
                                    <p className="product-name">IPhone X 64GB</p>
                                    <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                </div>
                                <div className="buy text-center my-3">
                                    <button type="button" className="btn btn-outline-warning text-uppercase">Mua ngay</button>
                                </div>
                            </Link>
                        </div>
                        <div className="product-item five-item border-bottom border-right">
                            <Link to="/"><img className="product-img" src="img/item/phukien-1.png" alt="" /></Link>
                            <Link to="/">
                                <div className="product-info p-2">
                                    <p className="product-name">IPhone X 64GB</p>
                                    <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                </div>
                                <div className="buy text-center my-3">
                                    <button type="button" className="btn btn-outline-warning text-uppercase">Mua ngay</button>
                                </div>
                            </Link>
                        </div>
                        <div className="product-item five-item border-bottom border-right">
                            <Link to="/"><img className="product-img" src="img/item/phukien-1.png" alt="" /></Link>
                            <Link to="/">
                                <div className="product-info p-2">
                                    <p className="product-name">IPhone X 64GB</p>
                                    <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                </div>
                                <div className="buy text-center my-3">
                                    <button type="button" className="btn btn-outline-warning text-uppercase">Mua ngay</button>
                                </div>
                            </Link>
                        </div>
                        <div className="product-item five-item border-bottom border-right">
                            <Link to="/"><img className="product-img" src="img/item/phukien-1.png" alt="" /></Link>
                            <Link to="/">
                                <div className="product-info p-2">
                                    <p className="product-name">IPhone X 64GB</p>
                                    <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                </div>
                                <div className="buy text-center my-3">
                                    <button type="button" className="btn btn-outline-warning text-uppercase">Mua ngay</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );


    }
}

export default AccessoriesPage;

