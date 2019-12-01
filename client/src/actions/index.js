import * as Types from './../constants/ActionTypes';
import {callApi} from './../utils/apiCall';
export const actFetchProductsRequest = () => {
    return dispatch => {
        return callApi('notauth/sgu.product', 'GET', null).then(res => {    
            dispatch(actFetchProducts(res.data.result));
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
        return callApi('notauth/sgu.category', 'GET', null).then(res => {
            // console.log(res.data.result);
            dispatch(actFetchCategories(res.data.result));
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

export const actFilterPrice = (filter) => {
    return {
        type: Types.FILTER_BY_PRICE,
        filter: filter
    }
};

export const actSearch = (search) => {
    return {
        type: Types.SEARCH,
        search: search
    }
};

export const actFetchDetailsProductRequest = (id) => {
    return dispatch => {
        return callApi(`notauth/sgu.product?filter=[["id",%20"=",%20${id}]]`, 'GET', null).then(res => {
            dispatch(actFetchDetailsProduct(res.data.result[0]));
        });
    };
}

export const actFetchDetailsProduct = (product) => {
    return {
        type : Types.GET_DETAILS_PRODUCT,
        product
    }
}


//Cart 

export const addToCart = (product, qty) => {
    return {
        type: Types.ADD_TO_CART,
        product,
        qty
    };
}
export const deleteCartItem = (product) => {
    return {
        type: Types.DELETE_CART_ITEM,
        product
    };
}
export const updateCartItem = (product, value) => {
    return {
        type: Types.UPDATE_CART_ITEM,
        product,
        value
    };
}

export const actAddOrderRequest = (product) => {
    return dispatch => {
        return callApi('order/checkout', 'POST', JSON.parse(product)).then(res => {
            console.log(res);
            // dispatch(actAddOrder(res.data));
        });
    }
}

export const actAddOrder = (product) => {
    return {
        type : Types.ADD_ORDER,
        product
    }
}

export const actCheckOrderRequest = (orderId, token) => {
    return (dispatch => {
        return callApi(`tracking/${orderId}/${token}`, 'GET', null)
        .then(res => {
            dispatch(actCheckOrder(res.data.data));
        })
        .catch(e => {
            console.log(e);
        });
    })
}

export const actCheckOrder = (product) => {
    return {
        type : Types.CHECK_ORDER,
        product
    }
}