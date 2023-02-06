import { configureStore } from '@reduxjs/toolkit'
import { KEY_FOR_CART_LS, KEY_FOR_FAVOURITE_LS, KEY_FOR_TOKEN_API } from '../utils/constant'
import cartSlice from './slice/cartSlice.js/cartSlice'
import favouriteSlice from './slice/favouriteSlice/favouriteSlice'
import searchSlice from './slice/searchSlice/searchSlice'
import sortProductSlice from './slice/sortProductSlice/sortProductSlice'
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
    favourite: favouriteSlice,
    sort: sortProductSlice,
  },
})

store.subscribe(() => {
  localStorage.setItem(KEY_FOR_CART_LS, JSON.stringify(store.getState().cart.cart))
  localStorage.setItem(KEY_FOR_TOKEN_API, JSON.stringify(store.getState().token.token))
  localStorage.setItem(KEY_FOR_FAVOURITE_LS, JSON.stringify(store.getState().favourite.favourite))
})
