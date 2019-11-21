import React, { Component } from "react";
import { Link } from 'react-router-dom';
class SearchHeader extends Component {

    render() {

        return (
            <div className="col-md-5 col-sm-12 col-10 left-header">
            <div className="logo">
                <Link to="/">
                <img src="img/logo.jpg" alt="" />
                </Link>
            </div>
            <div className="search-form">
                <input type="text" name="" id="" className="form-control" placeholder="Bạn tìm gì..."  />
                <Link to="/"><i className="fa fa-search" aria-hidden="true" /></Link>
            </div>
        </div>
        );


    }
}

export default SearchHeader;

