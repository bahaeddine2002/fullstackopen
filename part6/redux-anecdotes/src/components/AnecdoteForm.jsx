import { useDispatch } from "react-redux"
import { createAnecdotes } from "../reducers/anecdoteReducer"
import { setMessage } from "../reducers/messageReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdotes = async (event) =>{
    event.preventDefault()
    const content = event.target.anecdotes.value
    event.target.anecdotes.value = ''
    dispatch(createAnecdotes(content))
    dispatch(setMessage(`new anecdote '${content}'`,5))

  }
  return(
    <div>
       <h2>create new</h2>
      <form onSubmit={addAnecdotes}>
        <div><input name='anecdotes' /></div>
        <button type="sumbit">create</button>
      </form>
    </div>
  )
}


export default AnecdoteForm