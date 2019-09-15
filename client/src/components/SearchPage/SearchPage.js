import React, { Component } from "react";
import { Link } from "react-router-dom";
class SearchPage extends Component {

    render() {

        return (
            <div className="container search-page p-0">
                <div className="row">
                    <div className="d-flex searchType-list py-3 w-100">
                        <Link to="/" className="active">Điện thoại (20)</Link>
                        <Link to="/">Phụ kiện (30)</Link>
                        <Link to="/">Tin tức (100)</Link>
                    </div>
                    <p>Tìm thấy <b>150</b> kết quả với từ khóa "<b>iphone 7</b>"</p>
                </div>
                <div className="row my-3">
                    <div className="col-md-9 pl-0">
                        <h5 className="border-bottom p-3 mb-0 white-background">Điện thoại (20)</h5>
                        <div className="products-list d-flex  white-background ">
                            <div className="product-item ">
                                <Link to="/">
                                    <img className="product-img" src="/img/item/iphone7.png" alt="" />
                                    <div className="product-info p-2">
                                        <p className="product-name">IPhone 7</p>
                                        <p>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <span className="text-muted font-11"> (10 đánh giá)</span>
                                        </p>
                                        <p className="product-price">300đ <span className="old-price text-muted">20.000.000đ</span></p>
                                    </div>
                                </Link>
                            </div>
                            <div className=" product-item ">
                                <Link to="/">
                                    <img className="product-img" src="/img/item/iphone7.png" alt="" />
                                    <div className="product-info p-2">
                                        <p className="product-name">IPhone 7</p>
                                        <p>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <span className="text-muted font-11"> (10 đánh giá)</span>
                                        </p>
                                        <p className="product-price">300đ <span className="old-price text-muted">20.000.000đ</span></p>
                                    </div>
                                </Link>
                            </div>
                            <div className=" product-item ">
                                <Link to="/">
                                    <img className="product-img" src="/img/item/iphone7.png" alt="" />
                                    <div className="product-info p-2">
                                        <p className="product-name">IPhone 7</p>
                                        <p>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <span className="text-muted font-11"> (10 đánh giá)</span>
                                        </p>
                                        <p className="product-price">300đ <span className="old-price text-muted">20.000.000đ</span></p>
                                    </div>
                                </Link>
                            </div>
                            <div className=" product-item ">
                                <Link to="/">
                                    <img className="product-img" src="/img/item/iphone7.png" alt="" />
                                    <div className="product-info p-2">
                                        <p className="product-name">IPhone 7</p>
                                        <p>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <span className="text-muted font-11"> (10 đánh giá)</span>
                                        </p>
                                        <p className="product-price">300đ <span className="old-price text-muted">20.000.000đ</span></p>
                                    </div>
                                </Link>
                            </div>
                            <div className=" product-item ">
                                <Link to="/">
                                    <img className="product-img" src="/img/item/iphone7.png" alt="" />
                                    <div className="product-info p-2">
                                        <p className="product-name">IPhone 7</p>
                                        <p>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <i className="fas fa-star orange font-11"></i>
                                            <span className="text-muted font-11"> (10 đánh giá)</span>
                                        </p>
                                        <p className="product-price">300đ <span className="old-price text-muted">20.000.000đ</span></p>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-3 p-0 h-100">
                        <div className="accessories-list white-background mb-3">
                            <h5 className="border-bottom p-3">Phụ kiện (30)</h5>
                            <div className="accessory-item">
                                <Link to="/"><img src="img/item/phukien-1.png" alt="" /></Link>
                                <div className="accessory-info">
                                    <Link to="/">
                                        <p className="product-name">Tai nghe Vip</p>
                                        <p className="product-price">150.000đ</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="accessory-item">
                                <Link to="/"><img src="img/item/phukien-1.png" alt="" /></Link>
                                <div className="accessory-info">
                                    <Link to="/">
                                        <p className="product-name">Tai nghe Vip</p>
                                        <p className="product-price">150.000đ</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="accessory-item">
                                <Link to="/"><img src="img/item/phukien-1.png" alt="" /></Link>
                                <div className="accessory-info">
                                    <Link to="/">
                                        <p className="product-name">Tai nghe Vip</p>
                                        <p className="product-price">150.000đ</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="accessory-item">
                                <Link to="/"><img src="img/item/phukien-1.png" alt="" /></Link>
                                <div className="accessory-info">
                                    <Link to="/">
                                        <p className="product-name">Tai nghe Vip</p>
                                        <p className="product-price">150.000đ</p>
                                    </Link>
                                </div>
                            </div>
                            <Link to="/" className="text-center w-100 d-block py-2">Xem tất cả</Link>
                        </div>
                        <div className="white-background">
                            <h5 className="border-bottom p-3">Tin tức (100)</h5>
                            <div className="news-Item border-bottom py-3 d-flex">
                                <div className="news-Image">
                                    <img src="/img/news/news-1.png" className="w-100" />
                                </div>
                                <div className="news-Info">
                                    <p>Cách xử lý điện thoại khi rơi xuống nước</p>
                                </div>
                            </div>
                            <div className="news-Item border-bottom py-3 d-flex">
                                <div className="news-Image">
                                    <img src="/img/news/news-1.png" className="w-100" />
                                </div>
                                <div className="news-Info">
                                    <p>Cách xử lý điện thoại khi rơi xuống nước</p>
                                </div>
                            </div>
                            <div className="news-Item border-bottom py-3 d-flex">
                                <div className="news-Image">
                                    <img src="/img/news/news-1.png" className="w-100" />
                                </div>
                                <div className="news-Info">
                                    <p>Cách xử lý điện thoại khi rơi xuống nước</p>
                                </div>
                            </div>
                            <Link to="/" className="text-center w-100 d-block py-2">Xem tất cả</Link>
                        </div>


                    </div>
                </div>
            </div>
        );


    }
}

export default SearchPage;

