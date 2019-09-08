import React, { Component } from "react";
import LeftBanner from "./LeftBanner";
import RightBanner from "./RightBanner";
class HomeBanner extends Component {

    render() {

        return (
            <div className="container">
            <div className="row">
                <LeftBanner />
                <RightBanner />
                <div className="col-md-12 d-none d-sm-block mt-3 bottom-banner p-0">
                    <a href><img src="img/bottom-banner.png" className="w-100" alt="" /></a>
                </div>
            </div>
        </div>
  
        );


    }
}

export default HomeBanner;

