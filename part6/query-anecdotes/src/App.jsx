import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, updateAnecdotes } from './request'
import { useContext, useReducer } from 'react'
import NotificationContext from './components/NotificationContext'



const App = () => {
const  {notificationDispatch} = useContext(NotificationContext)
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,

  })
  //console.log(JSON.parse(JSON.stringify(result)))

  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: (obj) => updateAnecdotes(obj),
    onSuccess: (data) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === data.id ? data : anecdote  ))
      
    }


  })




  if(result.isError){
    return <div>anecdote service not available due to promblems in server</div>
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }





  const handleVote = (anecdote) => {
    console.log(anecdote)
    voteMutation.mutate({
      ...  anecdote,
      votes : anecdote.votes + 1
    })

    notificationDispatch({
      type : 'VOTED',
      payload : anecdote.content
    })
    
    setTimeout(()=>{
      notificationDispatch({
        type : 'Nothing'
      })
    }, 5000)

  
  
    
  }

  const anecdotes = result.data

  return (
    
    <div>
      <h3>Anecdote app</h3>
        <Notification />
        
        <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
