import React, { Component } from "react";
import { connect } from "react-redux";
import SearchItem from './SearchItem';
class SearchPage extends Component {
 
    render() {
        const { search } = this.props;
        var productsList = "";
        if(search) {
        productsList = search.result.map((product, index) => {
            return (<SearchItem key={index} product={product} />) 
        });
        }
        return (
            <div className="container search-page p-0">
                <div className="row">
                    {/* <div className="d-flex searchType-list py-3 w-100">
                        <Link to="/" className="active">Điện thoại (20)</Link>
                        <Link to="/">Phụ kiện (30)</Link>
                        <Link to="/">Tin tức (100)</Link>
                    </div> */}
                    <p className="py-3">Tìm thấy <b>{search.count > 0 ? search.count : 0}</b> kết quả</p>
                </div>
                <div className="row my-3">
                    <div className="col-md-12 pl-0">
                        <h5 className="border-bottom p-3 mb-0 white-background">Điện thoại</h5>
                        <div className="products-list d-flex  white-background ">
                          {productsList}
                        </div>
                    </div>
                    {/* <div className="col-md-3 p-0 h-100">
                        <div className="accessories-list white-background mb-3">
                            <h5 className="border-bottom p-3">Phụ kiện (30)</h5>
                            <div className="accessory-item">
                                <Link to="/"><img src="img/item/phukien-1.png" alt="" /></Link>
                                <div className="accessory-info">
                                    <Link to="/">
                                        <p className="product-name">Tai nghe Vip</p>
                                        <p className="product-price">150.000đ</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="accessory-item">
                                <Link to="/"><img src="img/item/phukien-1.png" alt="" /></Link>
                                <div className="accessory-info">
                                    <Link to="/">
                                        <p className="product-name">Tai nghe Vip</p>
                                        <p className="product-price">150.000đ</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="accessory-item">
                                <Link to="/"><img src="img/item/phukien-1.png" alt="" /></Link>
                                <div className="accessory-info">
                                    <Link to="/">
                                        <p className="product-name">Tai nghe Vip</p>
                                        <p className="product-price">150.000đ</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="accessory-item">
                                <Link to="/"><img src="img/item/phukien-1.png" alt="" /></Link>
                                <div className="accessory-info">
                                    <Link to="/">
                                        <p className="product-name">Tai nghe Vip</p>
                                        <p className="product-price">150.000đ</p>
                                    </Link>
                                </div>
                            </div>
                            <Link to="/" className="text-center w-100 d-block py-2">Xem tất cả</Link>
                        </div>
                        <div className="white-background">
                            <h5 className="border-bottom p-3">Tin tức (100)</h5>
                            <div className="news-Item border-bottom py-3 d-flex">
                                <div className="news-Image">
                                    <Link to="/"><img src="/img/news/news-1.png" alt="" className="w-100" /></Link>
                                </div>
                                <div className="news-Info">
                                    <Link to="/">Cách xử lý điện thoại khi rơi xuống nước</Link>
                                </div>
                            </div>
                            <div className="news-Item border-bottom py-3 d-flex">
                                <div className="news-Image">
                                     <Link to="/"><img src="/img/news/news-1.png" alt="" className="w-100" /></Link>
                                </div>
                                <div className="news-Info">
                                     <Link to="/">Cách xử lý điện thoại khi rơi xuống nước</Link>
                                </div>
                            </div>
                            <div className="news-Item border-bottom py-3 d-flex">
                                <div className="news-Image">
                                     <Link to="/"><img src="/img/news/news-1.png" alt="" className="w-100" /></Link>
                                </div>
                                <div className="news-Info">
                                     <Link to="/">Cách xử lý điện thoại khi rơi xuống nước</Link>
                                </div>
                            </div>
                            <Link to="/" className="text-center w-100 d-block py-2">Xem tất cả</Link>
                        </div>


                    </div> */}
                </div>
            </div>
        );


    }
}

const mapStateToProps = state => {
    return {
        search: state.search
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

