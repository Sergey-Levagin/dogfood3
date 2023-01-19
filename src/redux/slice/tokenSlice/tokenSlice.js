/* eslint-disable no-param-reassign */
import { KEY_FOR_TOKEN_API } from '../../../utils/constant'

const { createSlice } = require('@reduxjs/toolkit')

function valueInitialState() {
  if (localStorage.getItem(KEY_FOR_TOKEN_API)) {
    return JSON.parse(localStorage.getItem(KEY_FOR_TOKEN_API))
  } return ''
}

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: valueInitialState(),
  },
  reducers: {
    addToken(state, action) {
      state.token = action.payload
    },
    clearToken(state) {
      state.token = ''
    },
  },
})

export const getTokenSelector = (store) => store.token.token

export default tokenSlice.reducer
export const { addToken, clearToken } = tokenSlice.actions
