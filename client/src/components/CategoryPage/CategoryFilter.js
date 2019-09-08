import React, { Component } from "react";
import { connect } from 'react-redux';
import { actFetchProductsRequest, actFetchCategoriesRequest, actFilterCategory } from '../../actions/index';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class CategoryFilter extends Component {
    componentDidMount() {
        this.props.fetchAllProducts();
        this.props.fetchAllCategories();
    }
    onFilterCategory = (cate) => {
       this.props.onFilterCategory(cate);
    }
    render() {
        const { products, categories, filters } = this.props;
        
        var categoriesList = "";
        if (categories) {
            categoriesList = categories.map((category, index) => {
                return (
                    <Link 
                    to={`category-${category.category_name}` }
                        onClick= {() => this.onFilterCategory(category.id)}
                    key={index} >
                        <img src={category.category_image} alt="" />
                    </Link>
                )

            });
        }
        return (
            
            <React.Fragment>
                
                <div className="category-list d-flex py-3">
                    {categoriesList}
                </div>
                <div className="choose-price mb-3">
                    <span className="font-weight-bold">Chọn mức giá:</span>
                    <div className="price-list">
                        <a href>Dưới 2 triệu</a>
                        <a href>Từ 2 - 4 triệu</a>
                        <a href>Từ 4 - 8 triệu</a>
                        <a href>Từ 8 - 15 triệu</a>
                        <a href>Trên 15 triệu</a>
                    </div>
                    <div className="filter">
                        <select className="form-control" name id>
                            <option style={{ display: 'none' }} selected>Sắp xếp theo</option>
                            <option>Mới nhất</option>
                            <option>Bán chạy</option>
                            <option>Giá cao đến thấp</option>
                            <option>Giá thấp đến cao</option>
                        </select>
                    </div>
                </div>
            </React.Fragment>
        );


    }
}
const mapStateToProps = state => {
    return {
        products: state.products,
        categories: state.categories,
        filters: state.filters
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProducts: () => {
            dispatch(actFetchProductsRequest());
        },
        fetchAllCategories: () => {
            dispatch(actFetchCategoriesRequest());
        },
        onFilterCategory: (cate) => {
            dispatch(actFilterCategory(cate));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);


