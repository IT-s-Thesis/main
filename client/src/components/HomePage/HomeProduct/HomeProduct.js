import React, { Component } from "react";
// import HotProduct from "./HotProduct";
import ProductList from "./ProductList";
// import HomeAccessories from "./HomeAccessories";
import { connect } from 'react-redux';
import { actFetchProductsRequest, actFetchCategoriesRequest } from '../../../actions/index';

class HomeProduct extends Component {
    componentDidMount() {
        window.scrollTo(0,0);
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
                        category = {category.name}
                        categoryId = {category.id}
                    />
                );
            });
        }
        return (
            <div className="container ">
                <div className="row p-0">
                    {/* <HotProduct /> */}
                    {categoriesList}
                    {/* <HomeAccessories /> */}
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
