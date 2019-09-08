import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
class SearchHeader extends Component {

    render() {

        return (
            <div className="col-md-5 col-sm-12 left-header">
            <div className="logo">
                <NavLink to="/">
                <img src="img/logo.jpg" alt="" />
                </NavLink>
            </div>
            <div className="search-form">
                <input type="text" name id className="form-control" placeholder="Bạn tìm gì..." aria-describedby="helpId" />
                <i className="fa fa-search" aria-hidden="true" />
            </div>
        </div>
        );


    }
}

export default SearchHeader;

