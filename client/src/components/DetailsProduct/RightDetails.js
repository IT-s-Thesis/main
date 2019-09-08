import React, { Component } from "react";
class RightDetails extends Component {

    render() {
        return (
            <div className="col-md-4">
                <div className="mb-2 pb-2 border-bottom">
                    <h4 className>Thông số kỹ thuật</h4>
                </div>
                <div className="specifications-list mb-4">
                    <div className="specifications-item">
                        <span>Màn hình: </span>
                        <span>IPS LCD, 6.26", HD+</span>
                    </div>
                    <div className="specifications-item">
                        <span>Hệ điều hành: </span>
                        <span>Android 8.1 (Oreo)</span>
                    </div>
                    <div className="specifications-item">
                        <span>Camera sau: </span>
                        <span>Chính 13 MP &amp; Phụ 2 MP</span>
                    </div>
                    <div className="specifications-item">
                        <span>Camera trước: </span>
                        <span>16MP</span>
                    </div>
                    <div className="specifications-item">
                        <span>CPU: </span>
                        <span>Qualcomm Snapdragon 450 8 nhân 64-bit</span>
                    </div>
                    <div className="specifications-item">
                        <span>RAM: </span>
                        <span>3 GB</span>
                    </div>
                    <div className="specifications-item">
                        <span>Bộ nhớ trong: </span>
                        <span>32 GB</span>
                    </div>
                    <div className="specifications-item">
                        <span>Thẻ nhớ: </span>
                        <span>MicroSD, hỗ trợ tối đa 512 GB</span>
                    </div>
                    <div className="specifications-item">
                        <span>Thẻ SIM: </span>
                        <span> 2 Nano SIM, Hỗ trợ 4G</span>
                    </div>
                    <div className="specifications-item">
                        <span>Dung lượng pin: </span>
                        <span>4000 mAh</span>
                    </div>
                </div>
                <div className="accessories-list">
                    <h4>Phụ kiện dành cho Iphone</h4>
                    <div className="accessory-item">
                        <img src="img/item/phukien-1.png" alt="" />
                        <div className="accessory-info">
                            <p className="product-name">Tai nghe Vip</p>
                            <p className="product-price">150.000đ</p>
                        </div>
                    </div>
                    <div className="accessory-item">
                        <img src="img/item/phukien-2.png" alt="" />
                        <div className="accessory-info">
                            <p className="product-name">Tai nghe Vip</p>
                            <p className="product-price">150.000đ</p>
                        </div>
                    </div>
                    <div className="accessory-item">
                        <img src="img/item/phukien-3.png" alt="" />
                        <div className="accessory-info">
                            <p className="product-name">Tai nghe Vip</p>
                            <p className="product-price">150.000đ</p>
                        </div>
                    </div>
                    <div className="accessory-item">
                        <img src="img/item/phukien-4.png" alt="" />
                        <div className="accessory-info">
                            <p className="product-name">Tai nghe Vip</p>
                            <p className="product-price">150.000đ</p>
                        </div>
                    </div>
                </div>
            </div>
        );


    }
}

export default RightDetails;

