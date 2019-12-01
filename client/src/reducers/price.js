import * as Types from './../constants/ActionTypes';
var initialState = "";

const price = (state = initialState, action) => {
    switch (action.type) {
        case Types.FILTER_BY_PRICE:
                state = action.filter;
                return state;
        default: return state;
    }
};

export default price;