import React, { Component } from "react";
import CategoryProductItem from "./CategoryProductItem";
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { actFilterCategory } from '../../actions/index';

class CategoryProductList extends Component {
   
    componentDidMount() {
        window.scrollTo(0,0);
        const { match } = this.props;
        if (match) {
            // const id = parseInt(match.params.id,10);
            // this.props.onDetailsProduct(id);
            const id = parseInt(match.params.id,10);
            this.props.onFilterCategory(id);
        }
    }   

    render() {
        var { products, filters, price } = this.props;
        var productsList = "";
        if(price) {
            products = price;
        }
        if (products) {
            if (filters && filters !== "All") {
                productsList = products.map((product, index) => {
                    return (product.category_id.toString() === filters.toString()) ? 
                            (<CategoryProductItem key={index} product={product} />) 
                            : "";
                });
            }
            else {
                productsList = products.map((product, index) => {
                    return (
                        <CategoryProductItem key={index} product={product} />
                    );
                });
            }
        }
        return (
            <div className="row product-category-list white-background border-top border-left mb-3 mx-0">
                
                {productsList}
            </div>
        );


    }
}
const mapStateToProps = state => {
    return {
        products: state.products,
        filters: state.filters,
        price: state.price
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // fetchAllProducts: () => {
        //     dispatch(actFetchProductsRequest());
        // },
        // fetchAllCategories: () => {
        //     dispatch(actFetchCategoriesRequest());
        // }
        onFilterCategory: (cate) => {
            dispatch(actFilterCategory(cate));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductList);

