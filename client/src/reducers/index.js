import { combineReducers } from 'redux';
import products from './products';
import categories from './categories';
import filters from './filters';
import cart from './cart';
import order from './order';
import details from './details';
import price from './price';
import search from './search';

const appReducers = combineReducers({
    products,
    categories,
    filters,
    details,
    cart,
    order,
    price,
    search
});

export default appReducers;