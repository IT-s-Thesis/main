import React, { Component } from "react";
import { Link } from 'react-router-dom';
class SearchHeader extends Component {

    render() {

        return (
            <div className="col-md-5 col-sm-12 col-10 left-header">
            <div className="logo pt-2">
                <Link to="/">
                <img src="img/logo.jpg" alt="" />
                </Link>
            </div>
            <div className="search-form">
                <input type="text" className="form-control" placeholder="Bạn tìm gì..." aria-describedby="helpId" />
                <Link to="/search"><i className="fa fa-search" aria-hidden="true" /></Link>
            </div>
        </div>
        );


    }
}

export default SearchHeader;

