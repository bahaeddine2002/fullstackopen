import { useDispatch, useSelector } from "react-redux"
import { voteAnecdotes } from "../reducers/anecdoteReducer"
import { setMessage } from "../reducers/messageReducer"
const Anecdote = ({ anecdote , handelClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handelClick}>vote</button>
      </div>
    </div>
    
  )
}

const AnecdoteList = () => {
  
  const anecdotes = useSelector(({filter, anecdotes}) =>{
    const anecdote = [...anecdotes].sort((a,b) => b.votes - a.votes)
    return anecdote.filter(a => a.content.includes(filter))
  } )

  const dispatch = useDispatch()
  

  const voteee = async (anecdote) => {
    const modifAnecdote = {
      ...anecdote,
      votes : anecdote.votes +1
    }
    dispatch(voteAnecdotes(modifAnecdote))
    dispatch(setMessage(`you have voted ${anecdote.content}`,5))
  }

  return(
    <div>

      {anecdotes.map(anecdote =>
          <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handelClick = { () => voteee(anecdote)}
          />
        )}
      </div>
  )
}


export default AnecdoteList