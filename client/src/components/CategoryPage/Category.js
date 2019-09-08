import React, { Component } from "react";
import CategoryFilter from "./CategoryFilter";
import CategoryProductList from "./CategoryProductList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class Category extends Component {

    render() {
        return (
            <Router>
                <div className="category-page white-background">
                    <div className="container">
                        <CategoryFilter />
                        <Switch>
                           <Route path="/category" exact component={CategoryProductList} />
                            <Route  path="/category-:id" match  component={CategoryProductList} />
                        </Switch>

                    </div>
                </div>
            </Router>
        );


    }
}

export default Category;

