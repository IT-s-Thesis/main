import React, { Component } from "react";

class LeftBanner extends Component {

    render() {

        return (
            <div className="col-md-8 col-12 left-banner p-0 mt-3">
                <div id="main-banner" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <a href><img src="img/banner-1.png" alt="" /></a>
                        </div>
                        <div className="carousel-item">
                            <a href><img src="img/banner-2.png" alt="" /></a>
                        </div>
                        <div className="carousel-item">
                            <a href><img src="img/banner-3.png" alt="" /></a>
                        </div>
                        <div className="carousel-item">
                            <a href><img src="img/banner-4.png" alt="" /></a>
                        </div>
                        <div className="carousel-item">
                            <a href><img src="img/banner-5.png" alt="" /></a>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#main-banner" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#main-banner" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <div className="select-banner text-center carousel-indicators">
                    <div data-target="#main-banner" data-slide-to={0} className="active"> Đặt trước Galaxy A50s
                    </div>
                    <div data-target="#main-banner" data-slide-to={1}>Sắm OPPO trả góp 0%</div>
                    <div data-target="#main-banner" data-slide-to={2}>Iphone Giảm đến 1,5 triệu</div>
                    <div data-target="#main-banner" data-slide-to={3}>HUAWEL trả góp 0%</div>
                    <div data-target="#main-banner" data-slide-to={4}>Real C2 độc quyền</div>
                </div>
            </div>

        );


    }
}

export default LeftBanner;

