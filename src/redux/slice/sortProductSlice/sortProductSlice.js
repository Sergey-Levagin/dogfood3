/* eslint-disable no-param-reassign */
const { createSlice } = require('@reduxjs/toolkit')

const sortProductSlice = createSlice({
  name: 'sortProduct',
  initialState: {
    value: '',
  },
  reducers: {
    setValueSort(state, action) {
      if (state.value === action.payload) {
        state.value = ''
      } else {
        state.value = action.payload
      }
    },
    clearValueSort(state) {
      state.value = ''
    },
  },
})

export default sortProductSlice.reducer
export const { setValueSort, clearValueSort } = sortProductSlice.actions
export const getValueSortProduct = ((store) => store.sort.value)
