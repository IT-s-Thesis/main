import * as Types from './../constants/ActionTypes';
var initialState = {};

const order = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHECK_ORDER:
                state = action.product;
                // console.log(state);
                return {...state};
        default: return {...state}
    }
};

export default order;