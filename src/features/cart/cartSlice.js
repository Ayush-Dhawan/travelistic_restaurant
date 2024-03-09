import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cart:[
        
    ]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){
            //payload is dish
            state.cart.push(action.payload);
        },
        deleteItem(state, action){
            //payload is id
            state.cart = state.cart.filter(item => item.id !== action.payload)
        },
        increaseQuantity(state, action){
            //payload = id
            const item = state.cart.find(item => item.id === action.payload)
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseQuantity(state, action){
            //payload = id
            const item = state.cart.find(item => item.id === action.payload)
            item.quantity--;
            if(item.quantity <= 0) state.cart = state.cart.filter(item => item.id !== action.payload)
            item.totalPrice = item.quantity * item.unitPrice;
        },
        clearCart(state){
            state.cart = [];
        }
    }
})

export const {addItem, deleteItem, increaseQuantity, decreaseQuantity, clearCart} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.id=== id)?.quantity ?? 0;