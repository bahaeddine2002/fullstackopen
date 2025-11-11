import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdotesList"
import AnecdotesFilter from "./components/AnecdoesFilter"
import Notification from "./components/Notification"
import { useEffect } from "react"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
const App = () => {

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(initializeAnecdotes())
  },[])
  

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdotesFilter />
      <AnecdoteList />
      <AnecdoteForm />
     
    </div>
  )
}

export default App