import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { actSearch } from './../../actions/index';
import axios from 'axios';
class SearchHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    onSearch = (search) => {
        axios.get(`http://web.localhost/api/notauth/sgu.product?filter=[["name","ilike","${search }"]]`)
            .then((response) => {
                this.props.onSearch(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        const { search } = this.state;
        return (
            <div className="col-md-5 col-sm-12 col-10 left-header">
                <div className="logo pt-2">
                    <Link to="/">
                        <img src="/img/logo.jpg" alt="" />
                    </Link>
                </div>
                <div className="search-form">
                    <input name="search" value={search} onChange={this.handleChange}
                        type="text" className="form-control" placeholder="Tìm theo tên sản phẩm..." aria-describedby="helpId" />
                    <Link to="/search" onClick={() => this.onSearch(search)}><i className="fa fa-search" aria-hidden="true" /></Link>
                </div>
            </div>
        );


    }
}



const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: (search) => {
            dispatch(actSearch(search));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);

