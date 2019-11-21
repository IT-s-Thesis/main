import * as Types from './../constants/ActionTypes';
var initialState = "";

const products = (state = initialState, action) => {
    switch (action.type) {
        case Types.FILTER_BY_CATEGORY:
                state = action.filter;
                return state;
        default: return state;
    }
};

export default products;