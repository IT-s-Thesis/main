import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCall';

export const actFetchProductsRequest = () => {
    return dispatch => {
        return callApi('products', 'GET', null).then(res => {
            dispatch(actFetchProducts(res.data));
        });
    };
}

export const actFetchProducts = (products) => {
    return {
        type : Types.FETCH_PRODUCTS,
        products
    }
}

export const actFetchCategoriesRequest = () => {
    return dispatch => {
        return callApi('categories', 'GET', null).then(res => {
            dispatch(actFetchCategories(res.data));
        });
    };
}

export const actFetchCategories = (categories) => {
    return {
        type : Types.FETCH_CATEGORIES,
        categories
    }
}

export const actFilterCategory = (filter) => {
    return {
        type: Types.FILTER_BY_CATEGORY,
        filter: filter
    }
};


export const actFetchDetailsProductRequest = (id) => {
    return dispatch => {
        return callApi(`products/${id}`, 'GET', null).then(res => {
            dispatch(actFetchDetailsProduct(res.data));
        });
    };
}

export const actFetchDetailsProduct = (product) => {
    return {
        type : Types.GET_DETAILS_PRODUCT,
        product
    }
}