import React, { Component } from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeProduct from "./HomeProduct/HomeProduct";
class Home extends Component {

    render() {

        return (
            <main>
                <section className="banner">
                    <HomeBanner />
                
                </section>
                <section className="product-list">
                    <HomeProduct />
                    
                </section>
            </main>
        );


    }
}

export default Home;

