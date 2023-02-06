/* eslint-disable no-param-reassign */
import { KEY_FOR_FAVOURITE_LS } from '../../../utils/constant'

const { createSlice } = require('@reduxjs/toolkit')

function valueInitialState() {
  if (localStorage.getItem(KEY_FOR_FAVOURITE_LS)) {
    return JSON.parse(localStorage.getItem(KEY_FOR_FAVOURITE_LS))
  } return []
}

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: {
    favourite: valueInitialState(),
  },
  reducers: {
    addProductInFavourite(state, action) {
      if (state.favourite.includes(action.payload)) {
        state.favourite = state.favourite.filter((product) => product !== action.payload)
      } else {
        state.favourite = state.favourite.concat(action.payload)
      }
    },
    clearListFavourite(state) {
      state.favourite = []
    },
  },
})

export default favouriteSlice.reducer
export const { addProductInFavourite, clearListFavourite } = favouriteSlice.actions
export const getListFavouriteProducts = ((store) => store.favourite.favourite)
