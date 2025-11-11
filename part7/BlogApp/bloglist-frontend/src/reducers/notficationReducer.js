import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',

  reducers: {
    createNotif(state, action) {
      const content = action.payload
      return content
    },
    clearNotif(state, action) {
      return ''
    },
  },
})

export const setNotifiction = (content) => {
  return async (dispatch) => {
    dispatch(createNotif(content))

    setTimeout(() => {
      dispatch(clearNotif())
    }, 5000)
  }
}

export const { createNotif, clearNotif } = notificationSlice.actions
export default notificationSlice.reducer
