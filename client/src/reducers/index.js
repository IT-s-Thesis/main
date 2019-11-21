import { combineReducers } from 'redux';
import products from './products';
import categories from './categories';
import filters from './filters';
import details from './details';

const appReducers = combineReducers({
    products,
    categories,
    filters,
    details
});

export default appReducers;