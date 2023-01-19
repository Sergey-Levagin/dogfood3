import { configureStore } from '@reduxjs/toolkit'
import { KEY_FOR_CART_LS, KEY_FOR_TOKEN_API } from '../utils/constant'
import cartSlice from './slice/cartSlice.js/cartSlice'
import searchSlice from './slice/searchSlice/searchSlice'
import tokenSlice from './slice/tokenSlice/tokenSlice'

/* const rootReducer = combineReducers({
  toolkit: toolkitSlice,
  token: tokenSlice,
})
console.log(rootReducer) */

export const store = configureStore({
  reducer: {
    token: tokenSlice,
    cart: cartSlice,
    search: searchSlice,
  },
})

store.subscribe(() => {
  localStorage.setItem(KEY_FOR_CART_LS, JSON.stringify(store.getState().cart.cart))
  localStorage.setItem(KEY_FOR_TOKEN_API, JSON.stringify(store.getState().token.token))
})
