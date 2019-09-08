import React, { Component } from "react";
import { connect } from 'react-redux';
import ProductItem from "./ProductItem";
import { Link } from 'react-router-dom';
import { actFetchProductsRequest } from '../../../actions/index';
class ProductList extends Component {

    render() {
        const { products, category, categoryId } = this.props;
        var productsList = "";
        if (products) {
            var count = 0;
            productsList = products.map((product, key) => {
                if (count < 3) {
                    if (product.category_id == categoryId) {
                        count++;
                        return (
                            <ProductItem
                                key={key}
                                product={product}
                            />
                        );
                    }
                }


            });
        }
        return (
            <div className="product-box w-100 my-3">
                <div className="float-right pr-3">
                    <a href>Xem tất cả</a>
                </div>
                <div className="box-title text-uppercase">
                    Điện thoại <span className="green">{category}</span>
                </div>
                <div className="row px-3">
                    <div className="col-md-5 border-right px-0">
                        <div className="big-product">
                            <a href className="product-img"><img src="img/item/iphonex.png" alt="" /></a>
                            <div className="big-info">
                                <div className="big-special">
                                    <i className="fas fa-check-circle"> Thiết kế độc đáo sang trọng</i>
                                    <i className="fas fa-check-circle"> Màn hình vô cực chuẩn điện ảnh</i>
                                </div>
                                <div className="big-sale">
                                    <p className="red-sale">Khuyến mãi</p>
                                    <img className="special-icon" src="img/tragop.png" alt="" />
                                    <img className="special-icon" src="img/baohanh.png" alt="" />
                                </div>
                                {/* <i class="fas fa-gift"></i> */}
                            </div>
                        </div>
                        <div className="product-info p-2">
                            <p className="product-name">IPhone X 64GB</p>
                            <p className="product-price">14.990.000đ</p>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="row h-100 border-top">
                            {productsList}
                        </div>
                    </div>
                </div>
            </div>



        );


    }
}


const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);