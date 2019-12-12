import React, { Component } from "react";
import { Link } from "react-router-dom";
class SearchItem extends Component {

    render() {
        const { name, price, image_url, id } = this.props.product;
        const img = `http://web.localhost${image_url}`;
        return (
            <div className=" product-item ">
                <Link to={`/details-${id}`}>
                    <img className="product-img" src={img} alt="" />
                    <div className="product-info p-2">
                        <p className="product-name">{name}</p>
                        <p>
                            <i className="fas fa-star orange font-11"></i>
                            <i className="fas fa-star orange font-11"></i>
                            <i className="fas fa-star orange font-11"></i>
                            <i className="fas fa-star orange font-11"></i>
                            <i className="fas fa-star orange font-11"></i>
                            <span className="text-muted font-11"> (10 đánh giá)</span>
                        </p>
                        <p className="product-price">{price}đ
                         {/* <span className="old-price text-muted">{price}</span> */}
                         </p>
                    </div>
                </Link>
            </div>

        );


    }
}



export default SearchItem;

