import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import "./App.css"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/HomePage/Home";
import Category from "./components/CategoryPage/Category";
import DetailsProduct from "./components/DetailsProduct/DetailsProduct";
import CartPage from "./components/CartPage/CartPage";
import OrderPage from "./components/OrderPage/OrderPage";
import NewsPage from "./components/NewsPage/NewsPage";
import SearchPage from "./components/SearchPage/SearchPage";
import AccessoriesPage from "./components/AccessoriesPage/AccessoriesPage";
import ScrollUpButton from "react-scroll-up-button";
class App extends Component {

  render() {

    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/category" match component={Category} />
          <Route path="/details-:id" match component={DetailsProduct} />
          <Route path="/cart" match component={CartPage} />
          <Route path="/order" match component={OrderPage} />
          <Route path="/accessories" component={AccessoriesPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/search" component={SearchPage} />
        </Switch>
        <ScrollUpButton />
        <Footer />
      </React.Fragment>
    );


  }
}

export default App;

