import React, { Component } from "react";
import SearchHeader from "./SearchHeader";
import NavHeader from "./NavHeader";
class Header extends Component {

    render() {

        return (
            <header>
                <div className="container">
                    <div className="row">
                      <SearchHeader />
                        <NavHeader />
                    </div>
                </div>
            </header>
        );


    }
}

export default Header;

