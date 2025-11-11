import { createSlice } from "@reduxjs/toolkit"

import anecdotesService from "../services/anecdotesService"


const anecdotesSlice = createSlice({ 
  initialState : [],
  name:'anecdotes',
  reducers : {
    vote(state, action) {
      return state.map(a => a.id == action.payload.id ? action.payload : a)
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdotesService.getAll()
    dispatch(setAnecdotes(data))
  }
}

export const  createAnecdotes = (content) => {
  return async dispatch => {
    const newAnecdotes = await anecdotesService.createAnecdotes(content)
    dispatch(appendAnecdotes(newAnecdotes))
  }
}

export const voteAnecdotes = (votedAnecdotes) => {
  return async dispatch => {
    const voted = await anecdotesService.update(votedAnecdotes)
    dispatch(vote(voted))
  }
}


export const {appendAnecdotes, vote, setAnecdotes} = anecdotesSlice.actions

export default anecdotesSlice.reducer