import axios from 'axios'

const basUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
  const response = await axios.get(basUrl)
  return response.data
}

const createAnecdotes = async (content) => {
  const anecdotes = {
    content : content,
    votes: 0
  } 
  const response = await axios.post(basUrl, anecdotes)
  return response.data
}

const update = async (updatedObj) => {
  const response = await axios.put(`${basUrl}/${updatedObj.id}`,updatedObj)
  return response.data
}


export default {
  getAll,
  createAnecdotes,
  update
}