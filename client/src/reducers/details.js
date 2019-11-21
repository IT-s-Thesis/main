import * as Types from './../constants/ActionTypes';
var initialState = {};

const details = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_DETAILS_PRODUCT:
                state = action.product;
                return {...state};
        default: return {...state}
    }
};

export default details;