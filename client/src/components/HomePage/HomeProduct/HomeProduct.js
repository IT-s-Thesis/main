import React, { Component } from "react";
import HotProduct from "./HotProduct";
import ProductList from "./ProductList";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchProductsRequest, actFetchCategoriesRequest } from '../../../actions/index';
const $ = window.$;
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

class HomeProduct extends Component {
    componentDidMount() {
        this.props.fetchAllProducts();
        this.props.fetchAllCategories();
    }
    render() {
        const { categories } = this.props;
        var categoriesList = "";
        if (categories) {
            categoriesList = categories.map((category, index) => {
                return (
                    <ProductList
                        key={index}
                        category = {category.category_name}
                        categoryId = {category.id}
                    />
                );
            });
        }
        return (
            <div className="container ">
                <div className="row p-0">
                    <HotProduct />
                    {categoriesList}
                    <div className="product-box w-100 my-3">
                        <div className="float-right pr-3">
                            <a href>Xem tất cả</a>
                        </div>
                        <div className="box-title text-uppercase">
                            Phụ kiện <span className="green">Giá rẻ</span>
                        </div>
                        <div className="row px-3">
                            <div className="owl-carousel owl-theme">
                                <div className="product-item">
                                    <img className="product-img" src="img/item/phukien-1.png" alt="" />
                                    <div className="product-info p-2">
                                        <p className="product-name">IPhone X 64GB</p>
                                        <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                    </div>
                                </div>
                                <div className="product-item">
                                    <img className="product-img" src="img/item/phukien-2.png" alt="" />
                                    <div className="product-info p-2">
                                        <p className="product-name">IPhone X 64GB</p>
                                        <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                    </div>
                                </div>
                                <div className="product-item">
                                    <img className="product-img" src="img/item/phukien-3.png" alt="" />
                                    <div className="product-info p-2">
                                        <p className="product-name">IPhone X 64GB</p>
                                        <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                    </div>
                                </div>
                                <div className="product-item">
                                    <img className="product-img" src="img/item/phukien-4.png" alt="" />
                                    <div className="product-info p-2">
                                        <p className="product-name">IPhone X 64GB</p>
                                        <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
                                    </div>
                                </div>
                                <div className="product-item">
                                    <img className="product-img" src="img/item/phukien-5.png" alt="" />
                                    <div className="product-info p-2">
                                        <p className="product-name">IPhone X 64GB</p>
                                        <p className="product-price">14.990.000đ <span className="old-price text-muted">20.000.000đ</span></p>
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

const mapStateToProps = state => {
    return {
        products: state.products,
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProducts: () => {
            dispatch(actFetchProductsRequest());
        },
        fetchAllCategories: () => {
            dispatch(actFetchCategoriesRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeProduct);
