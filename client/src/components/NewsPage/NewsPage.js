import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class NewsPage extends Component {

    render() {

        return (
            <div className="white-background">
                <div className="container">
                    <div className="row py-3">
                        <div className="newsType-list d-flex">
                            <NavLink to="/news" className="text-uppercase activ">
                                Tin mới
                            </NavLink>
                            <NavLink to="/news" className="text-uppercase">
                                Tin khuyến mãi
                            </NavLink>
                            <NavLink to="/news" className="text-uppercase">
                                Đánh giá - Tư vấn
                            </NavLink>
                            <NavLink to="/news" className="text-uppercase">
                                Thủ thuật
                            </NavLink>
                            <NavLink to="/news" className="text-uppercase" >
                                Sự kiện
                            </NavLink>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="news-Item border-bottom py-3 d-flex">
                                <div className="news-Image">
                                    <img src="/img/news/news-1.png" className="w-100" />
                                </div>
                                <div className="news-Info">
                                    <h4>Cách xử lý điện thoại khi rơi xuống nước</h4>
                                    <p>Hầu như dòng điện thoại cao cấp đều sở hữu tính năng chống nước. Thế nhưng, đối với các dòng điện thoại phổ thông
                                         thì tính năng này vẫn chưa được trang bị phổ biến. Vậy phải xử lý như thế nào khi những chiếc "dế yêu"</p>
                                    <p className="text-muted">1 ngày trước</p>
                                </div>
                            </div>
                            <div className="news-Item border-bottom py-3 d-flex">
                                <div className="news-Image">
                                    <img src="/img/news/news-2.png" className="w-100" />
                                </div>
                                <div className="news-Info">
                                    <h4>Cách xử lý điện thoại khi rơi xuống nước</h4>
                                    <p>Hầu như dòng điện thoại cao cấp đều sở hữu tính năng chống nước. Thế nhưng, đối với các dòng điện thoại phổ thông
                                         thì tính năng này vẫn chưa được trang bị phổ biến. Vậy phải xử lý như thế nào khi những chiếc "dế yêu"</p>
                                    <p className="text-muted">1 ngày trước</p>
                                </div>
                            </div>
                            <div className="news-Item border-bottom py-3 d-flex">
                                <div className="news-Image">
                                    <img src="/img/news/news-3.png" className="w-100" />
                                </div>
                                <div className="news-Info">
                                    <h4>Cách xử lý điện thoại khi rơi xuống nước</h4>
                                    <p>Hầu như dòng điện thoại cao cấp đều sở hữu tính năng chống nước. Thế nhưng, đối với các dòng điện thoại phổ thông
                                         thì tính năng này vẫn chưa được trang bị phổ biến. Vậy phải xử lý như thế nào khi những chiếc "dế yêu"</p>
                                    <p className="text-muted">1 ngày trước</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 pr-0">
                            <div className="mostViews">
                                <h5 className="border-bottom pb-2">Tin xem nhiều</h5>
                                <div className="mostViews-list">
                                    <div className="mostViews-item d-flex">
                                        <div className="mostView-rank">
                                            1
                                        </div>
                                        <p>iOS 13 chính thức ra mắt ngày 19/9, cần chuẩn bị gì?</p>
                                    </div>
                                    <div className="mostViews-item d-flex">
                                        <div className="mostView-rank">
                                            2
                                        </div>
                                        <p>iOS 13 chính thức ra mắt ngày 19/9, cần chuẩn bị gì?</p>
                                    </div>
                                    <div className="mostViews-item d-flex">
                                        <div className="mostView-rank">
                                            3
                                        </div>
                                        <p>iOS 13 chính thức ra mắt ngày 19/9, cần chuẩn bị gì?</p>
                                    </div>
                                    <div className="mostViews-item d-flex">
                                        <div className="mostView-rank">
                                            4
                                        </div>
                                        <p>iOS 13 chính thức ra mắt ngày 19/9, cần chuẩn bị gì?</p>
                                    </div>
                                    <div className="mostViews-item d-flex">
                                        <div className="mostView-rank">
                                            5
                                        </div>
                                        <p>iOS 13 chính thức ra mắt ngày 19/9, cần chuẩn bị gì?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );


    }
}

export default NewsPage;

