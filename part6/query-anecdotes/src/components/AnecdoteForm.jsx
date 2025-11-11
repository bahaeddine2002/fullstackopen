import { useMutation,useQueryClient } from "@tanstack/react-query"
import { createAnecdotes } from "../request"
import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const AnecdoteForm = () => {
const { notification, notificationDispatch } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdotesMutaion = useMutation({
    mutationFn: (newobj) => createAnecdotes(newobj),
    onSuccess:  ( data ) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      console.log(anecdotes)
      queryClient.setQueryData(['anecdotes'],anecdotes.concat(data) )
      notificationDispatch({
      type : 'CREATE',
      payload : data.content
    })
    },
    onError: () => {
      notificationDispatch({
        type: 'ERROR'
      })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdotesMutaion.mutate({
      content:content,
      votes:0
    })
   
     setTimeout(()=>{
      notificationDispatch({
        type : 'Nothing'
      })
    }, 5000)
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
