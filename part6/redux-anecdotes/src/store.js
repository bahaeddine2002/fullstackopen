import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import messagReducer from './reducers/messageReducer'
const store = configureStore({
  reducer : {

    filter : filterReducer,
    anecdotes : anecdotesReducer,
    message : messagReducer

  }
})




export default store
