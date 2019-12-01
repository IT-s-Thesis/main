import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { actFetchProductsRequest, actFetchCategoriesRequest, actFilterCategory, actFilterPrice } from '../../actions/index';
import { Link } from "react-router-dom";
class CategoryFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: false,
            priceList: "",
        };
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.fetchAllProducts();
        this.props.fetchAllCategories();
    }
    onFilterCategory = (cate) => {
        this.props.onFilterCategory(cate);
    }
    onFilterPrice = (price) => {
        axios.get(`http://web.manager/api/notauth/sgu.product?filter=${price}`)
            .then((response) => {
                this.props.onFilterPrices(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        const { categories } = this.props;
      var categoriesList = "";
        if (categories) {
            categoriesList = categories.map((category, index) => {

                // console.log(category)
                return (
                    <Link
                        to={`/category/${category.id}`}
                        onClick={() => this.onFilterCategory(category.id)}
                        key={index} className="border" >
                            <img alt="" className="cate-img" src={`/img/category/${category.display_name}.png`} />
                    </Link>
                )

            });
        }
        if(this.state.priceList.length > 0) {
            // categoriesList = categories.map((category, index) => {

            //     // console.log(category)
            //     return (
            //         <Link
            //             to={`/category/${category.display_name}`}
            //             onClick={() => this.onFilterCategory(category.id)}
            //             key={index} className="border" >
            //             <p>{category.display_name}</p>
            //             <img src={category.category_image} alt="" />
            //         </Link>
            //     )

            // });
        }
        return (

            <React.Fragment>

                <div className="category-list d-flex py-3">
                    {categoriesList}
                </div>
                <div className="choose-price mb-3">
                    <span className="font-weight-bold">Chọn mức giá:</span>
                    <div className="price-list price-choice">
                        <p to="/" onClick={() => this.onFilterPrice('[["price", ">","0"]]')}>Tất cả</p>
                        <p to="/" onClick={() => this.onFilterPrice('["*", ["price", ">","0"], ["price", "<", "2000001"]]')}>Dưới 2 triệu</p>
                        <p to="/" onClick={() => this.onFilterPrice('["*", ["price", ">","2000000"], ["price", "<", "4000001"]]')}>Từ 2 - 4 triệu</p>
                        <p to="/" onClick={() => this.onFilterPrice('["*", ["price", ">","4000000"], ["price", "<", "8000001"]]')}>Từ 4 - 8 triệu</p>
                        <p to="/" onClick={() => this.onFilterPrice('["*", ["price", ">", "8000000"], ["price", "<", "15000001"]]')}>Từ 8 - 15 triệu</p>
                        <p to="/" onClick={() => this.onFilterPrice('["*", ["price", ">","15000000"], ["price", "<", "100000000"]]')}>Trên 15 triệu</p>
                    </div>
                    <div className="filter">
                        <select className="form-control">
                            <option style={{ display: 'none' }} defaultValue>Sắp xếp theo</option>
                            <option>Mới nhất</option>
                            <option>Bán chạy</option>
                            <option>Giá cao đến thấp</option>
                            <option>Giá thấp đến cao</option>
                        </select>
                    </div>

                </div>
                <div>
                    <h5 className="white-background border-right border-top border-left p-3 m-0">Tất cả điện thoại</h5>
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
        onFilterPrices: (price) => {
            dispatch(actFilterPrice(price));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);


