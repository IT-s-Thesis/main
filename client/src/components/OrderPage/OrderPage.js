import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import OrderList from './OrderList';
class OrderPage extends Component {
   
    render() {
   
        return (
            <div className="container">
                <Switch>
                   <Route path="/order" exact component={OrderList} />
                    <Route  path="/order/code=:code&token=:token" match  component={OrderList} />
                </Switch>
            </div>
        );


    }
}





export default OrderPage;
