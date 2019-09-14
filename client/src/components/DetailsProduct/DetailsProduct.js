import React, { Component } from "react";
import TopDetails from "./TopDetails";
import LeftDetails from "./LeftDetails";
import RightDetails from "./RightDetails";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchDetailsProductRequest } from '../../actions/index';
class DetailsProduct extends Component {
    componentDidMount() {
        const { match } = this.props;
        if (match) {
            const id = parseInt(match.params.id,10);
            this.props.onDetailsProduct(id);
        }
    }
    render() {
        return (
            <div className="details-page white-background">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link className="breadcrumb-item" href="#">Trang chủ</Link>
                        <Link className="breadcrumb-item" href="#">Điện thoại</Link>
                        <Link className="breadcrumb-item" href="#">Iphone</Link>
                        <span className="breadcrumb-item active">{this.props.details.product_name}</span>
                    </nav>
                </div>
                <TopDetails />
                <div className="container details-product-info mt-4">
                    <div className="row">
                        <LeftDetails />
                        <RightDetails />
                    </div>
                </div>
            </div>
        );


    }
}

const mapStateToProps = state => {
    return {
        details: state.details
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onDetailsProduct: (id) => {
            dispatch(actFetchDetailsProductRequest(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsProduct);


