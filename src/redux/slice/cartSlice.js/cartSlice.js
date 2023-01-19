import { KEY_FOR_CART_LS } from '../../../utils/constant'

/* eslint-disable no-param-reassign */
const { createSlice } = require('@reduxjs/toolkit')

function valueInitialState() {
  if (localStorage.getItem(KEY_FOR_CART_LS)) {
    return JSON.parse(localStorage.getItem(KEY_FOR_CART_LS))
  } return []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: valueInitialState(),
  },
  reducers: {
    addProductInCart: {
      reducer(state, action) {
        if (!state.cart.some((product) => product.id === action.payload.id)) {
          state.cart.push(action.payload)
        }
      },
      prepare(id) {
        return {
          payload: {
            id,
            count: 1,
            checkbox: true,
          },

        }
      },
    },

    changeCheckboxForOneProduct(state, action) {
      state.cart.map((product) => {
        if (product.id === action.payload) {
          product.checkbox = !product.checkbox
        } return product
      })
    },

    chengeCheckboxForAllProducts(state, action) {
      state.cart.map((product) => {
        if (action.payload) {
          product.checkbox = false
        } else {
          product.checkbox = true
        }
        return product
      })
    },

    clearProductFromCartById(state, action) {
      state.cart = state.cart.filter((products) => products.id !== action.payload)
    },

    clearProductFromCartBySelection(state) {
      state.cart = state.cart.filter((product) => product.checkbox !== true)
    },

    increaseQuantityProduct(state, action) {
      state.cart.map((product) => {
        if (product.id === action.payload) {
          product.count += 1
        } return product
      })
    },

    reduceQuantityProduct(state, action) {
      state.cart.map((product) => {
        if (product.id === action.payload) {
          product.count -= 1
        } return product
      })
    },

    changeQuantityProduct(state, action) {
      state.cart.map((product) => {
        if (product.id === action.payload.id) {
          product.count = Number(action.payload.count)
        } return product
      })
    },
    deleteAllProductsFromCart(state) {
      state.cart = []
    },
  },
})

export const getCartSelector = (store) => store.cart.cart
export default cartSlice.reducer
export const {
  addProductInCart, changeCheckboxForOneProduct, chengeCheckboxForAllProducts,
  clearProductFromCartById, clearProductFromCartBySelection,
  increaseQuantityProduct, reduceQuantityProduct, changeQuantityProduc,
  deleteAllProductsFromCart,
} = cartSlice.actions
