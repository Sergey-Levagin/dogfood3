/* eslint-disable no-param-reassign */

const { createSlice } = require('@reduxjs/toolkit')

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    search: '',
  },
  reducers: {
    addValueSearch(state, action) {
      state.search = action.payload
    },
  },

})

export const getValueSearchSelector = (store) => store.search.search
export default searchSlice.reducer
export const { addValueSearch } = searchSlice.actions
