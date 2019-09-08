import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFilterCategory } from '../../actions/index';
class NavHeader extends Component {
    onFilterCategory = (cate) => {
        this.props.onFilterCategory(cate);
    }
    render() {

        return (
            <div className="col-md-7 col-sm-12 right-header">
                <nav className="navbar navbar-expand-sm navbar-light">
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/category" onClick={() => this.onFilterCategory("All")}>
                                    <i className="fas fa-mobile-alt" />
                                    <p>Điện thoại</p>
                                </NavLink>

                            </li>
                            <li className="nav-item">
                                <NavLink to="" className="nav-link">
                                    <i className="fas fa-mobile-alt" />
                                    <p>Phụ kiện</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="" className="nav-link">
                                    <i className="fas fa-mobile-alt" />
                                    <p>Sửa chữa</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="" className="nav-link">
                                    <i className="fas fa-mobile-alt" />
                                    <p>Trả góp</p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="hotline text-center">
                    <NavLink to="" className="nav-link">
                        <p> <i className="fas fa-phone" /></p>
                        <p>1080</p>
                    </NavLink>
                </div>
                <div className="cart text-center">
                    <NavLink to="/cart" className="nav-link">
                        <p> <i className="fas fa-shopping-cart" /></p>
                        <p> Giỏ hàng</p>
                    </NavLink>
                </div>
            </div>
        );


    }
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFilterCategory: (cate) => {
            dispatch(actFilterCategory(cate));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);
