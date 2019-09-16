import React, { Component } from "react";
import { Link } from 'react-router-dom';

class HomeAccessories extends Component {
    componentDidMount() {
        const $ = window.$;
        $(document).ready(function () {
            $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                dots: false,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 2
                    },
                    576: {
                        items: 2
                    },
                    767: {
                        items: 3
                    },
                    991: {
                        items: 4
                    },
                    1200: {
                        items: 5
                    }
                }
            })
        });
    }
    render() {

        return (
            <div className="product-box w-100 my-3">
                <div className="float-right pr-3">
                    <Link to="/">Xem tất cả</Link>
                </div>
                <div className="box-title text-uppercase">
                    Phụ kiện <span className="green">Giá rẻ</span>
                </div>
                <div className="row px-3">
                    <div className="owl-carousel owl-theme">
                        <div className="product-item">
                            <Link to="/"><img className="product-img" src="img/item/phukien-1.png" alt="" /></Link>
                            <Link to="/">
                                <div className="product-info p-2">
                                    <p className="product-name">IPhone X 64GB</p>
                                    <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className="product-item">
                            <Link to="/"><img className="product-img" src="img/item/phukien-2.png" alt="" /></Link>
                            <Link to="/">
                                <div className="product-info p-2">
                                    <p className="product-name">IPhone X 64GB</p>
                                    <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className="product-item">
                            <Link to="/"><img className="product-img" src="img/item/phukien-3.png" alt="" /></Link>
                            <Link to="/">
                                <div className="product-info p-2">
                                    <p className="product-name">IPhone X 64GB</p>
                                    <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className="product-item">
                            <Link to="/"><img className="product-img" src="img/item/phukien-4.png" alt="" /></Link>
                            <Link to="/">
                                <div className="product-info p-2">
                                    <p className="product-name">IPhone X 64GB</p>
                                    <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className="product-item">
                            <Link to="/"><img className="product-img" src="img/item/phukien-5.png" alt="" /></Link>
                            <Link to="/">
                                <div className="product-info p-2">
                                    <p className="product-name">IPhone X 64GB</p>
                                    <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        );


    }
}

export default HomeAccessories;

