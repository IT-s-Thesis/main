import React, { Component } from "react";

class RightBanner extends Component {

    render() {

        return (
            <div className="col-md-4 w-100 pr-0">
                <div className="right-banner mt-3">
                    <img src="img/right-banner-1.png " alt="" className="mb-2" />
                    <img src="img/right-banner-2.png " alt="" className="mb-2" />
                </div>
                <div className="tech-info">
                    <div className="tech-title mb-2">
                        <span className="red">TIN CÔNG NGHỆ NỔI BẬT</span>
                        <a className="float-right" href>Xem tất cả</a>
                    </div>
                    <a href className="tech-item">
                        <img src="img/tech-1.png" alt="" height="60px" />
                        <span className="tech-item-title">Sony sẽ cho ra mắt một smartphone "vừa vặn trong tầm tay
              bạn</span>
                    </a>
                    <a href className="tech-item">
                        <img src="img/tech-1.png" alt="" height="60px" />
                        <span className="tech-item-title">Sony sẽ cho ra mắt một smartphone "vừa vặn trong tầm tay
              bạn</span>
                    </a>
                </div>
            </div>


        );


    }
}

export default RightBanner;

