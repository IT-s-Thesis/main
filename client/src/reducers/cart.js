import * as types from '../constants/ActionTypes'
var data = JSON.parse(localStorage.getItem('cart'));
var initialState = data ? data : [];
var myReducer = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case types.ADD_TO_CART:
            index = findProduct(state, action.product);
            if(index === -1) {
                state.push({
                    product: action.product,
                    qty: action.qty
                })
            } else {
                state[index].qty += action.qty;
            }        
            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
        case types.DELETE_CART_ITEM:
            index = findProduct(state, action.product.product);
            if(index !== -1) {
                state.splice(index, 1);
            }    
            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
        case types.UPDATE_CART_ITEM:
            index = findProduct(state, action.product);
            if(index !== -1) {
                state[index].qty = action.value
            }
            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
        default: return [...state];
    }
};

var findProduct = (cart, product) => {
    var index = -1;
    if(cart.length > 0){
    for(let i = 0; i < cart.length; i++) {
        if(cart[i].product.id === product.id)
        {
        index = i;
        break;
        }
    }}
    return index;
}

export default myReducer;