import React, { Component } from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeProduct from "./HomeProduct/HomeProduct";
class Home extends Component {

    render() {

        return (
            <main>
                <section className="banner">
                    <HomeBanner />
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" name="" id="" value="checkedValue" checked/>
                
                    </div>
                </section>
                <section className="product-list">
                    <HomeProduct />
                    
                </section>
            </main>
        );


    }
}

export default Home;

