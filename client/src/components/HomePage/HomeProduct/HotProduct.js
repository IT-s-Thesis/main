import React, { Component } from "react";
class HotProduct extends Component {

    render() {

        return (
            <div className="product-box w-100 my-3">
                <div className="box-title text-uppercase">
                    Sản phẩm <span className="green">nổi bật nhất</span>
                </div>
                <div className="row px-3">
                    <div className="col-md-4 product-item">
                        <img src="img/item/hot-1.png" alt="" />
                        <span className="hot-item-title">Sony Xperia XZ Premium 2 SIM - FULLBOX</span>
                    </div>
                    <div className="col-md-4 product-item">
                        <img src="img/item/hot-2.png" alt="" />
                        <span className="hot-item-title ">Sony Z3 2 SIM - Nhỏ Mà Có Võ</span>
                    </div>
                    <div className="col-md-4 product-item">
                        <img src="img/item/hot-3.png" alt="" />
                        <span className="hot-item-title">LG G6 - Vô Đich Trong Tầm Giá</span>
                    </div>
                </div>
            </div>


        );


    }
}

export default HotProduct;

