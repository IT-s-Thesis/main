import React, { Component } from "react";
import { Link } from 'react-router-dom';
class RightBanner extends Component {

    render() {

        return (
            <div className="col-md-4 w-100 pr-0">
                <div className="right-banner mt-3">
                    <Link to="/"><img src="img/right-banner-1.png " alt="" className="mb-2" /></Link>
                    <Link to="/"><img src="img/right-banner-2.png " alt="" className="mb-2" /></Link>
                </div>
                <div className="tech-info">
                    <div className="tech-title mb-2">
                        <span className="red">TIN CÔNG NGHỆ NỔI BẬT</span>
                        <Link className="float-right" to="/">Xem tất cả</Link>
                    </div>
                    <Link to="/" className="tech-item">
                        <img src="img/tech-1.png" alt="" height="60px" />
                        <span className="tech-item-title">Sony sẽ cho ra mắt một smartphone "vừa vặn trong tầm tay
              bạn</span>
                    </Link>
                    <Link to="/" className="tech-item">
                        <img src="img/tech-1.png" alt="" height="60px" />
                        <span className="tech-item-title">Sony sẽ cho ra mắt một smartphone "vừa vặn trong tầm tay
              bạn</span>
                    </Link>
                </div>
            </div>


        );


    }
}

export default RightBanner;

