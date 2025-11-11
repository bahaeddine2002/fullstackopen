import { createSlice } from "@reduxjs/toolkit";



const initalMessage = 'Bonjouuur'

const messageSlice = createSlice({
  name : 'message',
  initialState: initalMessage,
  reducers : {
    updateMessage(state, action) {
      return action.payload
    }
  }
})

export const setMessage = (content,time) => {
  return  dispatch => {
    dispatch(updateMessage(content))
    setTimeout(()=> {
      dispatch(updateMessage(""))
    },time*1000)
  }
}


export const {updateMessage} = messageSlice.actions

export default messageSlice.reducer
