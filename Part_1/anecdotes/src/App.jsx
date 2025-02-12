import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))


  const randClick = () =>{
    let min = Math.ceil(0);
    let max = Math.floor(anecdotes.length);
    let rand =  Math.floor(Math.random() * (max - min)) + min;
    setSelected(rand)
  }

  const incrementVote = () =>{
    const copy = [...votes]
    copy[selected] += 1
    console.log('copy ', copy)
    setVotes(copy)
    console.log('the most voted is ', copy.indexOf(Math.max(...copy)))
  }

  const mostVoted = () =>{
    let max = Math.max(...votes)
    let index = votes.indexOf(max)
    return anecdotes[index]
  }
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h3>{anecdotes[selected]}</h3>
      <button onClick={incrementVote}>vote</button>
      <button onClick={randClick}> Random anecdote</button>
      <h1>Anecdote with most votes</h1>
      <h3>{mostVoted()}</h3>
    </div>
  )
}

export default App
